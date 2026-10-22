import { appendAuditEvent } from '../lib/record-store.mjs';
import { authenticatedUser, supabaseAdmin } from '../lib/supabase-server.mjs';

const json = (body, status = 200) => Response.json(body, {
  status,
  headers: { 'Cache-Control': 'no-store' }
});
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Instructors invite trainees and other instructors. Instead of emailing (the project has
// no SMTP), this returns a one-time link the instructor shares; the person opens it and
// chooses their own password.
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
  const email = typeof payload?.email === 'string' ? payload.email.trim().toLowerCase() : '';
  const fullName = typeof payload?.fullName === 'string' ? payload.fullName.trim().slice(0, 120) : '';
  const role = payload?.role === 'instructor' ? 'instructor' : 'learner';
  if (!EMAIL_PATTERN.test(email) || email.length > 254) return json({ error: 'Enter a valid email address.' }, 400);
  if (!fullName) return json({ error: 'Enter the person\'s full name.' }, 400);

  const admin = supabaseAdmin();
  const { data, error } = await admin.auth.admin.generateLink({
    type: 'invite',
    email,
    options: { data: { full_name: fullName }, redirectTo: `${origin}/` }
  });
  if (error) {
    const alreadyExists = /already been registered|already exists/i.test(error.message);
    return json({ error: alreadyExists ? 'An account with that email already exists.' : `The invitation could not be sent: ${error.message}` }, alreadyExists ? 409 : 502);
  }
  // The new-user trigger created a learner profile; promote it when inviting an instructor.
  const { error: profileError } = await admin.from('profiles')
    .update({ full_name: fullName, role, updated_at: new Date().toISOString() })
    .eq('id', data.user.id);
  if (profileError) return json({ error: `The account was invited but its role could not be set: ${profileError.message}` }, 500);

  await appendAuditEvent({
    type: 'account-invited',
    learnerId: data.user.id,
    learnerEmail: email,
    role,
    instructorId: user.id,
    instructorEmail: user.email
  });
  return json({
    message: `Account created for ${email} as ${role === 'instructor' ? 'an instructor' : 'a trainee'}. Send them this one-time link to choose a password:`,
    link: data.properties.action_link
  });
};

export const config = { path: '/api/instructor-invite' };
