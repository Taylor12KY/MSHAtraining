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

let currentModuleId = null;
let timerIntervals = {};
let videoPlayers = {};
let videoPlayerMeta = {};
let videoWatchIntervals = {};
let youtubeApiPromise = null;
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
  document.getElementById('dash-name').textContent = state.name || '—';
  document.getElementById('dash-mine').textContent = state.mine || '';

  const modules = getModules();
  const totalHours = modules.reduce((sum, m) => sum + m.hours, 0);
  let hoursDone = 0;
  state.completed.forEach(id => {
    const m = modules.find(x => x.id === id);
    if (m) hoursDone += m.hours;
  });
  document.getElementById('dash-hours').textContent = hoursDone.toFixed(1) + ' / ' + totalHours.toFixed(1) + ' hrs';
  document.getElementById('dash-bar').style.width = Math.min(100, (hoursDone / totalHours) * 100) + '%';
  document.getElementById('dash-status').textContent = state.completed.length + ' of ' + modules.length + ' modules completed';

  const list = document.getElementById('module-list');
  list.innerHTML = '';
  modules.forEach((m, idx) => {
    const isDone = state.completed.includes(m.id);
    const prevDone = idx === 0 || state.completed.includes(modules[idx - 1].id);
    const isLocked = !isDone && !prevDone;
    const isCurrent = !isDone && prevDone;

    let statusClass = 'status-locked';
    let statusText = 'Locked';
    if (isDone) { statusClass = 'status-done'; statusText = 'Completed'; }
    else if (isCurrent) { statusClass = 'status-available'; statusText = 'Available'; }

    const div = document.createElement('div');
    div.className = 'module-item' + (isDone ? ' completed' : '') + (isCurrent ? ' current' : '') + (isLocked ? ' locked' : '');
    
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
  document.getElementById('btn-cert').classList.toggle('hidden', !allDone);
}

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

function requiredVideoControls(video) {
  return `
    <div class="video-watch-controls">
      <button type="button" class="btn btn-sm video-play-toggle" data-video-id="${video.id}">Start / Resume</button>
      <span class="video-watch-status" id="video-status-${video.id}">Required viewing · 0:00 / ${formatVideoTime(video.durationSeconds)}</span>
    </div>
    <div class="video-watch-track" aria-hidden="true"><div class="video-watch-fill" id="video-fill-${video.id}"></div></div>
    <p class="video-watch-note" id="video-note-${video.id}">Forward seeking is disabled. Rewinding is allowed; completion is saved in this browser.</p>
  `;
}

function configureRequiredVideoBox(box, iframe, video) {
  box.classList.add('managed-video-box');
  box.dataset.videoId = video.id;
  iframe.id = 'yt-player-' + video.id;
  iframe.src = managedYouTubeUrl(video.id);
  iframe.title = video.title;
  iframe.removeAttribute('allowfullscreen');
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
          <iframe id="yt-player-${video.id}" src="${managedYouTubeUrl(video.id)}" title="${escapeHtml(video.title)}" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
        ${requiredVideoControls(video)}
        <p class="video-fallback"><a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener">Open on YouTube ↗</a> <span>(external viewing cannot receive completion credit)</span></p>
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

function initializeRequiredVideos(moduleId) {
  const videos = getRequiredVideos(moduleId);
  if (!videos.length) return;
  loadYouTubeApi().then(() => {
    if (currentModuleId !== moduleId) return;
    videos.forEach(video => {
      const elementId = 'yt-player-' + video.id;
      if (!document.getElementById(elementId) || videoPlayers[video.id]) return;
      videoPlayerMeta[video.id] = { moduleId, video, suppressSeekUntil: 0, lastSavedSecond: -1 };
      videoPlayers[video.id] = new YT.Player(elementId, {
        events: {
          onReady: event => onRequiredVideoReady(event, video.id),
          onStateChange: event => onRequiredVideoStateChange(event, video.id),
          onError: () => setRequiredVideoNote(video.id, 'This video could not load. Check the network or use the YouTube link, then ask the instructor for assistance.', true)
        }
      });
    });
  }).catch(() => {
    videos.forEach(video => setRequiredVideoNote(video.id, 'The tracked video player could not load. Check the network and reload this module.', true));
  });
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

function onRequiredVideoStateChange(event, videoId) {
  const meta = videoPlayerMeta[videoId];
  if (!meta) return;
  if (event.data === YT.PlayerState.PLAYING) {
    Object.keys(videoPlayers).forEach(otherId => {
      if (otherId !== videoId) {
        try { videoPlayers[otherId].pauseVideo(); } catch (e) {}
      }
    });
    startRequiredVideoWatch(videoId);
  } else {
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
  try {
    if (player && player.getPlayerState() === YT.PlayerState.PLAYING) label = 'Pause';
  } catch (e) {}
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
    try { videoPlayers[videoId].pauseVideo(); } catch (e) {}
  });
});

function canTakeQuiz(id) {
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
    btn.textContent = 'Go to Quiz →';
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
  document.getElementById('mod-hours').textContent = m.hours + ' classroom hours (required seat time)' + (state.mine ? ' · ' + state.mine : '');

  // Ensure state bags exist (older saved sessions)
  if (!state.timerElapsed) state.timerElapsed = {};
  if (!state.scrollDone) state.scrollDone = {};
  if (!state.timersDone) state.timersDone = {};

  let html = '<div class="card"><strong>Learning Objectives</strong><ul style="margin-top:8px;">';
  m.objectives.forEach(o => { html += '<li>' + o + '</li>'; });
  html += '</ul></div>';
  html += m.content;
  html += '<div class="scroll-marker" id="scroll-end-marker"></div>';
  html += '<p style="font-size:0.8rem;color:var(--text-muted);text-align:center;margin:12px 0;">↓ Scroll to the end of this content (required) · Required time runs automatically while this tab is open</p>';

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

  setupScrollTracking(id);
  autoStartModuleTimer(id, m.hours);
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
  if (!state.quizAttempts) state.quizAttempts = {};
  if (!Array.isArray(state.quizAttempts[m.id])) state.quizAttempts[m.id] = [];
  state.quizAttempts[m.id].push({ at: new Date().toISOString(), score: percent, passed: percent >= 80 });
  state.quizAttempts[m.id] = state.quizAttempts[m.id].slice(-20);
  const resultEl = document.getElementById('quiz-result');
  resultEl.classList.remove('hidden');

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
