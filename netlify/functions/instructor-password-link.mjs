import { appendAuditEvent } from '../lib/record-store.mjs';
import { authenticatedUser, supabaseAdmin } from '../lib/supabase-server.mjs';

const json = (body, status = 200) => Response.json(body, {
  status,
  headers: { 'Cache-Control': 'no-store' }
});

// Instructors create a one-time password-setup link for an existing account (migrated
// accounts have no password yet, and the project sends no email). Every link is audited.
export default async request => {
  const user = await authenticatedUser(request);
  if (!user) return json({ error: 'Authentication required.' }, 401);
  if (user.role !== 'instructor') return json({ error: 'Instructor access required.' }, 403);
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  const origin = new URL(request.url).origin;
  if (request.headers.get('origin') && request.headers.get('origin') !== origin) {
    return json({ error: 'Cross-origin request denied.' }, 403);
  }

  let payload;
  try { payload = await request.json(); } catch { return json({ error: 'Invalid JSON.' }, 400); }
  const accountId = typeof payload?.accountId === 'string' ? payload.accountId.trim() : '';
  if (!accountId) return json({ error: 'An account is required.' }, 400);

  const admin = supabaseAdmin();
  const { data: profile } = await admin.from('profiles').select('email, role').eq('id', accountId).maybeSingle();
  if (!profile?.email) return json({ error: 'Account not found.' }, 404);
  const { data, error } = await admin.auth.admin.generateLink({
    type: 'recovery',
    email: profile.email,
    options: { redirectTo: `${origin}/` }
  });
  if (error) return json({ error: `The link could not be created: ${error.message}` }, 502);

  await appendAuditEvent({
    type: 'password-link-created',
    learnerId: accountId,
    learnerEmail: profile.email,
    accountRole: profile.role,
    instructorId: user.id,
    instructorEmail: user.email
  });
  return json({
    message: `One-time password link for ${profile.email}. Send it only to that person; it works once and expires soon.`,
    link: data.properties.action_link
  });
};

export const config = { path: '/api/instructor-password-link' };
