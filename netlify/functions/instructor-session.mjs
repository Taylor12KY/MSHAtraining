import { authenticatedUser } from '../lib/supabase-server.mjs';

export default async request => {
  const user = await authenticatedUser(request);
  if (!user) return Response.json({ authorized: false }, { status: 401 });
  if (user.role !== 'instructor') return Response.json({ authorized: false }, { status: 403 });
  return Response.json({
    authorized: true,
    instructor: { id: user.id, email: user.email, name: user.name }
  });
};

export const config = { path: '/api/instructor-session' };
