import { getStore } from '@netlify/blobs';

export const SIGNOFF_KEYS = [
  'siteTraining',
  'mineTour',
  'plansProcedures',
  'w65Practice',
  'taskTraining',
  'form5000_23'
];

export const MODULE_REQUIREMENTS = {
  1: { seconds: 5400, videos: {} },
  2: { seconds: 7200, videos: { VEOVVx3rDyI: 528, 'QGkT8Ahh1-E': 2409, eEj1JOVu_eY: 850, SN4Sfuhvs2Y: 150, WrnHZK9GhlM: 540, 'F7AOWLOOT-U': 158, TM8DYUKbjsw: 541 } },
  3: { seconds: 12600, videos: { '98555798': 819, 'AU07-U96dfw': 162 } },
  4: { seconds: 7200, videos: { NH7vatxj_t0: 960, yEwFZHVLsso: 326, mSt9lHz22xM: 71, NjHDUhWA6Lo: 682, ZrnWnmhGpQY: 1103, q_4q8lm0tCs: 374, p_vsrhxIlR8: 374, xtb61bDBc6o: 727 } },
  5: { seconds: 12600, videos: { _s2x4dmQgjU: 825, GSPRVJsu3_A: 1183, 'qDDg-CbOTmw': 605, MziZesbb32Q: 315, '9wnDBLifDB4': 420, Oaxs7EEIp4k: 178, '2cyQ5QTPOek': 622, W4uQqiHnXUI: 1792, addOUsx6760: 1498, H2J5MDUAMTk: 1231 } },
  6: { seconds: 10800, videos: { e8mGpQ9W4_w: 999, j9DNL0DnKmU: 686, IGb20ZDbjkY: 2613 } },
  7: { seconds: 10800, videos: { '4rQwxVnYcLk': 1223, OxOwJC5wHyc: 821, '528dJg0lESM': 122, kjCsEVjRrlg: 1655, eFTnBiAvxxg: 295, Ok2p6cUe_sM: 320, '1u6c7YMgkB8': 357, GN3OBFAVHt4: 149, dIreslbUgwY: 881 } },
  8: { seconds: 9000, videos: { '1OJUEmUAPmc': 677, CHTJ8i55HUk: 1596, X5r4upNwIGk: 1169 } },
  9: { seconds: 7200, videos: { iX8j7h7bJF4: 866, wal2KP1bbIY: 561, is77KiZ16_o: 712 } },
  10: { seconds: 12600, videos: { hQiYjxSC9bI: 1939 } },
  11: { seconds: 7200, videos: {} },
  12: { seconds: 10800, videos: { '4MjKwOI2LrE': 357, gbaGN7JQoO4: 900, WTKCluA6lgE: 4077, zaliBZlRsaE: 209, ZHVAmbOBkrk: 379, G2Hs51QDszc: 188, v26fTGBEi9E: 1402, Km8XxRCuCho: 202, EQ1OPz1p0U4: 332 } },
  13: { seconds: 1800, videos: {} }
};

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

export function sanitizeTrainingState(candidate = {}) {
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
    if (clean.timersDone[id] && clean.scrollDone[id] && clean.scores[id] === 100 && videosComplete) clean.completed.push(id);
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
  const previous = sanitizeTrainingState(previousCandidate);
  const incoming = sanitizeTrainingState(incomingCandidate);
  const mineChanged = Boolean(previous.mine && incoming.mine && previous.mine !== incoming.mine);
  const merged = {
    name: incoming.name || previous.name,
    mine: incoming.mine || previous.mine,
    completed: [],
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
  return sanitizeTrainingState(merged);
}

export function sanitizeSignoffs(candidate = {}) {
  return Object.fromEntries(SIGNOFF_KEYS.map(key => [key, candidate[key] === true]));
}

export function trainingSummary(stateCandidate = {}, signoffsCandidate = {}) {
  const state = sanitizeTrainingState(stateCandidate);
  const signoffs = sanitizeSignoffs(signoffsCandidate);
  const completedModules = state.completed.length;
  const classroomHours = state.completed.reduce((sum, id) => sum + MODULE_REQUIREMENTS[id].seconds / 3600, 0);
  const signoffsComplete = SIGNOFF_KEYS.every(key => signoffs[key]);
  return {
    completedModules,
    totalModules: 13,
    classroomHours,
    classroomComplete: completedModules === 13,
    signoffsComplete,
    readyForOperatorReview: completedModules === 13 && signoffsComplete
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
