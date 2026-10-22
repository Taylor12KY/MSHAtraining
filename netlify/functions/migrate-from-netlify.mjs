// One-time migration from Netlify Identity + Netlify Blobs to Supabase.
// Dry run:  POST /.netlify/functions/migrate-from-netlify            (Authorization: Bearer $MIGRATION_TOKEN)
// Apply:    POST /.netlify/functions/migrate-from-netlify?apply=1
// Safe to re-run: existing accounts are matched by email and copied records are skipped.
// Uses the classic handler signature because Netlify only passes the Identity admin
// token (context.clientContext.identity) to classic functions.
import { timingSafeEqual } from 'node:crypto';
import { connectLambda, getStore } from '@netlify/blobs';
import { supabaseAdmin } from '../lib/supabase-server.mjs';
import { sanitizeTrainingState, sanitizeSignoffs, trainingSummary } from '../lib/training-records.mjs';

const reply = (statusCode, body) => ({ statusCode, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify(body, null, 2) });

function tokenMatches(provided, expected) {
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function netlifyIdentityUsers(identity) {
  const users = [];
  for (let page = 1; page < 100; page += 1) {
    const response = await fetch(`${identity.url}/admin/users?page=${page}&per_page=100`, { headers: { Authorization: `Bearer ${identity.token}` } });
    if (!response.ok) throw new Error(`Netlify Identity users could not be listed (${response.status}).`);
    const body = await response.json();
    const batch = body.users || [];
    users.push(...batch);
    if (batch.length < 100) break;
  }
  return users;
}

async function supabaseUsersByEmail(admin) {
  const byEmail = new Map();
  for (let page = 1; page < 100; page += 1) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw new Error(`Supabase users could not be listed: ${error.message}`);
    for (const user of data.users) if (user.email) byEmail.set(user.email.toLowerCase(), user);
    if (data.users.length < 1000) break;
  }
  return byEmail;
}

export const handler = async (event, context) => {
  const provided = (event.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!tokenMatches(provided, process.env.MIGRATION_TOKEN)) return reply(401, { error: 'A valid migration token is required.' });
  if (event.httpMethod !== 'POST') return reply(405, { error: 'Use POST.' });
  const identity = context.clientContext?.identity;
  if (!identity?.url || !identity?.token) return reply(500, { error: 'Netlify Identity is not enabled for this site, so there are no accounts to migrate.' });

  const apply = event.queryStringParameters?.apply === '1';
  connectLambda(event);
  const records = getStore({ name: 'msha-training-records', consistency: 'strong' });
  const audit = getStore({ name: 'msha-training-audit', consistency: 'strong' });
  const admin = supabaseAdmin();

  const netlifyUsers = await netlifyIdentityUsers(identity);
  const existing = await supabaseUsersByEmail(admin);
  const { data: copiedRows, error: copiedError } = await admin.from('training_records').select('legacy_netlify_id').not('legacy_netlify_id', 'is', null);
  if (copiedError) return reply(500, { error: copiedError.message });
  const alreadyCopied = new Set(copiedRows.map(row => row.legacy_netlify_id));
  const report = { mode: apply ? 'applied' : 'dry-run', accounts: [], orphanRecords: [] };
  const migratedIds = new Set();

  for (const netlifyUser of netlifyUsers) {
    const email = String(netlifyUser.email || '').toLowerCase();
    if (!email) continue;
    migratedIds.add(netlifyUser.id);
    const roles = netlifyUser.app_metadata?.roles || [];
    const role = roles.includes('instructor') ? 'instructor' : 'learner';
    const fullName = netlifyUser.user_metadata?.full_name || '';
    const entry = { email, role, account: existing.has(email) ? 'already in Supabase' : 'create', record: 'none', auditEvents: 0 };
    let supabaseId = existing.get(email)?.id || null;

    if (apply && !supabaseId) {
      // Created without a password: the person uses "Forgot password?" once to choose one.
      const { data, error } = await admin.auth.admin.createUser({ email, email_confirm: true, user_metadata: { full_name: fullName } });
      if (error) { entry.account = `failed: ${error.message}`; report.accounts.push(entry); continue; }
      supabaseId = data.user.id;
      entry.account = 'created';
    }
    if (apply && supabaseId) {
      await admin.from('profiles').update({ role, full_name: fullName, updated_at: new Date().toISOString() }).eq('id', supabaseId);
    }

    const stored = await records.get(`trainees/${encodeURIComponent(netlifyUser.id)}.json`, { type: 'json' });
    if (stored) {
      if (alreadyCopied.has(netlifyUser.id)) entry.record = 'already copied';
      else {
        entry.record = apply ? 'copied' : 'copy';
        if (apply) {
          const state = sanitizeTrainingState(stored.state, { trustCompleted: true });
          const signoffs = sanitizeSignoffs(stored.signoffs);
          const { error } = await admin.from('training_records').insert({
            user_id: supabaseId,
            version: Number(stored.version || 1),
            state,
            signoffs,
            signoff_details: stored.signoffDetails || {},
            instructor_notes: stored.instructorNotes || '',
            summary: trainingSummary(state, signoffs),
            legacy_netlify_id: netlifyUser.id,
            created_at: stored.createdAt || new Date().toISOString(),
            updated_at: stored.updatedAt || new Date().toISOString()
          });
          if (error) entry.record = `failed: ${error.message}`;
        }
      }
      if (entry.record === 'copy' || entry.record === 'copied') {
        const { blobs } = await audit.list({ prefix: `events/${encodeURIComponent(netlifyUser.id)}/` });
        entry.auditEvents = blobs.length;
        if (apply && blobs.length) {
          const events = (await Promise.all(blobs.map(blob => audit.get(blob.key, { type: 'json' })))).filter(Boolean);
          const { error } = await admin.from('audit_events').insert(events.map(item => ({
            learner_id: supabaseId,
            event: { ...item, learnerId: supabaseId, legacyNetlifyId: netlifyUser.id, migratedFrom: 'netlify-blobs' },
            recorded_at: item.recordedAt || new Date().toISOString()
          })));
          if (error) entry.auditEvents = `failed: ${error.message}`;
        }
      }
    }
    report.accounts.push(entry);
  }

  const { blobs: recordBlobs } = await records.list({ prefix: 'trainees/' });
  for (const blob of recordBlobs) {
    const legacyId = decodeURIComponent(blob.key.replace(/^trainees\//, '').replace(/\.json$/, ''));
    if (!migratedIds.has(legacyId)) report.orphanRecords.push({ legacyNetlifyId: legacyId, note: 'No matching Netlify Identity account; not migrated.' });
  }
  report.summary = {
    netlifyAccounts: netlifyUsers.length,
    toCreateOrCreated: report.accounts.filter(item => item.account === 'create' || item.account === 'created').length,
    instructors: report.accounts.filter(item => item.role === 'instructor').length,
    recordsCopiedOrToCopy: report.accounts.filter(item => item.record === 'copy' || item.record === 'copied').length
  };
  return reply(200, report);
};
