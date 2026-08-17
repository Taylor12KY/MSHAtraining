import {
  acceptInvite,
  getUser,
  handleAuthCallback,
  login,
  logout,
  requestPasswordRecovery,
  updateUser
} from '@netlify/identity';

const isInstructorRoute = document.body.dataset.instructorPreview === 'true';
let inviteToken = '';

const byId = id => document.getElementById(id);

function showAuthStatus(message, isError = false) {
  const status = byId('instructor-auth-status');
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

function openInstructorAccess(view = 'login') {
  setAuthView(view);
  byId('instructor-auth-modal')?.classList.remove('hidden');
  window.setTimeout(() => {
    const field = byId(view === 'login' ? 'instructor-email' :
      view === 'invite' ? 'instructor-invite-password' :
      view === 'recovery' ? 'instructor-new-password' : 'instructor-recovery-email');
    field?.focus();
  }, 0);
}

function closeInstructorAccess() {
  if (isInstructorRoute) return;
  byId('instructor-auth-modal')?.classList.add('hidden');
  showAuthStatus('');
}

function errorMessage(error, fallback) {
  if (error && typeof error.message === 'string' && error.message.trim()) return error.message;
  return fallback;
}

async function verifyInstructorSession() {
  const response = await fetch('/api/instructor-session', {
    credentials: 'same-origin',
    headers: { Accept: 'application/json' }
  });
  if (!response.ok) {
    if (response.status === 403) throw new Error('This account does not have instructor access.');
    throw new Error('Your instructor session could not be verified. Please sign in again.');
  }
  return response.json();
}

async function enterInstructorRoute() {
  showAuthStatus('Verifying instructor access…');
  await verifyInstructorSession();
  window.location.assign('/instructor/');
}

async function handleLogin(event) {
  event.preventDefault();
  const email = byId('instructor-email').value.trim();
  const password = byId('instructor-password').value;
  const button = event.currentTarget.querySelector('button[type="submit"]');
  button.disabled = true;
  showAuthStatus('Signing in…');
  try {
    await login(email, password);
    await enterInstructorRoute();
  } catch (error) {
    showAuthStatus(errorMessage(error, 'Sign-in failed. Check your email and password.'), true);
    button.disabled = false;
  }
}

async function handleInvite(event) {
  event.preventDefault();
  const password = byId('instructor-invite-password').value;
  const confirmation = byId('instructor-invite-confirm').value;
  if (password.length < 8) {
    showAuthStatus('Use a password with at least 8 characters.', true);
    return;
  }
  if (password !== confirmation) {
    showAuthStatus('The passwords do not match.', true);
    return;
  }
  const button = event.currentTarget.querySelector('button[type="submit"]');
  button.disabled = true;
  showAuthStatus('Creating your instructor account…');
  try {
    await acceptInvite(inviteToken, password);
    await enterInstructorRoute();
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
    showAuthStatus('If that instructor account exists, a password-reset link has been sent.');
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
  if (password.length < 8) {
    showAuthStatus('Use a password with at least 8 characters.', true);
    return;
  }
  if (password !== confirmation) {
    showAuthStatus('The passwords do not match.', true);
    return;
  }
  const button = event.currentTarget.querySelector('button[type="submit"]');
  button.disabled = true;
  showAuthStatus('Updating your password…');
  try {
    await updateUser({ password });
    await enterInstructorRoute();
  } catch (error) {
    showAuthStatus(errorMessage(error, 'Your password could not be updated.'), true);
    button.disabled = false;
  }
}

async function signOutInstructor() {
  try {
    await logout();
  } finally {
    window.location.assign('/');
  }
}

async function processAuthCallback() {
  try {
    const result = await handleAuthCallback();
    if (!result) return false;
    if (result.type === 'invite' && result.token) {
      inviteToken = result.token;
      openInstructorAccess('invite');
      return true;
    }
    if (result.type === 'recovery') {
      openInstructorAccess('recovery');
      return true;
    }
    if (result.user) {
      await enterInstructorRoute();
      return true;
    }
  } catch (error) {
    openInstructorAccess('login');
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
    const instructor = session.instructor || {};
    window.dispatchEvent(new CustomEvent('msha:instructor-authorized', {
      detail: {
        id: instructor.id || user?.id || '',
        email: instructor.email || user?.email || '',
        name: instructor.name || user?.name || instructor.email || 'Instructor'
      }
    }));
    modal?.classList.add('hidden');
  } catch (error) {
    window.location.replace('/?instructor=unauthorized');
  }
}

function bindAuthUI() {
  byId('instructor-login-form')?.addEventListener('submit', handleLogin);
  byId('instructor-invite-form')?.addEventListener('submit', handleInvite);
  byId('instructor-recovery-request-form')?.addEventListener('submit', handleRecoveryRequest);
  byId('instructor-recovery-form')?.addEventListener('submit', handleRecoveryUpdate);
  byId('instructor-auth-close')?.addEventListener('click', closeInstructorAccess);
  byId('instructor-forgot-password')?.addEventListener('click', () => setAuthView('recovery-request'));
  byId('instructor-back-to-login')?.addEventListener('click', () => setAuthView('login'));
  byId('instructor-sign-out')?.addEventListener('click', signOutInstructor);
  byId('instructor-exit-preview')?.addEventListener('click', () => window.exitInstructorPreview?.());
  byId('instructor-preview-mine')?.addEventListener('change', event => {
    window.setInstructorPreviewMine?.(event.currentTarget.value);
  });
  byId('instructor-open-access')?.addEventListener('click', () => openInstructorAccess('login'));
}

async function initializeAuthentication() {
  bindAuthUI();
  const callbackHandled = await processAuthCallback();
  if (callbackHandled) return;
  if (isInstructorRoute) {
    await authorizeInstructorPage();
    return;
  }
  const params = new URLSearchParams(window.location.search);
  if (params.get('instructor') === 'unauthorized') {
    openInstructorAccess('login');
    showAuthStatus('Please sign in with an instructor account to open preview mode.', true);
  }
}

window.openInstructorAccess = openInstructorAccess;
window.signOutInstructor = signOutInstructor;

initializeAuthentication();
