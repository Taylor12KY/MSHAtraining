import {
  acceptInvite,
  getSettings,
  getUser,
  handleAuthCallback,
  login,
  logout,
  requestPasswordRecovery,
  signup,
  updateUser
} from '@netlify/identity';

const isInstructorRoute = document.body.dataset.instructorPreview === 'true';
let inviteToken = '';
let authIntent = 'instructor';
let currentUser = null;
let instructorRecords = [];
let selectedRecordId = '';

const byId = id => document.getElementById(id);
const escapeHtml = value => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

function rolesFor(user) {
  if (Array.isArray(user?.roles)) return user.roles;
  if (Array.isArray(user?.appMetadata?.roles)) return user.appMetadata.roles;
  if (Array.isArray(user?.app_metadata?.roles)) return user.app_metadata.roles;
  return [];
}

function displayName(user) {
  return user?.name || user?.userMetadata?.full_name || user?.user_metadata?.full_name || user?.email || 'Learner';
}

function errorMessage(error, fallback) {
  if (error && typeof error.message === 'string' && error.message.trim()) return error.message;
  return fallback;
}

async function authenticatedRequest(path, options = {}) {
  const user = await getUser();
  if (!user) throw new Error('Your session has expired. Please sign in again.');
  currentUser = user;
  const token = user.token?.access_token;
  const headers = new Headers(options.headers || {});
  headers.set('Accept', 'application/json');
  if (options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(path, { ...options, headers, credentials: 'same-origin' });
  let body = null;
  try { body = await response.json(); } catch {}
  if (!response.ok) throw new Error(body?.error || `Request failed (${response.status}).`);
  return body;
}

function showAuthStatus(message, isError = false) {
  const status = byId('instructor-auth-status');
  if (!status) return;
  status.textContent = message || '';
  status.classList.toggle('auth-error', isError);
  status.classList.toggle('hidden', !message);
}

function showLearnerStatus(message, isError = false) {
  const status = byId('learner-auth-status');
  if (!status) return;
  status.textContent = message || '';
  status.classList.toggle('auth-error', isError);
  status.classList.toggle('hidden', !message);
}

function setAuthView(view) {
  ['login', 'invite', 'recovery', 'recovery-request'].forEach(name => {
    byId('instructor-' + name + '-form')?.classList.toggle('hidden', name !== view);
  });
  showAuthStatus('');
}

function setLearnerView(view) {
  byId('learner-login-form')?.classList.toggle('hidden', view !== 'login');
  byId('learner-signup-form')?.classList.toggle('hidden', view !== 'signup');
  showLearnerStatus('');
}

async function configureLearnerRegistration() {
  const signupButton = byId('learner-show-signup');
  const registrationNote = byId('learner-registration-note');
  try {
    const settings = await getSettings();
    const inviteOnly = Boolean(settings?.disableSignup);
    signupButton?.classList.toggle('hidden', inviteOnly);
    registrationNote?.classList.toggle('hidden', !inviteOnly);
    if (inviteOnly) setLearnerView('login');
  } catch {
    // Fail closed when the deployed Identity registration policy cannot be verified.
    signupButton?.classList.add('hidden');
    registrationNote?.classList.remove('hidden');
  }
}

function openAccountAccess(view = 'login', intent = 'instructor') {
  authIntent = intent;
  setAuthView(view);
  const title = byId('instructor-auth-title');
  const intro = byId('instructor-auth-intro');
  if (title) title.textContent = intent === 'instructor' ? 'Instructor Access' : 'Account Recovery';
  if (intro) intro.textContent = intent === 'instructor'
    ? 'Sign in with an invited instructor account. Learner progress and certificates are disabled in preview mode.'
    : 'Use the secure email link to regain access to your learner account.';
  byId('instructor-auth-modal')?.classList.remove('hidden');
  window.setTimeout(() => {
    const field = byId(view === 'login' ? 'instructor-email' :
      view === 'invite' ? 'instructor-invite-password' :
      view === 'recovery' ? 'instructor-new-password' : 'instructor-recovery-email');
    field?.focus();
  }, 0);
}

function closeAccountAccess() {
  if (isInstructorRoute) return;
  byId('instructor-auth-modal')?.classList.add('hidden');
  showAuthStatus('');
}

function updateLearnerAccountUI(user) {
  byId('learner-signed-out')?.classList.toggle('hidden', Boolean(user));
  byId('learner-signed-in')?.classList.toggle('hidden', !user);
  const identity = byId('learner-account-identity');
  if (identity) identity.textContent = user ? `${displayName(user)} · ${user.email || ''}` : '';
  const startButton = byId('learner-start-button');
  if (startButton) {
    startButton.disabled = !user;
    startButton.innerHTML = user
      ? 'Begin or Resume Training <span aria-hidden="true">→</span>'
      : 'Sign In to Begin Training';
  }
}

function announceLearner(user) {
  currentUser = user;
  updateLearnerAccountUI(user);
  showLearnerStatus('Loading your secure training record…');
  window.dispatchEvent(new CustomEvent('msha:learner-authenticated', {
    detail: {
      user: {
        id: user.id,
        email: user.email || '',
        name: displayName(user),
        roles: rolesFor(user)
      }
    }
  }));
}

function announceSignedOut() {
  currentUser = null;
  updateLearnerAccountUI(null);
  showLearnerStatus('Sign in to load and save your training record.');
  window.dispatchEvent(new CustomEvent('msha:learner-signed-out'));
}

async function openInstructorEntry() {
  if (currentUser && rolesFor(currentUser).includes('instructor')) {
    try { await enterInstructorRoute(); } catch (error) {
      openAccountAccess('login', 'instructor');
      showAuthStatus(errorMessage(error, 'Please sign in again to open instructor preview.'), true);
    }
    return;
  }
  openAccountAccess('login', 'instructor');
}

async function verifyInstructorSession() {
  return authenticatedRequest('/api/instructor-session');
}

async function enterInstructorRoute() {
  showAuthStatus('Verifying instructor access…');
  await verifyInstructorSession();
  window.location.assign('/instructor/');
}

async function handleInstructorLogin(event) {
  event.preventDefault();
  const email = byId('instructor-email').value.trim();
  const password = byId('instructor-password').value;
  const button = event.currentTarget.querySelector('button[type="submit"]');
  button.disabled = true;
  showAuthStatus('Signing in…');
  try {
    currentUser = await login(email, password);
    await enterInstructorRoute();
  } catch (error) {
    showAuthStatus(errorMessage(error, 'Sign-in failed. Check your email and password.'), true);
    button.disabled = false;
  }
}

async function handleLearnerLogin(event) {
  event.preventDefault();
  const email = byId('learner-email').value.trim();
  const password = byId('learner-password').value;
  const button = event.currentTarget.querySelector('button[type="submit"]');
  button.disabled = true;
  showLearnerStatus('Signing in…');
  try {
    const user = await login(email, password);
    announceLearner(user);
  } catch (error) {
    showLearnerStatus(errorMessage(error, 'Sign-in failed. Check your email and password.'), true);
  } finally {
    button.disabled = false;
  }
}

async function handleLearnerSignup(event) {
  event.preventDefault();
  const fullName = byId('learner-signup-name').value.trim();
  const email = byId('learner-signup-email').value.trim();
  const password = byId('learner-signup-password').value;
  const confirmation = byId('learner-signup-confirm').value;
  if (password.length < 8) return showLearnerStatus('Use a password with at least 8 characters.', true);
  if (password !== confirmation) return showLearnerStatus('The passwords do not match.', true);
  const button = event.currentTarget.querySelector('button[type="submit"]');
  button.disabled = true;
  showLearnerStatus('Creating your learner account…');
  try {
    const user = await signup(email, password, { full_name: fullName });
    if (!user.confirmedAt) {
      setLearnerView('login');
      if (byId('learner-email')) byId('learner-email').value = email;
      showLearnerStatus('Check your email and confirm the account, then sign in here.');
    } else {
      announceLearner(user);
    }
  } catch (error) {
    showLearnerStatus(errorMessage(error, 'The learner account could not be created.'), true);
  } finally {
    button.disabled = false;
  }
}

async function handleInvite(event) {
  event.preventDefault();
  const password = byId('instructor-invite-password').value;
  const confirmation = byId('instructor-invite-confirm').value;
  if (password.length < 8) return showAuthStatus('Use a password with at least 8 characters.', true);
  if (password !== confirmation) return showAuthStatus('The passwords do not match.', true);
  const button = event.currentTarget.querySelector('button[type="submit"]');
  button.disabled = true;
  showAuthStatus('Creating your account…');
  try {
    const user = await acceptInvite(inviteToken, password);
    currentUser = user;
    if (rolesFor(user).includes('instructor')) await enterInstructorRoute();
    else {
      closeAccountAccess();
      announceLearner(user);
    }
  } catch (error) {
    showAuthStatus(errorMessage(error, 'This invitation could not be accepted.'), true);
    button.disabled = false;
  }
}

async function handleRecoveryRequest(event) {
  event.preventDefault();
  const email = byId('instructor-recovery-email').value.trim();
  const button = event.currentTarget.querySelector('button[type="submit"]');
  button.disabled = true;
  showAuthStatus('Sending a password-reset email…');
  try {
    await requestPasswordRecovery(email);
    showAuthStatus('If that account exists, a password-reset link has been sent.');
  } catch (error) {
    showAuthStatus(errorMessage(error, 'The reset email could not be sent.'), true);
  } finally {
    button.disabled = false;
  }
}

async function handleRecoveryUpdate(event) {
  event.preventDefault();
  const password = byId('instructor-new-password').value;
  const confirmation = byId('instructor-new-password-confirm').value;
  if (password.length < 8) return showAuthStatus('Use a password with at least 8 characters.', true);
  if (password !== confirmation) return showAuthStatus('The passwords do not match.', true);
  const button = event.currentTarget.querySelector('button[type="submit"]');
  button.disabled = true;
  showAuthStatus('Updating your password…');
  try {
    await updateUser({ password });
    const user = await getUser();
    if (authIntent === 'instructor' || rolesFor(user).includes('instructor')) await enterInstructorRoute();
    else {
      closeAccountAccess();
      announceLearner(user);
    }
  } catch (error) {
    showAuthStatus(errorMessage(error, 'Your password could not be updated.'), true);
    button.disabled = false;
  }
}

async function signOutAccount() {
  try { await logout(); } finally {
    announceSignedOut();
    if (isInstructorRoute) window.location.assign('/');
  }
}

async function processAuthCallback() {
  try {
    const result = await handleAuthCallback();
    if (!result) return false;
    if (result.type === 'invite' && result.token) {
      inviteToken = result.token;
      openAccountAccess('invite', 'learner');
      return true;
    }
    if (result.type === 'recovery') {
      authIntent = rolesFor(result.user).includes('instructor') ? 'instructor' : 'learner';
      openAccountAccess('recovery', authIntent);
      return true;
    }
    if (result.user) {
      if (isInstructorRoute || rolesFor(result.user).includes('instructor')) await enterInstructorRoute();
      else announceLearner(result.user);
      return true;
    }
  } catch (error) {
    openAccountAccess('login', isInstructorRoute ? 'instructor' : 'learner');
    showAuthStatus(errorMessage(error, 'The account link could not be processed.'), true);
    return true;
  }
  return false;
}

async function authorizeInstructorPage() {
  const modal = byId('instructor-auth-modal');
  modal?.classList.remove('hidden');
  showAuthStatus('Verifying instructor access…');
  try {
    const [session, user] = await Promise.all([verifyInstructorSession(), getUser()]);
    currentUser = user;
    const instructor = session.instructor || {};
    window.dispatchEvent(new CustomEvent('msha:instructor-authorized', {
      detail: {
        id: instructor.id || user?.id || '',
        email: instructor.email || user?.email || '',
        name: instructor.name || displayName(user)
      }
    }));
    modal?.classList.add('hidden');
  } catch {
    window.location.replace('/?instructor=unauthorized');
  }
}

const SIGNOFF_LABELS = {
  siteTraining: 'Approximately 8 hours of mine-site training',
  mineTour: 'Mine tour and observation of the mining method',
  plansProcedures: 'Current plans, escapeways, emergency procedures, and required demonstrations',
  w65Practice: 'Instructor-led MSA W65 instruction and hands-on practice',
  taskTraining: 'Applicable new-task training and demonstrated safe procedures',
  form5000_23: 'MSHA Form 5000-23 or approved alternate completed'
};

function setRecordsStatus(message, isError = false) {
  const status = byId('instructor-records-status');
  if (!status) return;
  status.textContent = message || '';
  status.classList.toggle('auth-error', isError);
  status.classList.toggle('hidden', !message);
}

function renderInstructorRecordList() {
  const list = byId('instructor-record-list');
  if (!list) return;
  if (!instructorRecords.length) {
    list.innerHTML = '<div class="records-empty"><strong>No learner records yet</strong><p>A record appears after a trainee signs in and saves progress.</p></div>';
    byId('instructor-record-detail')?.classList.add('hidden');
    return;
  }
  list.innerHTML = instructorRecords.map(record => {
    const summary = record.summary || {};
    const active = record.learner.id === selectedRecordId ? ' active' : '';
    const readiness = summary.readyForOperatorReview ? 'Ready for review' : `${summary.completedModules || 0}/13 modules`;
    return `<button class="record-list-item${active}" type="button" data-record-id="${escapeHtml(record.learner.id)}">
      <strong>${escapeHtml(record.learner.name || record.learner.email)}</strong>
      <span>${escapeHtml(record.mine || 'Location not selected')} · ${escapeHtml(readiness)}</span>
    </button>`;
  }).join('');
  list.querySelectorAll('[data-record-id]').forEach(button => {
    button.addEventListener('click', () => selectInstructorRecord(button.dataset.recordId));
  });
}

function selectInstructorRecord(recordId) {
  selectedRecordId = recordId;
  renderInstructorRecordList();
  const record = instructorRecords.find(item => item.learner.id === recordId);
  const detail = byId('instructor-record-detail');
  if (!record || !detail) return;
  const summary = record.summary || {};
  const scores = Object.values(record.scores || {}).filter(value => Number.isFinite(Number(value)));
  const perfectScores = scores.filter(value => Number(value) === 100).length;
  detail.classList.remove('hidden');
  detail.innerHTML = `
    <div class="record-detail-heading">
      <div><span class="eyebrow">Trainee record</span><h3>${escapeHtml(record.learner.name || record.learner.email)}</h3><p>${escapeHtml(record.learner.email)} · ${escapeHtml(record.mine || 'Location not selected')}</p></div>
      <span class="record-readiness ${summary.readyForOperatorReview ? 'ready' : ''}">${summary.readyForOperatorReview ? 'Ready for operator review' : 'Requirements remain'}</span>
    </div>
    <div class="record-metrics">
      <div><strong>${summary.completedModules || 0}/13</strong><span>Modules complete</span></div>
      <div><strong>${Number(summary.classroomHours || 0).toFixed(1)}/32</strong><span>Classroom hours</span></div>
      <div><strong>${perfectScores}/13</strong><span>Perfect quizzes</span></div>
    </div>
    <form id="instructor-signoff-form" class="signoff-form">
      <h4>Instructor verification</h4>
      <p>Check only items personally verified under the approved training plan. Each change is time-stamped to your instructor account.</p>
      ${Object.entries(SIGNOFF_LABELS).map(([key, label]) => `<label class="signoff-row"><input type="checkbox" data-signoff-key="${key}" ${record.signoffs?.[key] ? 'checked' : ''}><span>${escapeHtml(label)}</span></label>`).join('')}
      <label for="instructor-record-notes">Instructor notes</label>
      <textarea id="instructor-record-notes" maxlength="4000" rows="4" placeholder="Document dates, locations, demonstrations, or follow-up needed.">${escapeHtml(record.instructorNotes || '')}</textarea>
      <div class="record-save-row"><button class="btn" type="submit">Save Verified Signoffs</button><span id="record-save-status" role="status"></span></div>
    </form>`;
  detail.querySelector('#instructor-signoff-form')?.addEventListener('submit', saveInstructorSignoffs);
}

async function saveInstructorSignoffs(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  const status = byId('record-save-status');
  const signoffs = {};
  form.querySelectorAll('[data-signoff-key]').forEach(input => { signoffs[input.dataset.signoffKey] = input.checked; });
  button.disabled = true;
  if (status) status.textContent = 'Saving…';
  try {
    const body = await authenticatedRequest('/api/instructor-records', {
      method: 'POST',
      body: JSON.stringify({
        traineeId: selectedRecordId,
        signoffs,
        instructorNotes: byId('instructor-record-notes')?.value || ''
      })
    });
    const index = instructorRecords.findIndex(item => item.learner.id === selectedRecordId);
    if (index >= 0) instructorRecords[index] = body.record;
    renderInstructorRecordList();
    selectInstructorRecord(selectedRecordId);
    const newStatus = byId('record-save-status');
    if (newStatus) newStatus.textContent = 'Saved with instructor identity and time.';
  } catch (error) {
    if (status) status.textContent = errorMessage(error, 'Could not save signoffs.');
  } finally {
    button.disabled = false;
  }
}

async function openInstructorRecords() {
  byId('instructor-records-modal')?.classList.remove('hidden');
  setRecordsStatus('Loading learner records…');
  try {
    const body = await authenticatedRequest('/api/instructor-records');
    instructorRecords = Array.isArray(body.records) ? body.records : [];
    selectedRecordId = instructorRecords.some(record => record.learner.id === selectedRecordId)
      ? selectedRecordId
      : (instructorRecords[0]?.learner.id || '');
    setRecordsStatus('');
    renderInstructorRecordList();
    if (selectedRecordId) selectInstructorRecord(selectedRecordId);
  } catch (error) {
    setRecordsStatus(errorMessage(error, 'Learner records could not be loaded.'), true);
  }
}

function closeInstructorRecords() {
  byId('instructor-records-modal')?.classList.add('hidden');
}

function bindAuthUI() {
  byId('instructor-login-form')?.addEventListener('submit', handleInstructorLogin);
  byId('instructor-invite-form')?.addEventListener('submit', handleInvite);
  byId('instructor-recovery-request-form')?.addEventListener('submit', handleRecoveryRequest);
  byId('instructor-recovery-form')?.addEventListener('submit', handleRecoveryUpdate);
  byId('instructor-auth-close')?.addEventListener('click', closeAccountAccess);
  byId('instructor-forgot-password')?.addEventListener('click', () => setAuthView('recovery-request'));
  byId('instructor-back-to-login')?.addEventListener('click', () => setAuthView('login'));
  byId('instructor-sign-out')?.addEventListener('click', signOutAccount);
  byId('instructor-exit-preview')?.addEventListener('click', () => window.exitInstructorPreview?.());
  byId('instructor-preview-mine')?.addEventListener('change', event => window.setInstructorPreviewMine?.(event.currentTarget.value));
  byId('instructor-open-access')?.addEventListener('click', openInstructorEntry);
  byId('learner-login-form')?.addEventListener('submit', handleLearnerLogin);
  byId('learner-signup-form')?.addEventListener('submit', handleLearnerSignup);
  byId('learner-show-signup')?.addEventListener('click', () => setLearnerView('signup'));
  byId('learner-show-login')?.addEventListener('click', () => setLearnerView('login'));
  byId('learner-forgot-password')?.addEventListener('click', () => openAccountAccess('recovery-request', 'learner'));
  byId('learner-sign-out')?.addEventListener('click', signOutAccount);
  byId('instructor-open-records')?.addEventListener('click', openInstructorRecords);
  byId('instructor-records-close')?.addEventListener('click', closeInstructorRecords);
}

async function initializeAuthentication() {
  bindAuthUI();
  updateLearnerAccountUI(null);
  await configureLearnerRegistration();
  const callbackHandled = await processAuthCallback();
  if (callbackHandled) return;
  if (isInstructorRoute) return authorizeInstructorPage();

  const user = await getUser();
  if (user && rolesFor(user).includes('instructor')) {
    currentUser = user;
    updateLearnerAccountUI(null);
    showLearnerStatus('Instructor account active. Open Instructor Preview to demonstrate the course or manage trainee records.');
    const instructorButton = byId('instructor-open-access');
    if (instructorButton) instructorButton.textContent = 'Open Instructor Preview';
  } else if (user) announceLearner(user);
  else announceSignedOut();
  const params = new URLSearchParams(window.location.search);
  if (params.get('instructor') === 'unauthorized') {
    openAccountAccess('login', 'instructor');
    showAuthStatus('Please sign in with an instructor account to open preview mode.', true);
  }
}

window.openInstructorAccess = openInstructorEntry;
window.signOutInstructor = signOutAccount;
window.mshaIdentity = { request: authenticatedRequest, getUser };

initializeAuthentication();
