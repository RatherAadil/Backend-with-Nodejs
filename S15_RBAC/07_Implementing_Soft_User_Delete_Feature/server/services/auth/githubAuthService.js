export const githubAuthService = async (code) => {
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const { access_token } = await tokenRes.json();

  const userRes = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const user = await userRes.json();

  const emailRes = await fetch('https://api.github.com/user/emails', {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const emails = await emailRes.json();
  const primaryEmail = emails.find((e) => e.primary && e.verified)?.email;

  const userData = {
    email: primaryEmail,
    name: user.name,
    picture: user.avatar_url,
  };
  return userData;
};
