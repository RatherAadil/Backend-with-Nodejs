import { OAuth2Client } from 'google-auth-library';
const clientId ='79180231800-u7ectk8hun9qsajnih27lvhap6djofh5.apps.googleusercontent.com';
const clientSecret = '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';
const redirectUrl = 'http://localhost:4000/auth/google/callback';

const client = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri: redirectUrl,
});

export async function fetchUserFromGoogle(code) {
  const { tokens } = await client.getToken(code);

  const loginTicket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: clientId,
  });
  const userData = loginTicket.getPayload();
  return userData;
}
