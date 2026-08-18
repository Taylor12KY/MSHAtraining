import { getUser } from '@netlify/identity';
import {
  appendAuditEvent,
  learnerName,
  recordKey,
  recordsStore,
  rolesFor,
  sanitizeSignoffs,
  SIGNOFF_KEYS,
  trainingSummary
} from '../lib/training-records.mjs';

const json = (body, status = 200) => Response.json(body, {
  status,
  headers: { 'Cache-Control': 'no-store' }
});
const safeText = (value, maximum) => typeof value === 'string' ? value.trim().slice(0, maximum) : '';

async function requireInstructor() {
  const user = await getUser();
  if (!user) return { response: json({ error: 'Authentication required.' }, 401) };
  if (!rolesFor(user).includes('instructor')) return { response: json({ error: 'Instructor access required.' }, 403) };
  return { user };
}

function publicRecord(record) {
  return {
    learner: record.learner,
    mine: record.state?.mine || '',
    startedAt: record.state?.startedAt || null,
    scores: record.state?.scores || {},
    summary: record.summary || trainingSummary(record.state, record.signoffs),
    signoffs: record.signoffs || {},
    signoffDetails: record.signoffDetails || {},
    instructorNotes: record.instructorNotes || '',
    createdAt: record.createdAt,
    updatedAt: record.updatedAt
  };
}

export default async request => {
  const authorization = await requireInstructor();
  if (authorization.response) return authorization.response;
  if (request.headers.get('origin') && request.headers.get('origin') !== new URL(request.url).origin) {
    return json({ error: 'Cross-origin request denied.' }, 403);
  }
  const store = recordsStore();

  if (request.method === 'GET') {
    const { blobs } = await store.list({ prefix: 'trainees/' });
    const records = (await Promise.all(blobs.map(blob => store.get(blob.key, { type: 'json' }))))
      .filter(Boolean)
      .map(publicRecord)
      .sort((a, b) => String(a.learner?.name || a.learner?.email).localeCompare(String(b.learner?.name || b.learner?.email)));
    return json({ records });
  }
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);

  let payload;
  try { payload = await request.json(); } catch { return json({ error: 'Invalid JSON.' }, 400); }
  const traineeId = safeText(payload?.traineeId, 200);
  if (!traineeId) return json({ error: 'A trainee record is required.' }, 400);
  const key = recordKey(traineeId);
  const record = await store.get(key, { type: 'json' });
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
      instructorEmail: authorization.user.email || '',
      instructorName: learnerName(authorization.user)
    };
  }
  const updated = {
    ...record,
    version: Number(record.version || 0) + 1,
    signoffs,
    signoffDetails,
    instructorNotes: safeText(payload.instructorNotes, 4000),
    summary: trainingSummary(record.state, signoffs),
    updatedAt: now
  };
  await store.setJSON(key, updated);
  await appendAuditEvent({
    type: 'instructor-signoff',
    learnerId: record.learner.id,
    learnerEmail: record.learner.email || '',
    instructorId: authorization.user.id,
    instructorEmail: authorization.user.email || '',
    recordVersion: updated.version,
    changedKeys,
    signoffs,
    summary: updated.summary
  });
  return json({ record: publicRecord(updated) });
};

export const config = { path: '/api/instructor-records' };
