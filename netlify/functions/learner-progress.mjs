import { appendAuditEvent, loadRecord, saveRecord } from '../lib/record-store.mjs';
import { authenticatedUser } from '../lib/supabase-server.mjs';
import {
  emptySignoffs,
  mergeTrainingStates,
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
  const user = await authenticatedUser(request);
  if (!user) return json({ error: 'Authentication required.' }, 401);
  if (!sameOrigin(request)) return json({ error: 'Cross-origin request denied.' }, 403);

  if (request.method === 'GET') {
    return json({ record: await loadRecord(user.id) });
  }
  if (request.method !== 'PUT') return json({ error: 'Method not allowed.' }, 405);

  const declaredLength = Number(request.headers.get('content-length') || 0);
  if (declaredLength > 1_500_000) return json({ error: 'Progress payload is too large.' }, 413);
  const raw = await request.text();
  if (raw.length > 1_500_000) return json({ error: 'Progress payload is too large.' }, 413);
  let payload;
  try { payload = JSON.parse(raw || '{}'); } catch { return json({ error: 'Invalid JSON.' }, 400); }

  // Retry if another save (another tab, or an instructor signoff) landed first.
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const previous = await loadRecord(user.id);
    const state = previous
      ? mergeTrainingStates(previous.state, payload.state)
      : sanitizeTrainingState(payload.state);
    if (!state.name) state.name = user.name;
    const signoffs = previous?.signoffs || emptySignoffs();
    const saved = await saveRecord(user.id, {
      state,
      signoffs,
      signoffDetails: previous?.signoffDetails || {},
      instructorNotes: previous?.instructorNotes || '',
      summary: trainingSummary(state, signoffs)
    }, previous?.version || 0);
    if (!saved) continue;
    const changes = significantChanges(previous, saved);
    if (changes.length) {
      await appendAuditEvent({
        type: 'learner-progress',
        learnerId: user.id,
        learnerEmail: user.email,
        recordVersion: saved.version,
        changes,
        summary: saved.summary
      });
    }
    return json({ record: saved });
  }
  return json({ error: 'Your progress changed in another window. Please try again.' }, 409);
};

export const config = { path: '/api/learner-progress' };
