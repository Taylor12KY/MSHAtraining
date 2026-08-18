import { getUser } from '@netlify/identity';
import {
  appendAuditEvent,
  emptySignoffs,
  learnerName,
  mergeTrainingStates,
  recordKey,
  recordsStore,
  sanitizeTrainingState,
  significantChanges,
  trainingSummary
} from '../lib/training-records.mjs';

const json = (body, status = 200) => Response.json(body, {
  status,
  headers: { 'Cache-Control': 'no-store' }
});

function sameOrigin(request) {
  const origin = request.headers.get('origin');
  return !origin || origin === new URL(request.url).origin;
}

export default async request => {
  const user = await getUser();
  if (!user) return json({ error: 'Authentication required.' }, 401);
  if (!sameOrigin(request)) return json({ error: 'Cross-origin request denied.' }, 403);

  const store = recordsStore();
  const key = recordKey(user.id);
  if (request.method === 'GET') {
    const record = await store.get(key, { type: 'json' });
    return json({ record: record || null });
  }
  if (request.method !== 'PUT') return json({ error: 'Method not allowed.' }, 405);

  const declaredLength = Number(request.headers.get('content-length') || 0);
  if (declaredLength > 1_500_000) return json({ error: 'Progress payload is too large.' }, 413);
  const raw = await request.text();
  if (raw.length > 1_500_000) return json({ error: 'Progress payload is too large.' }, 413);
  let payload;
  try { payload = JSON.parse(raw || '{}'); } catch { return json({ error: 'Invalid JSON.' }, 400); }

  const previous = await store.get(key, { type: 'json' });
  const state = previous
    ? mergeTrainingStates(previous.state, payload.state)
    : sanitizeTrainingState(payload.state);
  const now = new Date().toISOString();
  const signoffs = previous?.signoffs || emptySignoffs();
  const record = {
    format: 'msha48-server-training-record-v1',
    version: Number(previous?.version || 0) + 1,
    learner: {
      id: user.id,
      email: user.email || '',
      name: state.name || learnerName(user)
    },
    state,
    signoffs,
    signoffDetails: previous?.signoffDetails || {},
    instructorNotes: previous?.instructorNotes || '',
    summary: trainingSummary(state, signoffs),
    createdAt: previous?.createdAt || now,
    updatedAt: now
  };
  const changes = significantChanges(previous, record);
  await store.setJSON(key, record);
  if (changes.length) {
    await appendAuditEvent({
      type: 'learner-progress',
      learnerId: user.id,
      learnerEmail: user.email || '',
      recordVersion: record.version,
      changes,
      summary: record.summary
    });
  }
  return json({ record });
};

export const config = { path: '/api/learner-progress' };
