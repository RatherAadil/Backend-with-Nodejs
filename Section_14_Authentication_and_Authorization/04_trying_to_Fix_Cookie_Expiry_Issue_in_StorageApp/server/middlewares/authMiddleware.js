import User from '../models/userModel.js';
export default async function checkAuth(req, res, next) {
  const uid = req.cookies.uid;
  if (!uid) {
    return res.status(401).json({ error: 'Not Logged In' });
  }
  const { id, expiry: expiryTimeInSeconds } = JSON.parse(
    Buffer.from(uid, 'base64url').toString(),
  );
  console.log(id, new Date(expiryTimeInSeconds * 1000).toString());
  const currentTimeInSeconds = Math.round(Date.now() / 1000);

  if (currentTimeInSeconds >= expiryTimeInSeconds) {
    res.clearCookie('uid');
    return res.status(401).json({ error: 'Not Logged In' });
  }

  const user = await User.findOne({ _id: id }).lean();
  if (!user) {
    return res.status(401).json({ error: 'Not Logged In' });
  }
  req.user = user;
  next();
}
