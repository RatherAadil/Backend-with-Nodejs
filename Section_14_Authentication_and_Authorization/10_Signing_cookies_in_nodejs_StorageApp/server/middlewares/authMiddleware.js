import { SECRET_KEY } from '../Controllers/userController.js';
import User from '../models/userModel.js';
import crypto from 'node:crypto';

export default async function checkAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Not Logged In' });
  }
  const [cookiePayload, oldSignature] = token.split('.');
  const jsonPayload = Buffer.from(cookiePayload, 'base64url').toString();
  const newSignature = crypto
    .createHash('sha256')
    .update(jsonPayload)
    .update(SECRET_KEY)
    .digest('base64url');

  if (oldSignature !== newSignature) {
    res.clearCookie('token');
    return res.status(401).json({ error: 'Not Logged In' });
  }
  const { id, expiry: expiryTimeInSeconds } = JSON.parse(jsonPayload);

  const currentTimeInSeconds = Math.round(Date.now() / 1000);

  if (currentTimeInSeconds >= expiryTimeInSeconds) {
    res.clearCookie('token');
    return res.status(401).json({ error: 'Not Logged In' });
  }

  const user = await User.findOne({ _id: id }).lean();
  if (!user) {
    return res.status(401).json({ error: 'Not Logged In' });
  }
  req.user = user;
  next();
}
