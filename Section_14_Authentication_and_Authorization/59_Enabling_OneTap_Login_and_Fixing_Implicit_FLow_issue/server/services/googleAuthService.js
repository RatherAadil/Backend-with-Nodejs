import { OAuth2Client } from 'google-auth-library';
const clientId =
  '79180231800-u7ectk8hun9qsajnih27lvhap6djofh5.apps.googleusercontent.com';

//3. Setting-Up Google CLient
const client = new OAuth2Client();

export async function verifyIdToken(idToken) {
  const loginTicket = await client.verifyIdToken({
    idToken,
    audience: clientId,
  });
  const userData = loginTicket.getPayload();
  return userData;
}
