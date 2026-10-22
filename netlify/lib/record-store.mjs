import { supabaseAdmin } from './supabase-server.mjs';

const RECORD_COLUMNS = 'user_id, version, state, signoffs, signoff_details, instructor_notes, summary, created_at, updated_at';

function toRecord(row, profile = {}) {
  if (!row) return null;
  return {
    format: 'msha48-server-training-record-v2',
    version: row.version,
    learner: { id: row.user_id, email: profile.email || '', name: profile.full_name || row.state?.name || profile.email || '' },
    state: row.state || {},
    signoffs: row.signoffs || {},
    signoffDetails: row.signoff_details || {},
    instructorNotes: row.instructor_notes || '',
    summary: row.summary || {},
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function loadRecord(userId) {
  const admin = supabaseAdmin();
  const [{ data: row, error }, { data: profile }] = await Promise.all([
    admin.from('training_records').select(RECORD_COLUMNS).eq('user_id', userId).maybeSingle(),
    admin.from('profiles').select('email, full_name').eq('id', userId).maybeSingle()
  ]);
  if (error) throw new Error(`Training record could not be loaded: ${error.message}`);
  return toRecord(row, profile || {});
}

// Optimistic concurrency: the write succeeds only if nobody saved a newer version first.
// Returns the saved record, or null when the caller should reload and retry.
export async function saveRecord(userId, fields, expectedVersion) {
  const admin = supabaseAdmin();
  const row = {
    state: fields.state,
    signoffs: fields.signoffs,
    signoff_details: fields.signoffDetails,
    instructor_notes: fields.instructorNotes,
    summary: fields.summary,
    version: expectedVersion + 1,
    updated_at: new Date().toISOString()
  };
  const query = expectedVersion === 0
    ? admin.from('training_records').upsert({ user_id: userId, ...row }, { onConflict: 'user_id', ignoreDuplicates: true }).select(RECORD_COLUMNS)
    : admin.from('training_records').update(row).eq('user_id', userId).eq('version', expectedVersion).select(RECORD_COLUMNS);
  const { data, error } = await query;
  if (error) throw new Error(`Training record could not be saved: ${error.message}`);
  if (!data?.length) return null;
  const { data: profile } = await admin.from('profiles').select('email, full_name').eq('id', userId).maybeSingle();
  return toRecord(data[0], profile || {});
}

export async function listRecords() {
  const admin = supabaseAdmin();
  const [{ data: rows, error }, { data: profiles, error: profileError }] = await Promise.all([
    admin.from('training_records').select(RECORD_COLUMNS),
    admin.from('profiles').select('id, email, full_name, role')
  ]);
  if (error || profileError) throw new Error(`Trainee records could not be loaded: ${(error || profileError).message}`);
  const byId = new Map((profiles || []).map(profile => [profile.id, profile]));
  return (rows || []).map(row => toRecord(row, byId.get(row.user_id) || {}));
}

export async function appendAuditEvent(event) {
  const { error } = await supabaseAdmin().from('audit_events').insert({ learner_id: event.learnerId || null, event });
  if (error) throw new Error(`Audit event could not be recorded: ${error.message}`);
}
