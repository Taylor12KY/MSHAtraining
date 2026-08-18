function getModule(id) {
  const base = MODULES.find(m => m.id === id);
  if (!base) return null;
  if (id === 1) {
    const site = SITE_CONTENT[state.mine];
    if (site) {
      return Object.assign({}, base, {
        title: site.title,
        objectives: site.objectives,
        content: site.content,
        questions: site.questions
      });
    }
    // Fallback if location not set
    return Object.assign({}, base, {
      title: "Site Orientation",
      objectives: base.objectives,
      content: '<div class="card"><p>Please select a work location on the start screen so site-specific content can load.</p></div>',
      questions: [
        { q: "You must select a work location before starting.", options: ["True", "False"], answer: 0 }
      ]
    });
  }
  return base;
}

function getModules() {
  return MODULES.map(m => getModule(m.id));
}

let state = {
  name: '',
  mine: '',
  completed: [],          // array of module ids
  scores: {},             // id -> percent
  timersDone: {},         // id -> true when required time completed
  timerElapsed: {},       // id -> seconds accumulated (KnowBe4-style resume)
  scrollDone: {},         // id -> true when content scrolled to end
  videoProgress: {},      // module id -> video id -> watched position/completion
  quizAttempts: {},       // id -> recent timestamped quiz attempts
  quizReview: {},         // id -> missed-question remediation plan
  startedAt: null
};

let instructorPreviewMode = false;
let learnerStateSnapshot = null;
let instructorIdentity = null;
let learnerAccount = null;
let learnerHydrated = false;
let learnerRecordMeta = null;
let serverSyncTimer = null;
let syncInFlight = false;

let currentModuleId = null;
let timerIntervals = {};
let videoPlayers = {};
let videoPlayerMeta = {};
let videoWatchIntervals = {};
let youtubeApiPromise = null;
let vimeoApiPromise = null;
let scrollObserver = null;
let currentQuizQuestions = [];
let lastActivityAt = Date.now();
const ACTIVITY_TIMEOUT_MS = 15 * 60 * 1000;
const VALID_MINES = ['Boonesboro Quarry', 'Clover Bottom Quarry', 'Dix River Stone'];
const QUIZ_PASSING_SCORE = 100;

const QUIZ_REVIEW_SECTIONS = {
  1: {
    sections: [
      { topic: 'Site overview and layout', focus: 'Review the selected mine’s levels, facilities, material flow, named work areas, and location-specific facts.' },
      { topic: 'Site-specific policies', focus: 'Review the instructor-confirmed rules for check-in, PPE, traffic, reporting, communication, evacuation, and restricted areas.' }
    ],
    rules: [{ pattern: /policy|procedure|report|ppe|traffic|emergency|alarm|check.?in|supervisor|restricted|communication/i, sectionIndex: 1 }]
  },
  2: {
    sections: [
      { topic: 'Statutory rights of miners', focus: 'Review protected activities, discrimination protections, inspection participation, training rights, and paid training time.' },
      { topic: 'Supervisor authority and responsibility', focus: 'Review who directs work and the responsibility supervisors have for compliance and safe performance.' },
      { topic: 'Company rules and hazard reporting', focus: 'Review immediate reporting, documentation, follow-up, stop-work expectations, and protection for good-faith safety concerns.' }
    ],
    rules: [
      { pattern: /supervisor|direct work|authority and responsibility/i, sectionIndex: 1 },
      { pattern: /report|hazard|company rule|documentation|follow.?up|serious condition/i, sectionIndex: 2 }
    ]
  },
  3: {
    sections: [
      { topic: 'MSA W65 purpose and limitations', focus: 'Review what the W65 protects against, oxygen limitations, when it is used, and when it may be removed.' },
      { topic: 'W65 inspection, carrying, and use', focus: 'Review the container, seal, service condition, reporting defects, carrying requirements, and the complete donning sequence.' },
      { topic: 'Hands-on W65 practice', focus: 'Review why an approved training unit and instructor-led practice are required and why a service unit must remain sealed.' }
    ],
    rules: [
      { pattern: /practice|trainer|training unit|opened for practice|watching videos/i, sectionIndex: 2 },
      { pattern: /inspect|seal|container|damaged|missing|mouthpiece|nose clip|head harness|donning/i, sectionIndex: 1 }
    ]
  },
  4: {
    sections: [
      { topic: 'Check-in and check-out systems', focus: 'Review individual check-in responsibility and how the system supports emergency accountability.' },
      { topic: 'Transportation controls', focus: 'Review approved conveyances, designated travelways, blind spots, seat belts, safe approach, and positive communication.' },
      { topic: 'Communications and warning signals', focus: 'Review radio discipline, traffic signs, warning signals, emergency messages, and location-specific communication procedures.' }
    ],
    rules: [
      { pattern: /check.?in|check.?out|tag in|accountability|who is underground/i, sectionIndex: 0 },
      { pattern: /radio|communication|warning signal|directional sign|emergency message/i, sectionIndex: 2 }
    ],
    defaultSectionIndex: 1
  },
  5: {
    sections: [
      { topic: 'Work environment overview', focus: 'Review underground and surface work areas, equipment interactions, processes, and changing mine conditions.' },
      { topic: 'Core hazard categories', focus: 'Review workplace examinations, mobile equipment, ground, conveyors, stored energy, respiratory hazards, and prompt correction.' },
      { topic: 'Personal practices', focus: 'Review situational awareness, required PPE, suspended-load exclusion, housekeeping, authorization, and asking before acting.' }
    ],
    rules: [
      { pattern: /ppe|hard hat|suspended|personal practice|housekeeping|ask before|authorized/i, sectionIndex: 2 },
      { pattern: /workplace examination|stored energy|conveyor|blind spot|silica|diesel|hazard recognition|hazard category|loader|haul truck/i, sectionIndex: 1 }
    ]
  },
  6: {
    sections: [
      { topic: 'Mine maps', focus: 'Review the current map, work locations, ventilation controls, emergency features, and how map changes are communicated.' },
      { topic: 'Escapeways and evacuation', focus: 'Review primary and alternate routes, drills, fresh-air movement, communication, group accountability, and self-rescue priorities.' },
      { topic: 'Barricading', focus: 'Review why barricading is a last resort and when it may be used under the current emergency plan.' }
    ],
    rules: [
      { pattern: /map/i, sectionIndex: 0 },
      { pattern: /barricad/i, sectionIndex: 2 }
    ],
    defaultSectionIndex: 1
  },
  7: {
    sections: [
      { topic: 'Ground control', focus: 'Review warning signs, examinations, highwalls, unsupported ground, installed support, scaling, reporting, and the approved ground-control plan.' },
      { topic: 'Ventilation', focus: 'Review fresh-air supply, contaminant removal, air direction, fans and controls, blast fumes, and authorization before changes.' }
    ],
    rules: [{ pattern: /ventilat|air flow|fresh air|contaminant|diesel|blast fumes/i, sectionIndex: 1 }]
  },
  8: {
    sections: [
      { topic: 'Health measurements and controls', focus: 'Review dust, silica, noise, sampling, engineering and administrative controls, PPE, and long-term health effects.' },
      { topic: 'Hazard communication', focus: 'Review labels, Safety Data Sheets, chemical hazards, protective measures, emergency information, and the written HazCom program.' }
    ],
    rules: [{ pattern: /sds|safety data|hazcom|chemical|label|written hazard/i, sectionIndex: 1 }]
  },
  9: { sections: [{ topic: 'Electrical hazards and energy control', focus: 'Review qualification, damaged equipment, shock and arc-flash hazards, lockout/tagout/tryout, stored energy, and verification.' }] },
  10: { sections: [{ topic: 'First aid in the mine environment', focus: 'Review scene safety, activating help, bleeding control, AEDs and supplies, limits of training, and the bridge to professional care.' }] },
  11: { sections: [{ topic: 'Mine gases and atmospheric controls', focus: 'Review oxygen deficiency, carbon monoxide, carbon dioxide, detection, ventilation, testing, authorization, and why smell is unreliable.' }] },
  12: {
    sections: [
      { topic: 'Accident prevention', focus: 'Review workplace examinations, human factors, procedure compliance, speaking up, near misses, and prompt hazard correction.' },
      { topic: 'Task-specific health and safety', focus: 'Review required task training, authorization, safe procedures, standards, chemical hazards, and protective measures before new work.' }
    ],
    rules: [{ pattern: /task|assigned|training|authorized|new work/i, sectionIndex: 1 }]
  },
  13: { sections: [{ topic: 'Final comprehensive review', focus: 'Return to the final review checklist and revisit every listed program topic before attempting the comprehensive quiz again.' }] }
};

function getQuizReviewGuide(moduleId, questionText) {
  const config = QUIZ_REVIEW_SECTIONS[moduleId] || QUIZ_REVIEW_SECTIONS[13];
  const matchedRule = (config.rules || []).find(rule => rule.pattern.test(questionText));
  const sectionIndex = matchedRule ? matchedRule.sectionIndex : (config.defaultSectionIndex || 0);
  const section = config.sections[sectionIndex] || config.sections[0];
  return { sectionIndex, topic: section.topic, focus: section.focus };
}

['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(eventName => {
  window.addEventListener(eventName, () => { lastActivityAt = Date.now(); }, { passive: true });
});

// Safe storage: localStorage when available, otherwise in-memory only
// (sandboxed viewers / some iframes block localStorage and throw SecurityError)
let memoryStore = null;
function canUseLocalStorage() {
  try {
    const t = '__msha_test__';
    window.localStorage.setItem(t, '1');
    window.localStorage.removeItem(t);
    return true;
  } catch (e) {
    return false;
  }
}
const HAS_LOCAL_STORAGE = canUseLocalStorage();

function loadState() {
  try {
    if (HAS_LOCAL_STORAGE) {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        state = sanitizeState(Object.assign({}, state, parsed));
      }
    } else if (memoryStore) {
      state = sanitizeState(Object.assign({}, state, memoryStore));
    }
  } catch (e) {
    console.warn('Could not load training progress:', e);
  }
}

function sanitizeState(candidate) {
  const modules = getModules();
  const validIds = new Set(modules.map(m => m.id));
  const clean = {
    name: typeof candidate.name === 'string' ? candidate.name.slice(0, 120) : '',
    mine: VALID_MINES.includes(candidate.mine) ? candidate.mine : '',
    completed: [],
    scores: {},
    timersDone: {},
    timerElapsed: {},
    scrollDone: {},
    videoProgress: {},
    quizAttempts: {},
    quizReview: {},
    startedAt: typeof candidate.startedAt === 'string' ? candidate.startedAt : null
  };

  modules.forEach(m => {
    const id = m.id;
    const total = Math.round(m.hours * 3600);
    const score = Number(candidate.scores && candidate.scores[id]);
    const elapsed = Math.max(0, Math.min(total, Number(candidate.timerElapsed && candidate.timerElapsed[id]) || 0));
    clean.timerElapsed[id] = elapsed;
    clean.timersDone[id] = candidate.timersDone && candidate.timersDone[id] === true && elapsed >= total;
    clean.scrollDone[id] = candidate.scrollDone && candidate.scrollDone[id] === true;
    const requiredVideos = getRequiredVideos(id);
    if (requiredVideos.length) clean.videoProgress[id] = {};
    requiredVideos.forEach(video => {
      const saved = candidate.videoProgress && candidate.videoProgress[id] && candidate.videoProgress[id][video.id];
      const watchedSeconds = Math.max(0, Math.min(video.durationSeconds, Number(saved && saved.watchedSeconds) || 0));
      clean.videoProgress[id][video.id] = {
        watchedSeconds,
        durationSeconds: video.durationSeconds,
        complete: saved && saved.complete === true && watchedSeconds >= video.durationSeconds - 3,
        updatedAt: saved && typeof saved.updatedAt === 'string' ? saved.updatedAt : ''
      };
    });
    if (Number.isFinite(score) && score >= 0 && score <= 100) clean.scores[id] = Math.round(score);
    if (candidate.quizAttempts && Array.isArray(candidate.quizAttempts[id])) {
      clean.quizAttempts[id] = candidate.quizAttempts[id].slice(-20).map(a => ({
        at: typeof a.at === 'string' ? a.at : '',
        score: Math.max(0, Math.min(100, Number(a.score) || 0)),
        passed: Number(a.score) === QUIZ_PASSING_SCORE
      }));
    }
    if (candidate.quizReview && Array.isArray(candidate.quizReview[id])) {
      clean.quizReview[id] = candidate.quizReview[id].slice(0, 10).map(item => ({
        question: typeof item.question === 'string' ? item.question.slice(0, 500) : '',
        selectedAnswer: typeof item.selectedAnswer === 'string' ? item.selectedAnswer.slice(0, 500) : '',
        topic: typeof item.topic === 'string' ? item.topic.slice(0, 200) : '',
        focus: typeof item.focus === 'string' ? item.focus.slice(0, 800) : '',
        sectionIndex: Math.max(0, Math.min(10, Number(item.sectionIndex) || 0)),
        reviewed: item.reviewed === true,
        checkPassed: item.checkPassed === true,
        options: Array.isArray(item.options)
          ? item.options.slice(0, 8).map(option => typeof option === 'string' ? option.slice(0, 500) : '')
          : [],
        correctIndex: Number.isInteger(Number(item.correctIndex)) ? Number(item.correctIndex) : -1
      }));
    }
    if (validIds.has(id) && Array.isArray(candidate.completed) && candidate.completed.includes(id) &&
        clean.timersDone[id] && clean.scrollDone[id] && clean.scores[id] === QUIZ_PASSING_SCORE &&
        requiredVideosComplete(id, clean)) {
      clean.completed.push(id);
    }
  });
  return clean;
}

function saveState() {
  if (instructorPreviewMode) return;
  try {
    if (HAS_LOCAL_STORAGE) {
      localStorage.setItem(learnerAccount ? accountStorageKey(learnerAccount.id) : STORAGE_KEY, JSON.stringify(state));
    } else {
      memoryStore = JSON.parse(JSON.stringify(state));
    }
  } catch (e) {
    console.warn('Could not save training progress:', e);
    try { memoryStore = JSON.parse(JSON.stringify(state)); } catch (e2) {}
  }
  if (learnerAccount && learnerHydrated) scheduleServerSync();
}

function emptyLearnerState(name = '') {
  return {
    name,
    mine: '',
    completed: [],
    scores: {},
    timersDone: {},
    timerElapsed: {},
    scrollDone: {},
    videoProgress: {},
    quizAttempts: {},
    quizReview: {},
    startedAt: null
  };
}

function accountStorageKey(userId) {
  return STORAGE_KEY + ':account:' + String(userId);
}

function readStoredState(key) {
  if (!HAS_LOCAL_STORAGE) return memoryStore ? JSON.parse(JSON.stringify(memoryStore)) : null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeAccountBackup() {
  if (!learnerAccount || !HAS_LOCAL_STORAGE) return;
  try { localStorage.setItem(accountStorageKey(learnerAccount.id), JSON.stringify(state)); } catch {}
}

function setSyncStatus(message, stateName = '') {
  const status = document.getElementById('learner-sync-status');
  if (status) {
    status.textContent = message;
    status.dataset.state = stateName;
  }
  const dashboardStatus = document.getElementById('dash-record-status');
  if (dashboardStatus) {
    dashboardStatus.textContent = message;
    dashboardStatus.dataset.state = stateName;
  }
}

function setLearnerAuthStatus(message, isError = false) {
  const status = document.getElementById('learner-auth-status');
  if (!status) return;
  status.textContent = message;
  status.classList.toggle('hidden', !message);
  status.classList.toggle('auth-error', isError);
}

function normalizedName(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function stateHasProgress(candidate) {
  return Boolean(candidate && (
    candidate.startedAt ||
    candidate.mine ||
    (Array.isArray(candidate.completed) && candidate.completed.length) ||
    Object.values(candidate.timerElapsed || {}).some(value => Number(value) > 0)
  ));
}

async function hydrateLearnerAccount(account) {
  learnerAccount = account;
  learnerHydrated = false;
  setSyncStatus('Loading secure server record…', 'syncing');
  const accountBackup = readStoredState(accountStorageKey(account.id));
  const legacyCandidate = stateHasProgress(state) && normalizedName(state.name) === normalizedName(account.name)
    ? state
    : null;
  const localCandidate = accountBackup || legacyCandidate;
  try {
    const response = localCandidate
      ? await window.mshaIdentity.request('/api/learner-progress', {
          method: 'PUT',
          body: JSON.stringify({ state: localCandidate })
        })
      : await window.mshaIdentity.request('/api/learner-progress');
    learnerRecordMeta = response.record || null;
    state = learnerRecordMeta?.state
      ? sanitizeState(learnerRecordMeta.state)
      : sanitizeState(emptyLearnerState(account.name));
    if (!state.name) state.name = account.name || '';
    learnerHydrated = true;
    writeAccountBackup();
    setSyncStatus(
      learnerRecordMeta?.updatedAt
        ? 'Server record saved · ' + new Date(learnerRecordMeta.updatedAt).toLocaleString()
        : 'Secure record ready. Progress will save automatically.',
      'saved'
    );
    setLearnerAuthStatus('Secure training record loaded.');
  } catch (error) {
    state = sanitizeState(localCandidate || emptyLearnerState(account.name));
    if (!state.name) state.name = account.name || '';
    learnerHydrated = true;
    setSyncStatus('Offline recovery mode · progress is backed up locally until the server reconnects.', 'offline');
    setLearnerAuthStatus('The server record is temporarily unavailable. Local recovery backup is active.', true);
  }
  document.getElementById('input-name').value = state.name || account.name || '';
  document.getElementById('input-mine').value = state.mine || '';
  window.dispatchEvent(new CustomEvent('msha:learner-progress-ready', { detail: { account, record: learnerRecordMeta } }));
}

function scheduleServerSync() {
  if (!learnerAccount || !learnerHydrated || !window.mshaIdentity) return;
  window.clearTimeout(serverSyncTimer);
  serverSyncTimer = window.setTimeout(() => syncLearnerProgress(), 1800);
}

async function syncLearnerProgress(force = false) {
  if (!learnerAccount || !learnerHydrated || !window.mshaIdentity) return false;
  if (syncInFlight) return false;
  syncInFlight = true;
  window.clearTimeout(serverSyncTimer);
  setSyncStatus('Saving secure server record…', 'syncing');
  try {
    const response = await window.mshaIdentity.request('/api/learner-progress', {
      method: 'PUT',
      body: JSON.stringify({ state })
    });
    learnerRecordMeta = response.record;
    if (learnerRecordMeta?.state) state = sanitizeState(learnerRecordMeta.state);
    writeAccountBackup();
    setSyncStatus('Server record saved · ' + new Date(learnerRecordMeta.updatedAt).toLocaleString(), 'saved');
    return true;
  } catch (error) {
    writeAccountBackup();
    setSyncStatus('Server unavailable · local recovery backup saved; retrying when online.', 'offline');
    return false;
  } finally {
    syncInFlight = false;
  }
}

function startTraining() {
  if (!learnerAccount || !learnerHydrated) {
    alert('Please sign in and wait for your training record to load before beginning.');
    return;
  }
  const name = document.getElementById('input-name').value.trim();
  const mine = document.getElementById('input-mine').value;
  if (!name) {
    alert('Please enter your full name.');
    return;
  }
  if (!mine) {
    alert('Please select a work location (Boonesboro Quarry, Clover Bottom Quarry, or Dix River Stone).');
    return;
  }
  // If location changed from a previous session, clear module-1 completion so they get the correct site content
  if (state.mine && state.mine !== mine) {
    state.completed = state.completed.filter(id => id !== 1);
    delete state.scores[1];
    delete state.timersDone[1];
    delete state.timerElapsed[1];
    delete state.scrollDone[1];
    if (state.quizAttempts) delete state.quizAttempts[1];
    if (state.quizReview) delete state.quizReview[1];
  }
  state.name = name;
  state.mine = mine;
  if (!state.startedAt) state.startedAt = new Date().toISOString();
  saveState();
  showDashboard();
}

function resetAll() {
  if (instructorPreviewMode) {
    alert('Reset is disabled in instructor preview because no learner progress is being recorded.');
    return;
  }
  if (learnerAccount) {
    alert('Authenticated training records cannot be erased from the learner screen. Contact an instructor if a record needs review or correction.');
    return;
  }
  if (confirm('This will erase all progress for this browser. Continue?')) {
    try {
      if (HAS_LOCAL_STORAGE) localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    memoryStore = null;
    state = { name: '', mine: '', completed: [], scores: {}, timersDone: {}, timerElapsed: {}, scrollDone: {}, videoProgress: {}, quizAttempts: {}, quizReview: {}, startedAt: null };
    document.getElementById('input-name').value = '';
    document.getElementById('input-mine').value = '';
    showStart();
  }
}

function showStart() {
  if (instructorPreviewMode) {
    exitInstructorPreview();
    return;
  }
  hideAll();
  document.getElementById('screen-start').classList.remove('hidden');
  if (state.name) {
    document.getElementById('input-name').value = state.name;
  }
  const sel = document.getElementById('input-mine');
  if (sel) sel.value = state.mine || '';
}

function showDashboard() {
  stopActiveTimers();
  currentModuleId = null;
  hideAll();
  document.getElementById('screen-dashboard').classList.remove('hidden');
  document.getElementById('dash-name').textContent = instructorPreviewMode ? 'Instructor Preview' : (state.name || '—');
  document.getElementById('dash-mine').textContent = state.mine || '';

  const modules = getModules();
  const totalHours = modules.reduce((sum, m) => sum + m.hours, 0);
  let hoursDone = 0;
  state.completed.forEach(id => {
    const m = modules.find(x => x.id === id);
    if (m) hoursDone += m.hours;
  });
  document.getElementById('dash-hours').textContent = instructorPreviewMode
    ? totalHours.toFixed(1) + ' hrs total'
    : hoursDone.toFixed(1) + ' / ' + totalHours.toFixed(1) + ' hrs';
  const progressPercent = instructorPreviewMode ? 100 : Math.min(100, (hoursDone / totalHours) * 100);
  const dashboardBar = document.getElementById('dash-bar');
  dashboardBar.style.width = progressPercent + '%';
  dashboardBar.parentElement.setAttribute('aria-valuenow', String(Math.round(progressPercent)));
  document.getElementById('dash-status').textContent = instructorPreviewMode
    ? 'All ' + modules.length + ' modules available · Preview does not record completion'
    : state.completed.length + ' of ' + modules.length + ' modules completed';

  const list = document.getElementById('module-list');
  list.innerHTML = '';
  modules.forEach((m, idx) => {
    const isDone = state.completed.includes(m.id);
    const prevDone = idx === 0 || state.completed.includes(modules[idx - 1].id);
    const isLocked = !instructorPreviewMode && !isDone && !prevDone;
    const isCurrent = !instructorPreviewMode && !isDone && prevDone;
    const needsQuizReview = !instructorPreviewMode && !isDone && getQuizReviewItems(m.id).length > 0;

    let statusClass = 'status-locked';
    let statusText = 'Locked';
    if (isDone) { statusClass = 'status-done'; statusText = 'Completed'; }
    else if (isCurrent) { statusClass = 'status-available'; statusText = 'Available'; }
    if (needsQuizReview) {
      statusClass = 'status-review';
      statusText = quizReviewReady(m.id) ? 'Retake Quiz' : 'Review';
    }
    if (instructorPreviewMode) { statusClass = 'status-available'; statusText = 'Preview'; }

    const div = document.createElement('div');
    div.className = 'module-item' + (isDone ? ' completed' : '') + (isCurrent ? ' current' : '') + (isLocked ? ' locked' : '') + (needsQuizReview ? ' review-needed' : '') + (instructorPreviewMode ? ' preview-module' : '');
    div.setAttribute('role', 'button');
    div.setAttribute('aria-disabled', String(isLocked));
    div.tabIndex = isLocked ? -1 : 0;
    const videoCount = getRequiredVideos(m.id).length;
    const videoMeta = videoCount ? ` · ${videoCount} required video${videoCount === 1 ? '' : 's'}` : '';
    
    div.innerHTML = `
      <div class="mod-num">${isDone ? '✓' : m.id}</div>
      <div class="mod-info">
        <div class="mod-title">${m.title}</div>
        <div class="mod-meta">${m.hours} hrs · ${m.questions.length} quiz questions${videoMeta}</div>
      </div>
      <span class="status-badge ${statusClass}">${statusText}</span>
    `;
    if (!isLocked) {
      div.onclick = () => openModule(m.id);
      div.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openModule(m.id);
        }
      });
    }
    list.appendChild(div);
  });

  const allDone = modules.every(m => state.completed.includes(m.id));
  const nextModule = instructorPreviewMode
    ? modules[0]
    : modules.find(m => !state.completed.includes(m.id));
  const nextTitle = document.getElementById('dash-next-title');
  const continueButton = document.getElementById('btn-continue-training');
  const nextNeedsReview = nextModule && getQuizReviewItems(nextModule.id).length > 0;
  if (nextTitle) {
    const prefix = nextNeedsReview ? (quizReviewReady(nextModule.id) ? 'Retake Quiz · ' : 'Review · ') : '';
    nextTitle.textContent = nextModule ? `${prefix}Module ${nextModule.id}: ${nextModule.title}` : 'Course complete';
  }
  if (continueButton) {
    continueButton.classList.toggle('hidden', !instructorPreviewMode && allDone);
    continueButton.innerHTML = instructorPreviewMode
      ? 'Preview Module 1 <span aria-hidden="true">→</span>'
      : (nextNeedsReview ? 'Continue Review <span aria-hidden="true">→</span>' : 'Continue Training <span aria-hidden="true">→</span>');
  }
  document.getElementById('btn-cert').classList.toggle('hidden', instructorPreviewMode || !allDone);
  const recordButton = document.getElementById('btn-training-record');
  if (recordButton) recordButton.classList.toggle('hidden', instructorPreviewMode);
  const changeButton = document.getElementById('btn-change-user');
  if (changeButton) changeButton.textContent = instructorPreviewMode ? '← Exit Preview' : '← Change User';
}

function continueTraining() {
  const modules = getModules();
  const nextModule = instructorPreviewMode
    ? modules[0]
    : modules.find(m => !state.completed.includes(m.id));
  if (nextModule) openModule(nextModule.id);
  else showCertificate();
}

function startInstructorPreview(identity) {
  if (document.body.dataset.instructorPreview !== 'true' || instructorPreviewMode) return;
  learnerStateSnapshot = JSON.parse(JSON.stringify(state));
  instructorIdentity = identity || {};
  const previewMine = VALID_MINES.includes(learnerStateSnapshot.mine) ? learnerStateSnapshot.mine : VALID_MINES[0];
  state = {
    name: 'Instructor Preview',
    mine: previewMine,
    completed: [],
    scores: {},
    timersDone: {},
    timerElapsed: {},
    scrollDone: {},
    videoProgress: {},
    quizAttempts: {},
    quizReview: {},
    startedAt: null
  };
  instructorPreviewMode = true;
  document.body.classList.add('instructor-preview-active', 'instructor-ready');
  document.getElementById('instructor-preview-banner')?.classList.remove('hidden');
  const mineSelect = document.getElementById('instructor-preview-mine');
  if (mineSelect) mineSelect.value = previewMine;
  const identityEl = document.getElementById('instructor-preview-identity');
  if (identityEl) identityEl.textContent = instructorIdentity.email || instructorIdentity.name || 'Instructor';
  showDashboard();
}

function setInstructorPreviewMine(mine) {
  if (!instructorPreviewMode || !VALID_MINES.includes(mine)) return;
  stopActiveTimers();
  state.mine = mine;
  state.videoProgress = {};
  showDashboard();
}

function exitInstructorPreview() {
  stopActiveTimers();
  if (learnerStateSnapshot) state = learnerStateSnapshot;
  instructorPreviewMode = false;
  learnerStateSnapshot = null;
  instructorIdentity = null;
  window.location.assign('/');
}

window.addEventListener('msha:instructor-authorized', event => startInstructorPreview(event.detail));
window.addEventListener('msha:learner-authenticated', event => hydrateLearnerAccount(event.detail.user));
window.addEventListener('msha:learner-signed-out', () => {
  stopActiveTimers();
  learnerAccount = null;
  learnerHydrated = false;
  learnerRecordMeta = null;
  state = emptyLearnerState();
  showStart();
});
window.addEventListener('online', () => syncLearnerProgress());
window.setInstructorPreviewMine = setInstructorPreviewMine;
window.exitInstructorPreview = exitInstructorPreview;

function stopActiveTimers() {
  Object.keys(timerIntervals).forEach(k => {
    clearInterval(timerIntervals[k]);
    delete timerIntervals[k];
  });
  Object.keys(videoWatchIntervals).forEach(k => {
    clearInterval(videoWatchIntervals[k]);
    delete videoWatchIntervals[k];
  });
  Object.keys(videoPlayers).forEach(k => {
    try { videoPlayers[k].destroy(); } catch (e) {}
    delete videoPlayers[k];
    delete videoPlayerMeta[k];
  });
  if (scrollObserver) {
    try { scrollObserver.disconnect(); } catch (e) {}
    scrollObserver = null;
  }
}

function requiredVideosComplete(moduleId, progressState = state) {
  const videos = getRequiredVideos(moduleId);
  if (!videos.length) return true;
  return videos.every(video =>
    progressState.videoProgress &&
    progressState.videoProgress[moduleId] &&
    progressState.videoProgress[moduleId][video.id] &&
    progressState.videoProgress[moduleId][video.id].complete === true
  );
}

function ensureVideoProgress(moduleId, video) {
  if (!state.videoProgress) state.videoProgress = {};
  if (!state.videoProgress[moduleId]) state.videoProgress[moduleId] = {};
  if (!state.videoProgress[moduleId][video.id]) {
    state.videoProgress[moduleId][video.id] = {
      watchedSeconds: 0,
      durationSeconds: video.durationSeconds,
      complete: false,
      updatedAt: ''
    };
  }
  return state.videoProgress[moduleId][video.id];
}

function formatVideoTime(seconds) {
  const safe = Math.max(0, Math.floor(Number(seconds) || 0));
  const minutes = Math.floor(safe / 60);
  const secs = safe % 60;
  return minutes + ':' + String(secs).padStart(2, '0');
}

function managedYouTubeUrl(videoId) {
  const params = new URLSearchParams({
    enablejsapi: '1',
    controls: '0',
    disablekb: '1',
    fs: '0',
    rel: '0',
    playsinline: '1',
    cc_load_policy: '1',
    iv_load_policy: '3'
  });
  if (/^https?:$/.test(window.location.protocol)) params.set('origin', window.location.origin);
  return 'https://www.youtube-nocookie.com/embed/' + videoId + '?' + params.toString();
}

function videoProvider(video) {
  return video.provider === 'vimeo' ? 'vimeo' : 'youtube';
}

function videoPlayerElementId(video) {
  return videoProvider(video) + '-player-' + video.id;
}

function managedVimeoUrl(videoId) {
  const params = new URLSearchParams({
    controls: '0',
    title: '0',
    byline: '0',
    portrait: '0',
    autopause: '1',
    dnt: '1'
  });
  return 'https://player.vimeo.com/video/' + videoId + '?' + params.toString();
}

function managedVideoUrl(video) {
  return videoProvider(video) === 'vimeo' ? managedVimeoUrl(video.id) : managedYouTubeUrl(video.id);
}

function externalVideoUrl(video) {
  return videoProvider(video) === 'vimeo'
    ? 'https://vimeo.com/' + video.id
    : 'https://www.youtube.com/watch?v=' + video.id;
}

function requiredVideoControls(video) {
  const viewingNote = instructorPreviewMode
    ? 'Forward seeking is disabled. Preview viewing is temporary and is not saved.'
    : 'Forward seeking is disabled. Rewinding is allowed; completion is saved in this browser.';
  return `
    <div class="video-watch-controls">
      <button type="button" class="btn btn-sm video-play-toggle" data-video-id="${video.id}">Start / Resume</button>
      <span class="video-watch-status" id="video-status-${video.id}">Required viewing · 0:00 / ${formatVideoTime(video.durationSeconds)}</span>
    </div>
    <div class="video-watch-track" aria-hidden="true"><div class="video-watch-fill" id="video-fill-${video.id}"></div></div>
    <p class="video-watch-note" id="video-note-${video.id}">${viewingNote}</p>
  `;
}

function requiredVideoTrainingMemo(video) {
  const guidance = VIDEO_TRAINING_GUIDANCE[video.id] || {};
  const focus = guidance.focus || video.description;
  const scope = guidance.scope || MODULE_VIDEO_SCOPE[video.moduleId] ||
    "Use this video to support the module objectives. Follow the current mine plan, site procedures, and instructor direction whenever details differ.";
  return `
    <aside class="video-training-memo" aria-label="Training focus for ${escapeHtml(video.title)}">
      <p class="video-training-memo-label">Training Focus</p>
      <p>${escapeHtml(focus)}</p>
      <p class="video-training-memo-scope"><strong>Keep in perspective:</strong> ${escapeHtml(scope)}</p>
    </aside>
  `;
}

function requiredVideoTransition(video, index, total) {
  if (index === 0) return '';
  const transition = VIDEO_SEQUENCE_TRANSITIONS[video.id] ||
    `Continue to ${video.title} and connect its examples to the hazards and controls introduced in the previous video.`;
  return `
    <div class="video-sequence-transition" aria-label="Transition to video ${index + 1} of ${total}">
      <span>Continue the sequence</span>
      <p>${escapeHtml(transition)}</p>
    </div>
  `;
}

function configureRequiredVideoBox(box, iframe, video) {
  box.classList.add('managed-video-box');
  box.dataset.videoId = video.id;
  box.dataset.videoProvider = videoProvider(video);
  iframe.id = videoPlayerElementId(video);
  iframe.src = managedVideoUrl(video);
  iframe.title = video.title;
  iframe.removeAttribute('allowfullscreen');
  iframe.setAttribute('tabindex', '-1');
  iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
  iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
  const frame = iframe.parentElement;
  if (frame) frame.classList.add('managed-video-frame');
  if (frame && !box.querySelector('.video-training-memo')) {
    frame.insertAdjacentHTML('beforebegin', requiredVideoTrainingMemo(video));
  }
  box.querySelectorAll('p').forEach(paragraph => {
    const text = paragraph.textContent || '';
    if (
      text.includes('Open on YouTube') ||
      text.includes('Open W65 video on Vimeo') ||
      text.includes('YouTube cannot fully lock seeking') ||
      text.includes('If the player shows')
    ) {
      paragraph.remove();
    }
  });
  if (!box.querySelector('.video-watch-controls')) {
    box.insertAdjacentHTML('beforeend', requiredVideoControls(video));
  }
  if (!box.querySelector('.video-fallback')) {
    box.insertAdjacentHTML(
      'beforeend',
      `<p class="video-fallback"><a href="${externalVideoUrl(video)}" target="_blank" rel="noopener">Open on ${videoProvider(video) === 'vimeo' ? 'Vimeo' : 'YouTube'} ↗</a> <span>(external playback cannot be verified and does not receive completion credit)</span></p>`
    );
  }
  const button = box.querySelector('.video-play-toggle');
  if (button) button.addEventListener('click', () => toggleRequiredVideo(video.id));
}

function renderRequiredVideos(moduleId) {
  const videos = getRequiredVideos(moduleId);
  if (!videos.length) return;
  const container = document.getElementById('mod-content');
  const marker = document.getElementById('scroll-end-marker');
  if (!container || !marker) return;

  const section = document.createElement('section');
  section.className = 'required-video-section';
  section.innerHTML = `
    <h3>Required Module Videos</h3>
    <p>Follow the listed sequence and complete ${videos.length === 1 ? 'the assigned video' : `all ${videos.length} assigned videos`} in this player before the module quiz unlocks. The transition notes connect each topic to the next.</p>
  `;

  videos.forEach((video, index) => {
    ensureVideoProgress(moduleId, video);
    let iframe = container.querySelector(`iframe[src*="${video.id}"]`);
    let box = iframe && iframe.closest('.video-box');
    if (!iframe || !box) {
      box = document.createElement('div');
      box.className = 'video-box';
      box.innerHTML = `
        <p class="video-title">${escapeHtml(video.title)} · ${formatVideoTime(video.durationSeconds)}</p>
        <p class="video-description">${escapeHtml(video.description)} <span class="video-source">Source: ${escapeHtml(video.author)}</span></p>
        <div class="managed-video-frame">
          <iframe id="${videoPlayerElementId(video)}" src="${managedVideoUrl(video)}" title="${escapeHtml(video.title)}" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" tabindex="-1"></iframe>
        </div>
        ${requiredVideoControls(video)}
        <p class="video-fallback"><a href="${externalVideoUrl(video)}" target="_blank" rel="noopener">Open on ${videoProvider(video) === 'vimeo' ? 'Vimeo' : 'YouTube'} ↗</a> <span>(external viewing cannot receive completion credit)</span></p>
      `;
      section.appendChild(box);
      iframe = box.querySelector('iframe');
    }
    configureRequiredVideoBox(box, iframe, video);
    let sequenceLabel = box.querySelector('.video-sequence-label');
    if (!sequenceLabel) {
      sequenceLabel = document.createElement('div');
      sequenceLabel.className = 'video-sequence-label';
      box.prepend(sequenceLabel);
    }
    sequenceLabel.textContent = `Video ${index + 1} of ${videos.length}`;
    if (index > 0) section.insertAdjacentHTML('beforeend', requiredVideoTransition(video, index, videos.length));
    section.appendChild(box);
    updateRequiredVideoUI(moduleId, video.id);
  });

  if (section.querySelector('.video-box')) marker.before(section);
}

function loadYouTubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (youtubeApiPromise) return youtubeApiPromise;
  youtubeApiPromise = new Promise((resolve, reject) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReady === 'function') previousReady();
      resolve(window.YT);
    };
    let script = document.getElementById('youtube-iframe-api');
    if (!script) {
      script = document.createElement('script');
      script.id = 'youtube-iframe-api';
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.onerror = () => reject(new Error('YouTube player API could not load'));
      document.head.appendChild(script);
    }
  });
  return youtubeApiPromise;
}

function loadVimeoApi() {
  if (window.Vimeo && window.Vimeo.Player) return Promise.resolve(window.Vimeo);
  if (vimeoApiPromise) return vimeoApiPromise;
  vimeoApiPromise = new Promise((resolve, reject) => {
    let script = document.getElementById('vimeo-player-api');
    if (!script) {
      script = document.createElement('script');
      script.id = 'vimeo-player-api';
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener('load', () => resolve(window.Vimeo), { once: true });
    script.addEventListener('error', () => reject(new Error('Vimeo player API could not load')), { once: true });
  });
  return vimeoApiPromise;
}

function initializeRequiredVideos(moduleId) {
  const videos = getRequiredVideos(moduleId);
  if (!videos.length) return;
  const youtubeVideos = videos.filter(video => videoProvider(video) === 'youtube');
  const vimeoVideos = videos.filter(video => videoProvider(video) === 'vimeo');

  if (youtubeVideos.length) {
  loadYouTubeApi().then(() => {
    if (currentModuleId !== moduleId) return;
    youtubeVideos.forEach(video => {
      const elementId = videoPlayerElementId(video);
      if (!document.getElementById(elementId) || videoPlayers[video.id]) return;
      videoPlayerMeta[video.id] = { moduleId, video, provider: 'youtube', suppressSeekUntil: 0, lastSavedSecond: -1, isPlaying: false };
      videoPlayers[video.id] = new YT.Player(elementId, {
        events: {
          onReady: event => onRequiredVideoReady(event, video.id),
          onStateChange: event => onRequiredVideoStateChange(event, video.id),
          onError: () => setRequiredVideoNote(video.id, 'This video could not load. Check the network or use the YouTube link, then ask the instructor for assistance.', true)
        }
      });
    });
  }).catch(() => {
    youtubeVideos.forEach(video => setRequiredVideoNote(video.id, 'The tracked YouTube player could not load. Check the network and reload this module.', true));
  });
  }

  if (vimeoVideos.length) {
    loadVimeoApi().then(() => {
      if (currentModuleId !== moduleId) return;
      vimeoVideos.forEach(video => initializeVimeoVideo(moduleId, video));
    }).catch(() => {
      vimeoVideos.forEach(video => setRequiredVideoNote(video.id, 'The tracked Vimeo player could not load. Check the network and reload this module.', true));
    });
  }
}

function initializeVimeoVideo(moduleId, video) {
  const iframe = document.getElementById(videoPlayerElementId(video));
  if (!iframe || videoPlayers[video.id]) return;
  const meta = { moduleId, video, provider: 'vimeo', suppressSeekUntil: 0, lastSavedSecond: -1, isPlaying: false };
  const player = new Vimeo.Player(iframe);
  videoPlayerMeta[video.id] = meta;
  videoPlayers[video.id] = player;

  player.ready().then(async () => {
    const record = ensureVideoProgress(moduleId, video);
    const duration = Number(await player.getDuration()) || video.durationSeconds;
    record.durationSeconds = Math.round(duration);
    if (!record.complete && record.watchedSeconds > 2) {
      meta.suppressSeekUntil = Date.now() + 2500;
      await player.setCurrentTime(record.watchedSeconds);
    }
    updateRequiredVideoUI(moduleId, video.id);
  }).catch(() => setRequiredVideoNote(video.id, 'This Vimeo video could not initialize. Reload the module or ask the instructor for assistance.', true));

  player.on('play', () => {
    meta.isPlaying = true;
    pauseOtherRequiredVideos(video.id);
    updateRequiredVideoButton(video.id);
  });
  player.on('pause', () => {
    meta.isPlaying = false;
    updateRequiredVideoButton(video.id);
  });
  player.on('timeupdate', data => trackVimeoRequiredVideo(video.id, data));
  player.on('seeked', data => trackVimeoRequiredVideo(video.id, data));
  player.on('ended', data => completeVimeoRequiredVideo(video.id, data));
  player.on('error', () => setRequiredVideoNote(video.id, 'This Vimeo video could not load. Check the network and ask the instructor for assistance.', true));
}

function onRequiredVideoReady(event, videoId) {
  const meta = videoPlayerMeta[videoId];
  if (!meta) return;
  const record = ensureVideoProgress(meta.moduleId, meta.video);
  const reportedDuration = Number(event.target.getDuration()) || meta.video.durationSeconds;
  record.durationSeconds = Math.round(reportedDuration);
  if (!record.complete && record.watchedSeconds > 2) {
    meta.suppressSeekUntil = Date.now() + 2500;
    event.target.seekTo(record.watchedSeconds, true);
  }
  updateRequiredVideoUI(meta.moduleId, videoId);
}

function pauseOtherRequiredVideos(activeVideoId) {
  Object.keys(videoPlayers).forEach(otherId => {
    if (otherId === activeVideoId) return;
    const otherPlayer = videoPlayers[otherId];
    const otherMeta = videoPlayerMeta[otherId];
    try {
      if (otherMeta && otherMeta.provider === 'vimeo') otherPlayer.pause();
      else otherPlayer.pauseVideo();
    } catch (e) {}
  });
}

function onRequiredVideoStateChange(event, videoId) {
  const meta = videoPlayerMeta[videoId];
  if (!meta) return;
  if (event.data === YT.PlayerState.PLAYING) {
    meta.isPlaying = true;
    pauseOtherRequiredVideos(videoId);
    startRequiredVideoWatch(videoId);
  } else {
    meta.isPlaying = false;
    stopRequiredVideoWatch(videoId);
  }
  if (event.data === YT.PlayerState.ENDED) {
    const record = ensureVideoProgress(meta.moduleId, meta.video);
    const duration = Number(event.target.getDuration()) || record.durationSeconds || meta.video.durationSeconds;
    if (record.watchedSeconds >= duration - 3) {
      record.watchedSeconds = duration;
      record.durationSeconds = Math.round(duration);
      record.complete = true;
      record.updatedAt = new Date().toISOString();
      saveState();
      setRequiredVideoNote(videoId, 'Video complete ✓', false);
      updateRequiredVideoUI(meta.moduleId, videoId);
      updateProgressUI(meta.moduleId, Math.round((getModule(meta.moduleId)?.hours || 0) * 3600));
    } else {
      meta.suppressSeekUntil = Date.now() + 2000;
      event.target.seekTo(record.watchedSeconds, true);
      setRequiredVideoNote(videoId, 'Forward jump blocked. Resume from your last verified position.', true);
    }
  }
  updateRequiredVideoButton(videoId);
}

function trackVimeoRequiredVideo(videoId, data) {
  const player = videoPlayers[videoId];
  const meta = videoPlayerMeta[videoId];
  if (!player || !meta || currentModuleId !== meta.moduleId) return;
  if (document.hidden) {
    player.pause().catch(() => {});
    return;
  }
  const record = ensureVideoProgress(meta.moduleId, meta.video);
  const current = Number(data && data.seconds) || 0;
  const duration = Number(data && data.duration) || record.durationSeconds || meta.video.durationSeconds;
  if (Date.now() >= meta.suppressSeekUntil && current > record.watchedSeconds + 3) {
    meta.suppressSeekUntil = Date.now() + 2000;
    player.setCurrentTime(record.watchedSeconds).catch(() => {});
    setRequiredVideoNote(videoId, 'Forward seeking is disabled. Playback returned to your last verified position.', true);
    return;
  }
  if (current <= record.watchedSeconds + 3) {
    record.watchedSeconds = Math.min(duration, Math.max(record.watchedSeconds, current));
    record.durationSeconds = Math.round(duration);
    record.updatedAt = new Date().toISOString();
    lastActivityAt = Date.now();
    const wholeSecond = Math.floor(record.watchedSeconds);
    if (wholeSecond % 5 === 0 && wholeSecond !== meta.lastSavedSecond) {
      meta.lastSavedSecond = wholeSecond;
      saveState();
    }
  }
  updateRequiredVideoUI(meta.moduleId, videoId);
}

function completeVimeoRequiredVideo(videoId, data) {
  const player = videoPlayers[videoId];
  const meta = videoPlayerMeta[videoId];
  if (!player || !meta) return;
  meta.isPlaying = false;
  const record = ensureVideoProgress(meta.moduleId, meta.video);
  const duration = Number(data && data.duration) || record.durationSeconds || meta.video.durationSeconds;
  if (record.watchedSeconds >= duration - 3) {
    record.watchedSeconds = duration;
    record.durationSeconds = Math.round(duration);
    record.complete = true;
    record.updatedAt = new Date().toISOString();
    saveState();
    setRequiredVideoNote(videoId, 'Video complete ✓', false);
    updateRequiredVideoUI(meta.moduleId, videoId);
    updateProgressUI(meta.moduleId, Math.round((getModule(meta.moduleId)?.hours || 0) * 3600));
  } else {
    meta.suppressSeekUntil = Date.now() + 2000;
    player.setCurrentTime(record.watchedSeconds).catch(() => {});
    setRequiredVideoNote(videoId, 'Forward jump blocked. Resume from your last verified position.', true);
  }
  updateRequiredVideoButton(videoId);
}

function startRequiredVideoWatch(videoId) {
  stopRequiredVideoWatch(videoId);
  videoWatchIntervals[videoId] = setInterval(() => trackRequiredVideo(videoId), 1000);
  trackRequiredVideo(videoId);
}

function stopRequiredVideoWatch(videoId) {
  if (videoWatchIntervals[videoId]) {
    clearInterval(videoWatchIntervals[videoId]);
    delete videoWatchIntervals[videoId];
  }
}

function trackRequiredVideo(videoId) {
  const player = videoPlayers[videoId];
  const meta = videoPlayerMeta[videoId];
  if (!player || !meta || currentModuleId !== meta.moduleId) return;
  if (document.hidden) {
    try { player.pauseVideo(); } catch (e) {}
    return;
  }
  const record = ensureVideoProgress(meta.moduleId, meta.video);
  const current = Number(player.getCurrentTime()) || 0;
  const duration = Number(player.getDuration()) || record.durationSeconds || meta.video.durationSeconds;
  if (Date.now() >= meta.suppressSeekUntil && current > record.watchedSeconds + 3) {
    meta.suppressSeekUntil = Date.now() + 2000;
    player.seekTo(record.watchedSeconds, true);
    setRequiredVideoNote(videoId, 'Forward seeking is disabled. Playback returned to your last verified position.', true);
    return;
  }
  if (current <= record.watchedSeconds + 3) {
    record.watchedSeconds = Math.min(duration, Math.max(record.watchedSeconds, current));
    record.durationSeconds = Math.round(duration);
    record.updatedAt = new Date().toISOString();
    lastActivityAt = Date.now();
    const wholeSecond = Math.floor(record.watchedSeconds);
    if (wholeSecond % 5 === 0 && wholeSecond !== meta.lastSavedSecond) {
      meta.lastSavedSecond = wholeSecond;
      saveState();
    }
  }
  updateRequiredVideoUI(meta.moduleId, videoId);
}

function toggleRequiredVideo(videoId) {
  lastActivityAt = Date.now();
  const player = videoPlayers[videoId];
  const meta = videoPlayerMeta[videoId];
  if (!player || !meta) {
    setRequiredVideoNote(videoId, 'Player is still loading. Try again in a moment.', true);
    return;
  }
  if (meta.provider === 'vimeo') {
    const record = ensureVideoProgress(meta.moduleId, meta.video);
    if (meta.isPlaying) {
      player.pause().catch(() => setRequiredVideoNote(videoId, 'The player could not pause. Try again.', true));
    } else {
      const startPlayback = async () => {
        if (record.complete) {
          meta.suppressSeekUntil = Date.now() + 2000;
          await player.setCurrentTime(0);
        }
        await player.play();
      };
      startPlayback().catch(() => setRequiredVideoNote(videoId, 'The player could not start. Try again or reload the module.', true));
    }
    return;
  }
  const playerState = player.getPlayerState();
  if (playerState === YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    const record = ensureVideoProgress(meta.moduleId, meta.video);
    if (playerState === YT.PlayerState.ENDED || (record.complete && player.getCurrentTime() >= record.durationSeconds - 3)) {
      meta.suppressSeekUntil = Date.now() + 2000;
      player.seekTo(0, true);
    }
    player.playVideo();
  }
}

function updateRequiredVideoButton(videoId) {
  const button = document.querySelector(`.video-play-toggle[data-video-id="${videoId}"]`);
  if (!button) return;
  const player = videoPlayers[videoId];
  const meta = videoPlayerMeta[videoId];
  const record = meta && ensureVideoProgress(meta.moduleId, meta.video);
  let label = record && record.complete ? 'Replay' : 'Start / Resume';
  if (meta && meta.isPlaying) label = 'Pause';
  button.textContent = label;
}

function updateRequiredVideoUI(moduleId, videoId) {
  const video = getRequiredVideos(moduleId).find(item => item.id === videoId);
  if (!video) return;
  const record = ensureVideoProgress(moduleId, video);
  const duration = record.durationSeconds || video.durationSeconds;
  const watched = Math.min(duration, record.watchedSeconds || 0);
  const status = document.getElementById('video-status-' + videoId);
  const fill = document.getElementById('video-fill-' + videoId);
  if (status) {
    status.textContent = record.complete
      ? 'Complete ✓ · ' + formatVideoTime(duration)
      : 'Required viewing · ' + formatVideoTime(watched) + ' / ' + formatVideoTime(duration);
    status.classList.toggle('complete', record.complete);
  }
  if (fill) fill.style.width = (duration ? Math.min(100, (watched / duration) * 100) : 0) + '%';
  updateRequiredVideoButton(videoId);
}

function setRequiredVideoNote(videoId, message, isWarning) {
  const note = document.getElementById('video-note-' + videoId);
  if (!note) return;
  note.textContent = message;
  note.classList.toggle('warning', !!isWarning);
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) return;
  Object.keys(videoPlayers).forEach(videoId => {
    const player = videoPlayers[videoId];
    const meta = videoPlayerMeta[videoId];
    try {
      if (meta && meta.provider === 'vimeo') player.pause();
      else player.pauseVideo();
    } catch (e) {}
  });
});

function getQuizReviewItems(id) {
  return state.quizReview && Array.isArray(state.quizReview[id]) ? state.quizReview[id] : [];
}

function quizReviewReady(id) {
  const items = getQuizReviewItems(id);
  return !items.length || items.every(item => item.reviewed === true && item.checkPassed === true);
}

function ensureLegacyQuizReview(id) {
  if (state.completed.includes(id) || getQuizReviewItems(id).length) return;
  const attempts = state.quizAttempts && Array.isArray(state.quizAttempts[id]) ? state.quizAttempts[id] : [];
  const bestScore = Number(state.scores && state.scores[id]);
  if (!attempts.length || !Number.isFinite(bestScore) || bestScore >= QUIZ_PASSING_SCORE) return;
  const guide = getQuizReviewGuide(id, '');
  if (!state.quizReview) state.quizReview = {};
  state.quizReview[id] = [{
    question: 'A previous quiz score no longer satisfies the updated 100% completion requirement.',
    selectedAnswer: '',
    topic: 'Full module review',
    focus: guide.focus,
    sectionIndex: guide.sectionIndex,
    reviewed: false,
    checkPassed: false,
    options: [],
    correctIndex: -1
  }];
  saveState();
}

function renderQuizReviewPanel(id) {
  ensureLegacyQuizReview(id);
  const container = document.getElementById('mod-content');
  if (!container) return;
  container.querySelector('#quiz-review-panel')?.remove();
  const sections = Array.from(container.querySelectorAll('.content-section'));
  sections.forEach((section, index) => {
    section.id = `module-${id}-review-section-${index}`;
    section.setAttribute('tabindex', '-1');
  });
  const items = getQuizReviewItems(id);
  if (!items.length) return;

  const bestScore = Number(state.scores && state.scores[id]);
  const reviewStatus = quizReviewReady(id)
    ? 'All assigned sections and focused checks are complete. You may retake the full quiz.'
    : (items.every(item => item.reviewed === true)
        ? 'Pass every focused knowledge check to enable the full quiz retake.'
        : 'Open every assigned review section, then pass each focused knowledge check.');
  const panel = document.createElement('aside');
  panel.id = 'quiz-review-panel';
  panel.className = 'quiz-review-panel';
  panel.setAttribute('aria-labelledby', 'quiz-review-heading');
  panel.innerHTML = `
    <div class="quiz-review-header">
      <div>
        <span class="eyebrow">Required remediation</span>
        <h3 id="quiz-review-heading">Review missed topics before retaking the quiz</h3>
        <p>A perfect 10 out of 10 is required. Open each assigned section, review the material, and pass its focused knowledge check before retaking the complete quiz.</p>
      </div>
      <div class="quiz-review-score"><strong>${Number.isFinite(bestScore) ? bestScore : 0}%</strong><span>Best score</span></div>
    </div>
    <div class="quiz-review-items">
      ${items.map((item, index) => `
        <article class="quiz-review-item${item.checkPassed ? ' reviewed' : (item.reviewed ? ' review-opened' : '')}">
          <div class="quiz-review-item-heading">
            <span>Missed topic ${index + 1}</span>
            <strong>${item.checkPassed ? 'Knowledge check passed ✓' : (item.reviewed ? 'Knowledge check required' : 'Review required')}</strong>
          </div>
          <p class="quiz-review-question">${escapeHtml(item.question)}</p>
          ${item.selectedAnswer ? `<p class="quiz-review-answer"><strong>Your answer:</strong> ${escapeHtml(item.selectedAnswer)}</p>` : ''}
          <p><strong>Return to:</strong> ${escapeHtml(item.topic)}</p>
          <p class="quiz-review-focus">${escapeHtml(item.focus)}</p>
          <button class="btn btn-outline btn-sm quiz-review-link" type="button" data-review-section="${item.sectionIndex}">${item.reviewed ? 'Review Section Again' : 'Open Review Section'}</button>
          ${item.reviewed ? (
            item.options.length && item.correctIndex >= 0
              ? `<div class="quiz-review-knowledge-check">
                  <label for="review-check-select-${id}-${index}"><strong>Focused check:</strong> ${escapeHtml(item.question)}</label>
                  <select id="review-check-select-${id}-${index}" ${item.checkPassed ? 'disabled' : ''}>
                    <option value="">Select an answer</option>
                    ${item.options.map((option, optionIndex) => `<option value="${optionIndex}">${escapeHtml(option)}</option>`).join('')}
                  </select>
                  <button class="btn btn-sm quiz-review-check-button" type="button" data-review-check="${index}" ${item.checkPassed ? 'disabled' : ''}>${item.checkPassed ? 'Check Passed ✓' : 'Check Answer'}</button>
                </div>`
              : `<button class="btn btn-sm quiz-review-confirm-button" type="button" data-review-confirm="${index}" ${item.checkPassed ? 'disabled' : ''}>${item.checkPassed ? 'Review Confirmed ✓' : 'Confirm Full Module Review'}</button>`
          ) : ''}
        </article>
      `).join('')}
    </div>
    <div class="quiz-review-actions">
      <p id="quiz-review-status">${reviewStatus}</p>
      <button class="btn" id="quiz-review-retake" type="button" ${quizReviewReady(id) ? '' : 'disabled'}>Retake Full 10-Question Quiz</button>
    </div>
  `;
  container.prepend(panel);
  panel.querySelectorAll('.quiz-review-link').forEach(button => {
    button.addEventListener('click', () => markQuizReviewSectionVisited(id, Number(button.dataset.reviewSection)));
  });
  panel.querySelectorAll('[data-review-check]').forEach(button => {
    button.addEventListener('click', () => submitQuizReviewCheck(id, Number(button.dataset.reviewCheck)));
  });
  panel.querySelectorAll('[data-review-confirm]').forEach(button => {
    button.addEventListener('click', () => confirmLegacyQuizReview(id, Number(button.dataset.reviewConfirm)));
  });
  panel.querySelector('#quiz-review-retake')?.addEventListener('click', showQuiz);
}

function markQuizReviewSectionVisited(id, sectionIndex) {
  const items = getQuizReviewItems(id);
  items.forEach(item => {
    if (item.sectionIndex === sectionIndex) item.reviewed = true;
  });
  saveState();
  renderQuizReviewPanel(id);
  updateQuizButton(id);
  const section = document.getElementById(`module-${id}-review-section-${sectionIndex}`) ||
    document.querySelector('#mod-content .content-section');
  if (section) {
    section.classList.add('quiz-review-highlight');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    section.focus({ preventScroll: true });
    window.setTimeout(() => section.classList.remove('quiz-review-highlight'), 4000);
  }
}


function submitQuizReviewCheck(id, itemIndex) {
  const item = getQuizReviewItems(id)[itemIndex];
  const select = document.getElementById('review-check-select-' + id + '-' + itemIndex);
  if (!item || !select || item.reviewed !== true) return;
  if (select.value === '') {
    alert('Select an answer before checking your review.');
    return;
  }
  if (Number(select.value) !== Number(item.correctIndex)) {
    alert('That answer is not correct yet. Return to the highlighted module section and review the topic again.');
    return;
  }
  item.checkPassed = true;
  saveState();
  renderQuizReviewPanel(id);
  updateQuizButton(id);
}

function confirmLegacyQuizReview(id, itemIndex) {
  const item = getQuizReviewItems(id)[itemIndex];
  if (!item || item.reviewed !== true) return;
  item.checkPassed = true;
  saveState();
  renderQuizReviewPanel(id);
  updateQuizButton(id);
}

function openModuleReview(id) {
  openModule(id);
  window.setTimeout(() => {
    const panel = document.getElementById('quiz-review-panel');
    if (panel) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      panel.setAttribute('tabindex', '-1');
      panel.focus({ preventScroll: true });
    }
  }, 50);
}

function canTakeQuiz(id) {
  if (instructorPreviewMode) return quizReviewReady(id);
  if (state.completed.includes(id)) return true;
  const timeOk = !!state.timersDone[id];
  const scrollOk = !!state.scrollDone[id];
  const videosOk = requiredVideosComplete(id);
  const reviewOk = quizReviewReady(id);
  return timeOk && scrollOk && videosOk && reviewOk;
}

function updateQuizButton(id) {
  const btn = document.getElementById('btn-to-quiz');
  if (!btn) return;
  btn.classList.remove('hidden');
  if (canTakeQuiz(id)) {
    btn.disabled = false;
    btn.textContent = instructorPreviewMode ? 'Preview Quiz →' : 'Go to Quiz →';
  } else {
    btn.disabled = true;
    const need = [];
    if (!state.timersDone[id] && !state.completed.includes(id)) need.push('required time');
    if (!state.scrollDone[id] && !state.completed.includes(id)) need.push('scroll through content');
    if (!requiredVideosComplete(id) && !state.completed.includes(id)) need.push('required videos');
    if (!quizReviewReady(id) && !state.completed.includes(id)) need.push('missed-topic review');
    btn.textContent = need.length ? ('Complete: ' + need.join(' + ')) : 'Complete requirements first';
  }
}

function updateProgressUI(id, totalSec) {
  if (!state.timerElapsed) state.timerElapsed = {};
  if (!state.scrollDone) state.scrollDone = {};
  const elapsed = state.timerElapsed[id] || 0;
  const remaining = Math.max(0, totalSec - elapsed);
  const pct = totalSec > 0 ? Math.min(100, (elapsed / totalSec) * 100) : 0;
  const timeEl = document.getElementById('prog-time');
  const fillEl = document.getElementById('prog-fill');
  const metaEl = document.getElementById('prog-meta');
  if (instructorPreviewMode) {
    if (timeEl) timeEl.textContent = 'Instructor preview · No time recorded';
    if (fillEl) {
      fillEl.style.width = '100%';
      fillEl.parentElement.setAttribute('aria-valuenow', '100');
    }
    if (metaEl) metaEl.innerHTML = '<span class="ok">✓ Seat time and content gates bypassed for demonstration</span> &nbsp;·&nbsp; <span class="wait">Video controls remain non-seekable</span>';
    updateQuizButton(id);
    return;
  }
  if (timeEl) {
    if (state.timersDone[id] || state.completed.includes(id)) {
      timeEl.textContent = 'Time complete ✓';
    } else {
      timeEl.textContent = formatTimer(remaining) + ' remaining  ·  ' + Math.floor(pct) + '%';
    }
  }
  if (fillEl) {
    const displayedProgress = (state.timersDone[id] || state.completed.includes(id)) ? 100 : pct;
    fillEl.style.width = displayedProgress + '%';
    fillEl.parentElement.setAttribute('aria-valuenow', String(Math.round(displayedProgress)));
  }
  if (metaEl) {
    const parts = [];
    if (state.timersDone[id] || state.completed.includes(id)) {
      parts.push('<span class="ok">✓ Required time done</span>');
    } else if (document.hidden) {
      parts.push('<span class="wait">⏸ Paused — return to this tab to continue</span>');
    } else if (Date.now() - lastActivityAt >= ACTIVITY_TIMEOUT_MS) {
      parts.push('<span class="wait">⏸ Paused for inactivity — interact with the page to continue</span>');
    } else {
      parts.push('<span class="wait">⏱ Time running while this tab is visible</span>');
    }
    if (state.scrollDone[id] || state.completed.includes(id)) {
      parts.push('<span class="ok">✓ Content scrolled</span>');
    } else {
      parts.push('<span class="wait">↓ Scroll to the bottom of this module</span>');
    }
    const videos = getRequiredVideos(id);
    if (videos.length) {
      const completedVideos = videos.filter(video =>
        state.videoProgress && state.videoProgress[id] &&
        state.videoProgress[id][video.id] && state.videoProgress[id][video.id].complete
      ).length;
      if (completedVideos === videos.length) {
        parts.push('<span class="ok">✓ Required videos done</span>');
      } else {
        parts.push('<span class="wait">▶ Videos ' + completedVideos + '/' + videos.length + '</span>');
      }
    }
    metaEl.innerHTML = parts.join(' &nbsp;·&nbsp; ');
  }
  updateQuizButton(id);
}

function setupScrollTracking(id) {
  if (state.scrollDone[id] || state.completed.includes(id)) {
    state.scrollDone[id] = true;
    return;
  }
  const marker = document.getElementById('scroll-end-marker');
  if (!marker) {
    // fallback: mark scroll done if no marker (shouldn't happen)
    return;
  }
  if (scrollObserver) {
    try { scrollObserver.disconnect(); } catch (e) {}
  }
  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        state.scrollDone[id] = true;
        saveState();
        const m = getModule(id);
        const totalSec = Math.round((m ? m.hours : 1) * 3600);
        updateProgressUI(id, totalSec);
        try { scrollObserver.disconnect(); } catch (e) {}
      }
    });
  }, { threshold: 0.1 });
  scrollObserver.observe(marker);
}

function autoStartModuleTimer(id, hours) {
  if (!state.timerElapsed) state.timerElapsed = {};
  if (state.timersDone[id] || state.completed.includes(id)) {
    updateProgressUI(id, Math.round(hours * 3600));
    return;
  }
  const totalSec = Math.round(hours * 3600);
  if (timerIntervals[id]) clearInterval(timerIntervals[id]);

  // Tick every second; accumulate only while tab visible
  timerIntervals[id] = setInterval(() => {
    if (currentModuleId !== id) return;
    if (state.timersDone[id]) {
      clearInterval(timerIntervals[id]);
      delete timerIntervals[id];
      return;
    }
    if (document.hidden || Date.now() - lastActivityAt >= ACTIVITY_TIMEOUT_MS) {
      updateProgressUI(id, totalSec);
      return;
    }
    state.timerElapsed[id] = (state.timerElapsed[id] || 0) + 1;
    // Persist every 15 seconds to limit write churn
    if (state.timerElapsed[id] % 15 === 0) saveState();

    if (state.timerElapsed[id] >= totalSec) {
      state.timerElapsed[id] = totalSec;
      state.timersDone[id] = true;
      saveState();
      clearInterval(timerIntervals[id]);
      delete timerIntervals[id];
    }
    updateProgressUI(id, totalSec);
  }, 1000);

  updateProgressUI(id, totalSec);
}

function openModule(id) {
  stopActiveTimers();
  currentModuleId = id;
  const m = getModule(id);
  if (!m) return;
  hideAll();
  document.getElementById('screen-module').classList.remove('hidden');
  document.getElementById('mod-breadcrumb').textContent = 'Module ' + m.id + ' of ' + getModules().length;
  document.getElementById('mod-title').textContent = m.title;
  document.getElementById('mod-hours').textContent = m.hours + ' classroom hours' +
    (instructorPreviewMode ? ' · Instructor preview' : ' (required seat time)') +
    (state.mine ? ' · ' + state.mine : '');

  // Ensure state bags exist (older saved sessions)
  if (!state.timerElapsed) state.timerElapsed = {};
  if (!state.scrollDone) state.scrollDone = {};
  if (!state.timersDone) state.timersDone = {};

  let html = '<div class="card"><strong>Learning Objectives</strong><ul style="margin-top:8px;">';
  m.objectives.forEach(o => { html += '<li>' + o + '</li>'; });
  html += '</ul></div>';
  html += m.content;
  html += '<div class="scroll-marker" id="scroll-end-marker"></div>';
  html += instructorPreviewMode
    ? '<p style="font-size:0.8rem;color:var(--text-muted);text-align:center;margin:12px 0;">Instructor preview · Content and quiz are available without recording progress</p>'
    : '<p style="font-size:0.8rem;color:var(--text-muted);text-align:center;margin:12px 0;">↓ Scroll to the end of this content (required) · Required time runs automatically while this tab is open</p>';

  document.getElementById('mod-content').innerHTML = html;

  renderQuizReviewPanel(id);
  renderRequiredVideos(id);

  // Hide legacy manual timer UI inside module content (time is auto now)
  document.querySelectorAll('#mod-content .video-box .timer-display, #mod-content .video-box [id^="btn-timer-"], #mod-content .video-box [id^="timer-status-"]').forEach(el => {
    el.style.display = 'none';
  });
  // Also hide standalone timer boxes that aren't in video-box
  document.querySelectorAll('#mod-content [id^="btn-timer-"], #mod-content [id^="timer-status-"], #mod-content [id^="timer-"]').forEach(el => {
    if (el.closest && el.closest('.progress-panel')) return;
    el.style.display = 'none';
  });

  if (instructorPreviewMode) {
    updateProgressUI(id, Math.round(m.hours * 3600));
  } else {
    setupScrollTracking(id);
    autoStartModuleTimer(id, m.hours);
  }
  initializeRequiredVideos(id);
  updateQuizButton(id);
}

function formatTimer(sec) {
  if (sec < 0) sec = 0;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) {
    return h + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

// Kept for any leftover onclick handlers in content; routes to auto system
function startTimer(id, minutes) {
  if (instructorPreviewMode) return;
  const m = getModule(id);
  autoStartModuleTimer(id, m ? m.hours : (minutes / 60));
}

function showQuiz() {
  stopActiveTimers();
  const m = getModule(currentModuleId);
  if (!m) return;
  if (!canTakeQuiz(m.id)) {
    const missing = [];
    if (!state.timersDone[m.id] && !state.completed.includes(m.id)) missing.push('required seat time');
    if (!state.scrollDone[m.id] && !state.completed.includes(m.id)) missing.push('scroll through all content');
    if (!requiredVideosComplete(m.id) && !state.completed.includes(m.id)) missing.push('all required videos');
    if (!quizReviewReady(m.id) && !state.completed.includes(m.id)) missing.push('missed-topic review');
    alert('Complete these before the quiz: ' + missing.join(' and ') + '.');
    return;
  }
  hideAll();
  document.getElementById('screen-quiz').classList.remove('hidden');
  document.getElementById('quiz-title').textContent = 'Module ' + m.id + ' Quiz – ' + m.title;
  const instructions = document.getElementById('quiz-instructions');
  if (instructions) instructions.textContent = instructorPreviewMode
    ? 'Instructor preview: answer the questions to demonstrate scoring. The result will not be saved.'
    : 'You must answer all 10 questions correctly to unlock the next module. Missed topics require review before a full retake.';
  document.getElementById('quiz-result').classList.add('hidden');
  document.getElementById('quiz-result').innerHTML = '';

  const container = document.getElementById('quiz-questions');
  container.innerHTML = '';
  currentQuizQuestions = m.questions.map((q, originalIndex) => ({ q, originalIndex }))
    .sort(() => Math.random() - 0.5);
  currentQuizQuestions.forEach((item, qi) => {
    const q = item.q;
    const div = document.createElement('div');
    div.className = 'quiz-q';
    div.innerHTML = '<h4>' + (qi + 1) + '. ' + q.q + '</h4>';
    q.options.map((opt, originalIndex) => ({ opt, originalIndex }))
      .sort(() => Math.random() - 0.5)
      .forEach(({ opt, originalIndex }) => {
      const label = document.createElement('label');
      label.className = 'quiz-option';
      label.innerHTML = '<input type="radio" name="q' + qi + '" value="' + originalIndex + '"> ' + opt;
      label.onclick = function() {
        div.querySelectorAll('.quiz-option').forEach(el => el.classList.remove('selected'));
        label.classList.add('selected');
      };
      div.appendChild(label);
    });
    container.appendChild(div);
  });
}

function submitQuiz() {
  const m = getModule(currentModuleId);
  if (!m) return;
  let correct = 0;
  let answered = 0;
  const missed = [];
  currentQuizQuestions.forEach((item, qi) => {
    const q = item.q;
    const selected = document.querySelector('input[name="q' + qi + '"]:checked');
    if (selected) {
      answered++;
      const selectedIndex = parseInt(selected.value, 10);
      if (selectedIndex === q.answer) correct++;
      else missed.push({ question: q, selectedIndex });
    }
  });
  if (answered < m.questions.length) {
    alert('Please answer every question before submitting.');
    return;
  }
  const percent = Math.round((correct / m.questions.length) * 100);
  const resultEl = document.getElementById('quiz-result');
  resultEl.classList.remove('hidden');
  if (instructorPreviewMode) {
    const previewPassed = percent === QUIZ_PASSING_SCORE;
    const resultClass = previewPassed ? 'result-pass' : 'result-fail';
    const resultLabel = previewPassed ? 'PREVIEW PASS' : 'PREVIEW REVIEW REQUIRED';
    if (previewPassed) {
      if (state.quizReview) delete state.quizReview[m.id];
      resultEl.innerHTML = '<p class="' + resultClass + '">' + resultLabel + ' – ' + percent + '% (' + correct + '/' + m.questions.length + ')</p><p>A learner must earn 100%. Demonstration only — this score was not saved and no module completion was awarded.</p><button class="btn btn-outline btn-sm" onclick="showDashboard()" style="margin-top:10px;">Return to Preview Dashboard</button>';
      return;
    }
    if (!state.quizReview) state.quizReview = {};
    state.quizReview[m.id] = missed.map(item => {
      const guide = getQuizReviewGuide(m.id, item.question.q);
      return {
        question: item.question.q,
        selectedAnswer: item.question.options[item.selectedIndex],
        topic: guide.topic,
        focus: guide.focus,
        sectionIndex: guide.sectionIndex,
        reviewed: false,
        checkPassed: false,
        options: item.question.options.slice(),
        correctIndex: item.question.answer
      };
    });
    state.scores[m.id] = Math.max(Number(state.scores[m.id]) || 0, percent);
    const previewRemediation = state.quizReview[m.id].map(item =>
      '<article><strong>' + escapeHtml(item.topic) + '</strong><p>' +
      escapeHtml(item.question) + '</p><span>Your answer: ' +
      escapeHtml(item.selectedAnswer) + '</span></article>'
    ).join('');
    resultEl.innerHTML =
      '<p class="' + resultClass + '">' + resultLabel + ' – ' + percent + '% (' + correct + '/' + m.questions.length + ')</p>' +
      '<p>A learner must earn 100%. Demonstration only — this score and review activity will not be saved.</p>' +
      '<div class="quiz-remediation-summary">' + previewRemediation + '</div>' +
      '<button class="btn" onclick="openModuleReview(' + m.id + ')">Preview Missed-Topic Review →</button>';
    return;
  }

  if (!state.quizAttempts) state.quizAttempts = {};
  if (!Array.isArray(state.quizAttempts[m.id])) state.quizAttempts[m.id] = [];
  state.quizAttempts[m.id].push({
    at: new Date().toISOString(),
    score: percent,
    passed: percent === QUIZ_PASSING_SCORE
  });
  state.quizAttempts[m.id] = state.quizAttempts[m.id].slice(-20);

  if (percent === QUIZ_PASSING_SCORE) {
    resultEl.innerHTML = '<p class="result-pass">PASSED – 100% (10/10)</p><p>Perfect score achieved. The module is complete and the next section is now available.</p>';
    if (!state.completed.includes(m.id)) state.completed.push(m.id);
    state.scores[m.id] = QUIZ_PASSING_SCORE;
    if (state.quizReview) delete state.quizReview[m.id];
    saveState();
    setTimeout(() => showDashboard(), 1600);
    return;
  }

  if (state.completed.includes(m.id) && Number(state.scores[m.id]) === QUIZ_PASSING_SCORE) {
    saveState();
    resultEl.innerHTML = '<p class="result-fail">PRACTICE SCORE – ' + percent + '% (' + correct + '/' + m.questions.length + ')</p><p>Your previously recorded 100% completion remains valid. Review the missed material before trying this practice quiz again.</p><button class="btn btn-outline btn-sm" onclick="showDashboard()" style="margin-top:10px;">Return to Dashboard</button>';
    return;
  }

  if (!state.quizReview) state.quizReview = {};
  state.quizReview[m.id] = missed.map(item => {
    const guide = getQuizReviewGuide(m.id, item.question.q);
    return {
      question: item.question.q,
      selectedAnswer: item.question.options[item.selectedIndex],
      topic: guide.topic,
      focus: guide.focus,
      sectionIndex: guide.sectionIndex,
      reviewed: false,
      checkPassed: false,
      options: item.question.options.slice(),
      correctIndex: item.question.answer
    };
  });
  state.scores[m.id] = Math.max(Number(state.scores[m.id]) || 0, percent);
  saveState();

  const remediationSummary = state.quizReview[m.id].map(item =>
    '<article><strong>' + escapeHtml(item.topic) + '</strong><p>' +
    escapeHtml(item.question) + '</p><span>Your answer: ' +
    escapeHtml(item.selectedAnswer) + '</span></article>'
  ).join('');
  resultEl.innerHTML =
    '<p class="result-fail">REVIEW REQUIRED – ' + percent + '% (' + correct + '/' + m.questions.length + ')</p>' +
    '<p>A perfect score is required. Review the ' + missed.length + ' missed topic' +
    (missed.length === 1 ? '' : 's') + ' below before the full quiz can be retaken.</p>' +
    '<div class="quiz-remediation-summary">' + remediationSummary + '</div>' +
    '<button class="btn" onclick="openModuleReview(' + m.id + ')">Review Missed Topics →</button>';
}

async function showCertificate() {
  if (instructorPreviewMode) {
    alert('Certificates are disabled in instructor preview because no learner completion is recorded.');
    return;
  }
  if (!learnerAccount) {
    alert('Sign in to your learner account before generating a classroom completion certificate.');
    return;
  }
  await syncLearnerProgress(true);
  const modules = getModules();
  const validCompletion = modules.every(m =>
    state.completed.includes(m.id) &&
    state.timersDone[m.id] === true &&
    state.scrollDone[m.id] === true &&
    Number(state.scores[m.id]) === QUIZ_PASSING_SCORE &&
    requiredVideosComplete(m.id)
  );
  if (!validCompletion) {
    alert('Every module must have completed seat time, content review, required videos, and a perfect 100% quiz score before a certificate can be generated.');
    return;
  }
  hideAll();
  document.getElementById('screen-cert').classList.remove('hidden');
  const hours = modules.reduce((s, m) => s + m.hours, 0);
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const signoffs = learnerRecordMeta?.signoffs || {};
  const signoffMark = key => signoffs[key] ? '☑' : '☐';
  let rows = '';
  modules.forEach(m => {
    const score = state.scores[m.id] != null ? state.scores[m.id] + '%' : '—';
    rows += '<tr><td>' + m.id + '. ' + m.title + '</td><td>' + m.hours + ' hrs</td><td>' + score + '</td></tr>';
  });
  document.getElementById('cert-body').innerHTML = `
    <h2>Certificate of Classroom Completion</h2>
    <p style="font-size:0.9rem;color:#444;">MSHA Part 48 New Miner Training – Classroom Portion</p>
    <p style="margin-top:20px;">This certifies that</p>
    <div class="name">${escapeHtml(state.name)}</div>
    <p>${state.mine ? escapeHtml(state.mine) + '<br>' : ''}has completed the <strong>${hours.toFixed(1)}-hour classroom portion</strong><br>of Part 48 New Miner Training topics on</p>
    <p style="font-weight:600;margin:12px 0;">${dateStr}</p>
    <table>
      <thead><tr><th>Module</th><th>Hours</th><th>Score</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="font-size:0.8rem;margin-top:20px;color:#555;text-align:left;">
      <strong>Important:</strong> This document records completion of the classroom support modules only.
      It does <em>not</em> by itself constitute full compliance with 30 CFR Part 48.
      Approximately 8 hours of mine-site specific training, required hands-on practice with the MSA W65 used at these operations,
      and oversight by an MSHA-approved instructor under an approved training plan are still required.
      Attach supporting records to the official MSHA Form 5000-23 as directed by the operator and instructor.
    </p>
    <div class="instructor-verification-checklist" style="margin-top:20px;padding:16px;border:2px solid #374151;text-align:left;">
      <h3 style="margin-top:0;">Instructor Verification — Authenticated Record</h3>
      <p>This classroom certificate is not a final Part 48 training certificate. The operator and MSHA-approved instructor must verify and document, as required by the approved plan:</p>
      <ul>
        <li>${signoffMark('siteTraining')} Approximately 8 hours of mine-site training.</li>
        <li>${signoffMark('mineTour')} Mine tour and observation of the mining method.</li>
        <li>${signoffMark('plansProcedures')} Current site-specific plans, escapeways, emergency procedures, and applicable demonstrations.</li>
        <li>${signoffMark('w65Practice')} MSA W65 instruction, demonstration, and hands-on practice required by the approved plan.</li>
        <li>${signoffMark('fallProtectionPractice')} Harness, lanyard, and SRL inspection, fit, compatibility, tie-off, clearance, and rescue demonstration.</li>
        <li>${signoffMark('gasMonitorPractice')} MSA ALTAIR 4X startup, bump test, alarm response, failed-test response, and hands-on verification.</li>
        <li>${signoffMark('taskTraining')} Applicable new-task training, supervised practice, and demonstrated safe procedures.</li>
        <li>${signoffMark('form5000_23')} MSHA Form 5000-23 or an approved alternate form completed.</li>
      </ul>
      <p>Checked items reflect authenticated instructor signoffs saved to the server record. Any unchecked item remains outstanding.</p>
    </div>
    <p style="margin-top:24px;font-size:0.75rem;color:#777;">Generated by Part 48 Classroom Training Support Tool · Account ${escapeHtml(learnerAccount.email || '')} · Server record ${escapeHtml(learnerRecordMeta?.updatedAt || 'pending sync')}</p>
  `;
}

async function downloadTrainingRecord() {
  if (instructorPreviewMode) {
    alert('Training-record exports are disabled in instructor preview.');
    return;
  }
  if (!learnerAccount) {
    alert('Sign in to your learner account before exporting a training record.');
    return;
  }
  await syncLearnerProgress(true);
  const modules = getModules();
  const record = {
    format: 'msha48-training-record-v2',
    exportedAt: new Date().toISOString(),
    serverRecordUpdatedAt: learnerRecordMeta?.updatedAt || null,
    serverRecordVersion: learnerRecordMeta?.version || null,
    learnerAccount: { id: learnerAccount.id, email: learnerAccount.email },
    trainee: state.name,
    mine: state.mine,
    startedAt: state.startedAt,
    totalProgramHours: modules.reduce((sum, m) => sum + m.hours, 0),
    requiredQuizScore: QUIZ_PASSING_SCORE,
    recordType: 'classroom-support-record',
    complianceStatus: 'Classroom portion only — instructor verification and official Part 48 certification remain required.',
    externalVerificationRequired: [
      'Approximately 8 hours of mine-site training and mine tour',
      'Current site-specific plans, escapeways, and emergency procedures',
      'MSA W65 instruction, demonstration, and practice required by the approved plan',
      'Applicable new-task training, supervised practice, and demonstrated safe procedures',
      'Operator or instructor certification on MSHA Form 5000-23 or approved alternate'
    ],
    instructorSignoffs: learnerRecordMeta?.signoffs || {},
    instructorSignoffDetails: learnerRecordMeta?.signoffDetails || {},
    instructorNotes: learnerRecordMeta?.instructorNotes || '',
    modules: modules.map(m => ({
      id: m.id,
      title: m.title,
      creditedHours: m.hours,
      completed: state.completed.includes(m.id),
      seatTimeSeconds: Math.min(Math.round(m.hours * 3600), Number(state.timerElapsed[m.id]) || 0),
      seatTimeComplete: state.timersDone[m.id] === true,
      contentReviewed: state.scrollDone[m.id] === true,
      requiredVideos: getRequiredVideos(m.id).map(video => {
        const progress = state.videoProgress && state.videoProgress[m.id] && state.videoProgress[m.id][video.id];
        return {
          id: video.id,
          title: video.title,
          durationSeconds: video.durationSeconds,
          watchedSeconds: Math.min(video.durationSeconds, Number(progress && progress.watchedSeconds) || 0),
          complete: progress && progress.complete === true,
          completedAt: progress && progress.complete ? progress.updatedAt : null
        };
      }),
      bestScore: state.scores[m.id] == null ? null : Number(state.scores[m.id]),
      quizAttempts: (state.quizAttempts && state.quizAttempts[m.id]) || [],
      pendingQuizReview: (state.quizReview && state.quizReview[m.id]) || []
    })),
    notice: 'Browser-generated support record. Instructor verification and official MSHA records remain required.'
  };
  const safeName = (state.name || 'trainee').replace(/[^a-z0-9_-]+/gi, '-').replace(/^-|-$/g, '') || 'trainee';
  const blob = new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = safeName + '-msha-training-record.json';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function hideAll() {
  ['screen-start', 'screen-dashboard', 'screen-module', 'screen-quiz', 'screen-cert'].forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });
}

// Init
loadState();
showStart();
