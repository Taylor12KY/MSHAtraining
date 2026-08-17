export const handler = async event => {
  const payload = JSON.parse(event.body || '{}');
  const user = payload.user || {};
  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        ...(user.app_metadata || {}),
        roles: ['instructor']
      }
    })
  };
};
