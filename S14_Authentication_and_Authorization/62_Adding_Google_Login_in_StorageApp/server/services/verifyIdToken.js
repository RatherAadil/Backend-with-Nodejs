import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENTID,
});

export async function verifyIdToken(idToken) {
  const loginTicket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENTID,
  });
  const userData = loginTicket.getPayload();
  return userData;
}
