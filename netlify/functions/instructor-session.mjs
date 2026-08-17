import { getUser } from '@netlify/identity';

export default async () => {
  const user = await getUser();
  if (!user) {
    return Response.json({ authorized: false }, { status: 401 });
  }
  const roles = Array.isArray(user.roles)
    ? user.roles
    : Array.isArray(user.appMetadata?.roles)
      ? user.appMetadata.roles
      : Array.isArray(user.app_metadata?.roles)
        ? user.app_metadata.roles
        : [];
  if (!roles.includes('instructor')) {
    return Response.json({ authorized: false }, { status: 403 });
  }
  return Response.json({
    authorized: true,
    instructor: {
      id: user.id,
      email: user.email,
      name: user.name || user.userMetadata?.full_name || user.user_metadata?.full_name || user.email
    }
  });
};

export const config = { path: '/api/instructor-session' };
