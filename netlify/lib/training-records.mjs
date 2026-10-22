import { getStore } from '@netlify/blobs';
import { MODULE_REQUIREMENTS } from './module-requirements.mjs';

export { MODULE_REQUIREMENTS };

export const SIGNOFF_KEYS = [
  'siteTraining',
  'mineTour',
  'plansProcedures',
  'w65Practice',
  'fallProtectionPractice',
  'gasMonitorPractice',
  'taskTraining',
  'form5000_23'
];

const VALID_MINES = new Set(['Boonesboro Quarry', 'Clover Bottom Quarry', 'Dix River Stone']);
const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, Number(value) || 0));
const safeText = (value, maximum = 500) => typeof value === 'string' ? value.trim().slice(0, maximum) : '';
const validDate = value => typeof value === 'string' && Number.isFinite(Date.parse(value)) ? value : '';

export function recordsStore() {
  return getStore({ name: 'msha-training-records', consistency: 'strong' });
}

export function auditStore() {
  return getStore({ name: 'msha-training-audit', consistency: 'strong' });
}

export function recordKey(userId) {
  return `trainees/${encodeURIComponent(String(userId))}.json`;
}

export function rolesFor(user) {
  if (Array.isArray(user?.roles)) return user.roles;
  if (Array.isArray(user?.appMetadata?.roles)) return user.appMetadata.roles;
  if (Array.isArray(user?.app_metadata?.roles)) return user.app_metadata.roles;
  return [];
}

export function learnerName(user) {
  return safeText(user?.name || user?.userMetadata?.full_name || user?.user_metadata?.full_name || user?.email, 120);
}

export function emptySignoffs() {
  return Object.fromEntries(SIGNOFF_KEYS.map(key => [key, false]));
}

function sanitizeAttempts(attempts) {
  if (!Array.isArray(attempts)) return [];
  return attempts.slice(-50).map(attempt => {
    const score = Math.round(clamp(attempt?.score, 0, 100));
    return { at: validDate(attempt?.at), score, passed: score === 100 };
  });
}

function sanitizeReview(review) {
  if (!Array.isArray(review)) return [];
  return review.slice(0, 10).map(item => ({
    question: safeText(item?.question, 500),
    selectedAnswer: safeText(item?.selectedAnswer, 500),
    topic: safeText(item?.topic, 200),
    focus: safeText(item?.focus, 800),
    sectionIndex: Math.round(clamp(item?.sectionIndex, 0, 10)),
    reviewed: item?.reviewed === true,
    checkPassed: item?.checkPassed === true,
    options: Array.isArray(item?.options) ? item.options.slice(0, 8).map(option => safeText(option, 500)) : [],
    correctIndex: Number.isInteger(Number(item?.correctIndex)) ? Math.round(clamp(item.correctIndex, -1, 7)) : -1
  }));
}

// Completion is permanent once the server has recorded it, so later changes to module
// hours or required videos apply only to modules a learner has not finished yet.
// Only server-written state may be trusted this way; client payloads are always rechecked.
export function sanitizeTrainingState(candidate = {}, { trustCompleted = false } = {}) {
  const lockedCompletions = new Set(trustCompleted && Array.isArray(candidate.completed) ? candidate.completed.map(Number) : []);
  const clean = {
    name: safeText(candidate.name, 120),
    mine: VALID_MINES.has(candidate.mine) ? candidate.mine : '',
    completed: [],
    scores: {},
    timersDone: {},
    timerElapsed: {},
    scrollDone: {},
    videoProgress: {},
    quizAttempts: {},
    quizReview: {},
    startedAt: validDate(candidate.startedAt) || null
  };

  for (const [rawId, requirement] of Object.entries(MODULE_REQUIREMENTS)) {
    const id = Number(rawId);
    const elapsed = Math.round(clamp(candidate.timerElapsed?.[id], 0, requirement.seconds));
    const scoreValue = Number(candidate.scores?.[id]);
    clean.timerElapsed[id] = elapsed;
    clean.timersDone[id] = candidate.timersDone?.[id] === true && elapsed >= requirement.seconds;
    clean.scrollDone[id] = candidate.scrollDone?.[id] === true;
    if (Number.isFinite(scoreValue)) clean.scores[id] = Math.round(clamp(scoreValue, 0, 100));
    clean.quizAttempts[id] = sanitizeAttempts(candidate.quizAttempts?.[id]);
    clean.quizReview[id] = sanitizeReview(candidate.quizReview?.[id]);

    const requiredVideoEntries = Object.entries(requirement.videos);
    if (requiredVideoEntries.length) clean.videoProgress[id] = {};
    for (const [videoId, durationSeconds] of requiredVideoEntries) {
      const incoming = candidate.videoProgress?.[id]?.[videoId] || {};
      const watchedSeconds = clamp(incoming.watchedSeconds, 0, durationSeconds);
      clean.videoProgress[id][videoId] = {
        watchedSeconds,
        durationSeconds,
        complete: incoming.complete === true && watchedSeconds >= durationSeconds - 3,
        updatedAt: validDate(incoming.updatedAt)
      };
    }

    const videosComplete = requiredVideoEntries.every(([videoId]) => clean.videoProgress[id]?.[videoId]?.complete === true);
    const earnedNow = clean.timersDone[id] && clean.scrollDone[id] && clean.scores[id] === 100 && videosComplete;
    if (earnedNow || lockedCompletions.has(id)) clean.completed.push(id);
  }
  return clean;
}

function mergeAttempts(previous = [], incoming = []) {
  const merged = new Map();
  for (const attempt of [...previous, ...incoming]) {
    const key = `${attempt.at}|${attempt.score}`;
    merged.set(key, attempt);
  }
  return [...merged.values()].sort((a, b) => String(a.at).localeCompare(String(b.at))).slice(-50);
}

export function mergeTrainingStates(previousCandidate = {}, incomingCandidate = {}) {
  const previous = sanitizeTrainingState(previousCandidate, { trustCompleted: true });
  const incoming = sanitizeTrainingState(incomingCandidate);
  const mineChanged = Boolean(previous.mine && incoming.mine && previous.mine !== incoming.mine);
  const merged = {
    name: incoming.name || previous.name,
    mine: incoming.mine || previous.mine,
    completed: previous.completed.filter(id => !(id === 1 && mineChanged)),
    scores: {}, timersDone: {}, timerElapsed: {}, scrollDone: {}, videoProgress: {}, quizAttempts: {}, quizReview: {},
    startedAt: [previous.startedAt, incoming.startedAt].filter(Boolean).sort()[0] || null
  };

  for (const [rawId, requirement] of Object.entries(MODULE_REQUIREMENTS)) {
    const id = Number(rawId);
    const keepPrevious = !(id === 1 && mineChanged);
    merged.timerElapsed[id] = Math.max(keepPrevious ? previous.timerElapsed[id] || 0 : 0, incoming.timerElapsed[id] || 0);
    merged.timersDone[id] = merged.timerElapsed[id] >= requirement.seconds && ((keepPrevious && previous.timersDone[id]) || incoming.timersDone[id]);
    merged.scrollDone[id] = Boolean((keepPrevious && previous.scrollDone[id]) || incoming.scrollDone[id]);
    const scores = [keepPrevious ? previous.scores[id] : undefined, incoming.scores[id]].filter(Number.isFinite);
    if (scores.length) merged.scores[id] = Math.max(...scores);
    merged.quizAttempts[id] = mergeAttempts(keepPrevious ? previous.quizAttempts[id] : [], incoming.quizAttempts[id]);
    merged.quizReview[id] = incoming.quizReview[id]?.length ? incoming.quizReview[id] : (merged.scores[id] === 100 ? [] : (keepPrevious ? previous.quizReview[id] : []));

    const videoEntries = Object.entries(requirement.videos);
    if (videoEntries.length) merged.videoProgress[id] = {};
    for (const [videoId, durationSeconds] of videoEntries) {
      const oldVideo = keepPrevious ? previous.videoProgress[id]?.[videoId] : null;
      const newVideo = incoming.videoProgress[id]?.[videoId];
      const watchedSeconds = Math.max(oldVideo?.watchedSeconds || 0, newVideo?.watchedSeconds || 0);
      merged.videoProgress[id][videoId] = {
        watchedSeconds,
        durationSeconds,
        complete: watchedSeconds >= durationSeconds - 3 && Boolean(oldVideo?.complete || newVideo?.complete),
        updatedAt: [oldVideo?.updatedAt, newVideo?.updatedAt].filter(Boolean).sort().at(-1) || ''
      };
    }
  }
  return sanitizeTrainingState(merged, { trustCompleted: true });
}

// Per-module detail for instructor views and exports, from server-written state.
export function moduleProgress(stateCandidate = {}) {
  const state = sanitizeTrainingState(stateCandidate, { trustCompleted: true });
  return Object.entries(MODULE_REQUIREMENTS).map(([rawId, requirement]) => {
    const id = Number(rawId);
    const videos = Object.values(state.videoProgress[id] || {});
    return {
      id,
      completed: state.completed.includes(id),
      seatSeconds: state.timerElapsed[id] || 0,
      requiredSeconds: requirement.seconds,
      videosComplete: videos.filter(video => video.complete).length,
      videosRequired: videos.length,
      bestScore: Number.isFinite(state.scores[id]) ? state.scores[id] : null,
      quizAttempts: state.quizAttempts[id].length
    };
  });
}

export function sanitizeSignoffs(candidate = {}) {
  return Object.fromEntries(SIGNOFF_KEYS.map(key => [key, candidate[key] === true]));
}

export function trainingSummary(stateCandidate = {}, signoffsCandidate = {}) {
  const state = sanitizeTrainingState(stateCandidate, { trustCompleted: true });
  const signoffs = sanitizeSignoffs(signoffsCandidate);
  const completedModules = state.completed.length;
  const totalModules = Object.keys(MODULE_REQUIREMENTS).length;
  const classroomHours = state.completed.reduce((sum, id) => sum + MODULE_REQUIREMENTS[id].seconds / 3600, 0);
  const signoffsComplete = SIGNOFF_KEYS.every(key => signoffs[key]);
  return {
    completedModules,
    totalModules,
    classroomHours,
    classroomComplete: completedModules === totalModules,
    signoffsComplete,
    readyForOperatorReview: completedModules === totalModules && signoffsComplete
  };
}

export function significantChanges(previousRecord, nextRecord) {
  const before = previousRecord?.summary || trainingSummary();
  const after = nextRecord.summary;
  const changes = [];
  if (after.completedModules > before.completedModules) changes.push(`modules-completed:${before.completedModules}->${after.completedModules}`);
  if (!before.classroomComplete && after.classroomComplete) changes.push('classroom-complete');
  for (const id of Object.keys(MODULE_REQUIREMENTS)) {
    const beforeAttempts = previousRecord?.state?.quizAttempts?.[id]?.length || 0;
    const afterAttempts = nextRecord.state.quizAttempts?.[id]?.length || 0;
    if (afterAttempts > beforeAttempts) changes.push(`quiz-attempt:${id}`);
  }
  return changes;
}

export async function appendAuditEvent(event) {
  const timestamp = new Date().toISOString();
  const key = `events/${encodeURIComponent(String(event.learnerId || 'unknown'))}/${timestamp}-${crypto.randomUUID()}.json`;
  await auditStore().setJSON(key, { ...event, recordedAt: timestamp });
}
