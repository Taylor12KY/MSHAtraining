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
  startedAt: null
};

let instructorPreviewMode = false;
let learnerStateSnapshot = null;
let instructorIdentity = null;

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
        passed: a.passed === true
      }));
    }
    if (validIds.has(id) && Array.isArray(candidate.completed) && candidate.completed.includes(id) &&
        clean.timersDone[id] && clean.scrollDone[id] && clean.scores[id] >= 80 &&
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } else {
      memoryStore = JSON.parse(JSON.stringify(state));
    }
  } catch (e) {
    console.warn('Could not save training progress:', e);
    try { memoryStore = JSON.parse(JSON.stringify(state)); } catch (e2) {}
  }
}

function startTraining() {
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
  if (confirm('This will erase all progress for this browser. Continue?')) {
    try {
      if (HAS_LOCAL_STORAGE) localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    memoryStore = null;
    state = { name: '', mine: '', completed: [], scores: {}, timersDone: {}, timerElapsed: {}, scrollDone: {}, videoProgress: {}, quizAttempts: {}, startedAt: null };
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
  document.getElementById('dash-bar').style.width = instructorPreviewMode
    ? '100%'
    : Math.min(100, (hoursDone / totalHours) * 100) + '%';
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

    let statusClass = 'status-locked';
    let statusText = 'Locked';
    if (isDone) { statusClass = 'status-done'; statusText = 'Completed'; }
    else if (isCurrent) { statusClass = 'status-available'; statusText = 'Available'; }
    if (instructorPreviewMode) { statusClass = 'status-available'; statusText = 'Preview'; }

    const div = document.createElement('div');
    div.className = 'module-item' + (isDone ? ' completed' : '') + (isCurrent ? ' current' : '') + (isLocked ? ' locked' : '') + (instructorPreviewMode ? ' preview-module' : '');
    
    div.innerHTML = `
      <div class="mod-num">${isDone ? '✓' : m.id}</div>
      <div class="mod-info">
        <div class="mod-title">${m.title}</div>
        <div class="mod-meta">${m.hours} hrs · ${m.questions.length} quiz questions</div>
      </div>
      <span class="status-badge ${statusClass}">${statusText}</span>
    `;
    if (!isLocked) {
      div.onclick = () => openModule(m.id);
    }
    list.appendChild(div);
  });

  const allDone = modules.every(m => state.completed.includes(m.id));
  document.getElementById('btn-cert').classList.toggle('hidden', instructorPreviewMode || !allDone);
  const recordButton = document.getElementById('btn-training-record');
  if (recordButton) recordButton.classList.toggle('hidden', instructorPreviewMode);
  const changeButton = document.getElementById('btn-change-user');
  if (changeButton) changeButton.textContent = instructorPreviewMode ? '← Exit Preview' : '← Change User';
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
  if (!box.querySelector('.video-watch-controls')) {
    box.insertAdjacentHTML('beforeend', requiredVideoControls(video));
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
    <p>Complete all ${videos.length} assigned video${videos.length === 1 ? '' : 's'} in this player before the module quiz unlocks. Videos may be watched in any order.</p>
  `;

  videos.forEach(video => {
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

function canTakeQuiz(id) {
  if (instructorPreviewMode) return true;
  if (state.completed.includes(id)) return true;
  const timeOk = !!state.timersDone[id];
  const scrollOk = !!state.scrollDone[id];
  const videosOk = requiredVideosComplete(id);
  return timeOk && scrollOk && videosOk;
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
    if (fillEl) fillEl.style.width = '100%';
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
  if (fillEl) fillEl.style.width = ((state.timersDone[id] || state.completed.includes(id)) ? 100 : pct) + '%';
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
    alert('Complete these before the quiz: ' + missing.join(' and ') + '.');
    return;
  }
  hideAll();
  document.getElementById('screen-quiz').classList.remove('hidden');
  document.getElementById('quiz-title').textContent = 'Module ' + m.id + ' Quiz – ' + m.title;
  const instructions = document.getElementById('quiz-instructions');
  if (instructions) instructions.textContent = instructorPreviewMode
    ? 'Instructor preview: answer the questions to demonstrate scoring. The result will not be saved.'
    : 'You must score at least 80% to unlock the next module. Answer all questions.';
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
  currentQuizQuestions.forEach((item, qi) => {
    const q = item.q;
    const selected = document.querySelector('input[name="q' + qi + '"]:checked');
    if (selected) {
      answered++;
      if (parseInt(selected.value, 10) === q.answer) correct++;
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
    const resultClass = percent >= 80 ? 'result-pass' : 'result-fail';
    const resultLabel = percent >= 80 ? 'PREVIEW PASS' : 'PREVIEW SCORE';
    resultEl.innerHTML = '<p class="' + resultClass + '">' + resultLabel + ' – ' + percent + '% (' + correct + '/' + m.questions.length + ')</p><p>Demonstration only — this score was not saved and no module completion was awarded.</p><button class="btn btn-sm" onclick="showQuiz()" style="margin-top:10px;">Try Preview Again</button>';
    return;
  }
  if (!state.quizAttempts) state.quizAttempts = {};
  if (!Array.isArray(state.quizAttempts[m.id])) state.quizAttempts[m.id] = [];
  state.quizAttempts[m.id].push({ at: new Date().toISOString(), score: percent, passed: percent >= 80 });
  state.quizAttempts[m.id] = state.quizAttempts[m.id].slice(-20);
  if (percent >= 80) {
    resultEl.innerHTML = '<p class="result-pass">PASSED – ' + percent + '% (' + correct + '/' + m.questions.length + ')</p><p>Module unlocked for completion. You may return to the dashboard.</p>';
    if (!state.completed.includes(m.id)) {
      state.completed.push(m.id);
    }
    state.scores[m.id] = percent;
    saveState();
    // Auto-advance option
    setTimeout(() => showDashboard(), 1200);
  } else {
    saveState();
    resultEl.innerHTML = '<p class="result-fail">NOT PASSED – ' + percent + '% (' + correct + '/' + m.questions.length + ')</p><p>You need at least 80%. Review the module content and try again.</p><button class="btn btn-sm" onclick="showQuiz()" style="margin-top:10px;">Retry Quiz</button>';
  }
}

function showCertificate() {
  if (instructorPreviewMode) {
    alert('Certificates are disabled in instructor preview because no learner completion is recorded.');
    return;
  }
  const modules = getModules();
  const validCompletion = modules.every(m =>
    state.completed.includes(m.id) &&
    state.timersDone[m.id] === true &&
    state.scrollDone[m.id] === true &&
    Number(state.scores[m.id]) >= 80 &&
    requiredVideosComplete(m.id)
  );
  if (!validCompletion) {
    alert('Every module must have completed seat time, content review, and a passing quiz score before a certificate can be generated.');
    return;
  }
  hideAll();
  document.getElementById('screen-cert').classList.remove('hidden');
  const hours = modules.reduce((s, m) => s + m.hours, 0);
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
      Approximately 8 hours of mine-site specific training, required hands-on SCSR training,
      and oversight by an MSHA-approved instructor under an approved training plan are still required.
      Attach supporting records to the official MSHA Form 5000-23 as directed by the operator and instructor.
    </p>
    <p style="margin-top:24px;font-size:0.75rem;color:#777;">Generated by Part 48 Classroom Training Support Tool · Progress stored locally</p>
  `;
}

function downloadTrainingRecord() {
  if (instructorPreviewMode) {
    alert('Training-record exports are disabled in instructor preview.');
    return;
  }
  const modules = getModules();
  const record = {
    format: 'msha48-training-record-v1',
    exportedAt: new Date().toISOString(),
    trainee: state.name,
    mine: state.mine,
    startedAt: state.startedAt,
    totalProgramHours: modules.reduce((sum, m) => sum + m.hours, 0),
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
      quizAttempts: (state.quizAttempts && state.quizAttempts[m.id]) || []
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
