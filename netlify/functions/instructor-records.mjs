import { appendAuditEvent, listRecords, loadRecord, saveRecord } from '../lib/record-store.mjs';
import { authenticatedUser } from '../lib/supabase-server.mjs';
import {
  moduleProgress,
  sanitizeSignoffs,
  SIGNOFF_KEYS,
  trainingSummary
} from '../lib/training-records.mjs';

const json = (body, status = 200) => Response.json(body, {
  status,
  headers: { 'Cache-Control': 'no-store' }
});
const safeText = (value, maximum) => typeof value === 'string' ? value.trim().slice(0, maximum) : '';

async function requireInstructor(request) {
  const user = await authenticatedUser(request);
  if (!user) return { response: json({ error: 'Authentication required.' }, 401) };
  if (user.role !== 'instructor') return { response: json({ error: 'Instructor access required.' }, 403) };
  return { user };
}

function publicRecord(record) {
  return {
    learner: record.learner,
    mine: record.state?.mine || '',
    startedAt: record.state?.startedAt || null,
    scores: record.state?.scores || {},
    summary: trainingSummary(record.state, record.signoffs),
    modules: moduleProgress(record.state),
    signoffs: record.signoffs || {},
    signoffDetails: record.signoffDetails || {},
    instructorNotes: record.instructorNotes || '',
    createdAt: record.createdAt,
    updatedAt: record.updatedAt
  };
}

export default async request => {
  const authorization = await requireInstructor(request);
  if (authorization.response) return authorization.response;
  if (request.headers.get('origin') && request.headers.get('origin') !== new URL(request.url).origin) {
    return json({ error: 'Cross-origin request denied.' }, 403);
  }

  if (request.method === 'GET') {
    const records = (await listRecords())
      .map(publicRecord)
      .sort((a, b) => String(a.learner?.name || a.learner?.email).localeCompare(String(b.learner?.name || b.learner?.email)));
    return json({ records });
  }
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);

  let payload;
  try { payload = await request.json(); } catch { return json({ error: 'Invalid JSON.' }, 400); }
  const traineeId = safeText(payload?.traineeId, 200);
  if (!traineeId) return json({ error: 'A trainee record is required.' }, 400);

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const record = await loadRecord(traineeId);
    if (!record) return json({ error: 'Trainee record not found.' }, 404);
    const signoffs = sanitizeSignoffs(payload.signoffs);
    const now = new Date().toISOString();
    const changedKeys = SIGNOFF_KEYS.filter(signoffKey => Boolean(record.signoffs?.[signoffKey]) !== signoffs[signoffKey]);
    const signoffDetails = { ...(record.signoffDetails || {}) };
    for (const signoffKey of changedKeys) {
      signoffDetails[signoffKey] = {
        value: signoffs[signoffKey],
        at: now,
        instructorId: authorization.user.id,
        instructorEmail: authorization.user.email,
        instructorName: authorization.user.name
      };
    }
    const saved = await saveRecord(traineeId, {
      state: record.state,
      signoffs,
      signoffDetails,
      instructorNotes: safeText(payload.instructorNotes, 4000),
      summary: trainingSummary(record.state, signoffs)
    }, record.version);
    if (!saved) continue;
    await appendAuditEvent({
      type: 'instructor-signoff',
      learnerId: traineeId,
      learnerEmail: record.learner.email,
      instructorId: authorization.user.id,
      instructorEmail: authorization.user.email,
      recordVersion: saved.version,
      changedKeys,
      signoffs,
      summary: saved.summary
    });
    return json({ record: publicRecord(saved) });
  }
  return json({ error: 'This record changed while you were editing it. Reload and try again.' }, 409);
};

export const config = { path: '/api/instructor-records' };
