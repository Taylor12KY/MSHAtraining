// Supabase Auth adapter exposing the small account API the training app uses
// (login, logout, getUser, invite/recovery callbacks, password updates).
import { createClient } from '@supabase/supabase-js';
import { LEARNER_SELF_SIGNUP, SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from './supabase-config.mjs';

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    // Invite and recovery links are read by handleAuthCallback so the app can show
    // the right "choose a password" form before anything else runs.
    detectSessionInUrl: false,
    flowType: 'implicit'
  }
});

async function toAppUser(session) {
  if (!session?.user) return null;
  const { user } = session;
  // Row-level security lets a signed-in user read only their own profile row.
  const { data: profile } = await supabase.from('profiles').select('full_name, role').eq('id', user.id).maybeSingle();
  const name = profile?.full_name || user.user_metadata?.full_name || user.email || '';
  return {
    id: user.id,
    email: user.email || '',
    name,
    roles: [profile?.role || 'learner'],
    confirmedAt: user.email_confirmed_at || user.confirmed_at || null,
    userMetadata: { full_name: name },
    token: { access_token: session.access_token }
  };
}

function authError(error, fallback) {
  return new Error(error?.message || fallback);
}

export async function getUser() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw authError(error, 'Your session could not be loaded.');
  return toAppUser(data.session);
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw authError(error, 'Sign-in failed. Check your email and password.');
  return toAppUser(data.session);
}

export async function logout() {
  await supabase.auth.signOut();
}

export async function requestPasswordRecovery(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/` });
  if (error) throw authError(error, 'The reset email could not be sent.');
}

export async function updateUser(attributes) {
  const { error } = await supabase.auth.updateUser(attributes);
  if (error) throw authError(error, 'Your account could not be updated.');
  return getUser();
}

// Invitations set the password on the session the invite link created.
export async function acceptInvite(_token, password) {
  return updateUser({ password });
}

export async function getSettings() {
  return { disableSignup: !LEARNER_SELF_SIGNUP };
}

// Self-registered accounts always start as learners (the database trigger assigns the role).
// When Supabase requires email confirmation there is no session yet, so the caller shows a
// "check your email" message; the confirmation link signs the person in.
export async function signup(email, password, metadata = {}) {
  if (!LEARNER_SELF_SIGNUP) throw new Error('Learner accounts are invitation-only. Ask an instructor for an invitation.');
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: metadata.full_name || '' }, emailRedirectTo: `${window.location.origin}/` }
  });
  if (error) throw authError(error, 'The learner account could not be created.');
  // With "Confirm email" off, Supabase signs the new trainee in immediately.
  if (data.session) {
    const user = await toAppUser(data.session);
    return { ...user, confirmedAt: user.confirmedAt || new Date().toISOString() };
  }
  return { id: data.user?.id || '', email, name: metadata.full_name || email, roles: ['learner'], confirmedAt: null };
}

// Reads the #access_token=...&type=invite|recovery fragment Supabase adds to email links.
export async function handleAuthCallback() {
  const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : '';
  if (!hash) return null;
  const params = new URLSearchParams(hash);
  const clearFragment = () => window.history.replaceState(null, '', window.location.pathname + window.location.search);
  if (params.get('error_description') || params.get('error')) {
    clearFragment();
    throw new Error(params.get('error_description') || 'This account link is invalid or has expired. Ask for a new one.');
  }
  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');
  if (!accessToken || !refreshToken) return null;
  const { data, error } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
  clearFragment();
  if (error) throw authError(error, 'This account link is invalid or has expired. Ask for a new one.');
  const user = await toAppUser(data.session);
  return { type: params.get('type') || 'signin', token: accessToken, user };
}
