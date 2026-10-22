import { createClient } from '@supabase/supabase-js';

let adminClient = null;

// Server-only client using the project's secret key. It bypasses row-level security,
// so it must never be exposed to the browser.
export function supabaseAdmin() {
  if (adminClient) return adminClient;
  const url = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) throw new Error('SUPABASE_URL and SUPABASE_SECRET_KEY must be set in the Netlify environment.');
  adminClient = createClient(url, secretKey, { auth: { persistSession: false, autoRefreshToken: false } });
  return adminClient;
}

// Lets tests supply an in-memory stand-in for the Supabase client.
export function setSupabaseAdminForTests(client) {
  adminClient = client;
}

export function bearerToken(request) {
  const header = request.headers.get('authorization') || '';
  return header.toLowerCase().startsWith('bearer ') ? header.slice(7).trim() : '';
}

// Verifies the caller's Supabase session and returns { id, email, name, role }, or null.
export async function authenticatedUser(request) {
  const token = bearerToken(request);
  if (!token) return null;
  const admin = supabaseAdmin();
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data?.user) return null;
  const { data: profile } = await admin.from('profiles').select('email, full_name, role').eq('id', data.user.id).maybeSingle();
  return {
    id: data.user.id,
    email: data.user.email || profile?.email || '',
    name: profile?.full_name || data.user.user_metadata?.full_name || data.user.email || '',
    role: profile?.role === 'instructor' ? 'instructor' : 'learner'
  };
}
