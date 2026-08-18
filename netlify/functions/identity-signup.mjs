export const handler = async event => {
  const payload = JSON.parse(event.body || '{}');
  const user = payload.user || {};
  const currentRoles = Array.isArray(user.app_metadata?.roles) ? user.app_metadata.roles : [];
  const roles = currentRoles.includes('instructor') ? ['instructor'] : ['trainee'];
  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        ...(user.app_metadata || {}),
        roles
      }
    })
  };
};
