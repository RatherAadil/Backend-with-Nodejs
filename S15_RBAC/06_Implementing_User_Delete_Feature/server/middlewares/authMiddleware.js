import Session from '../models/sessionsModel.js';
import User from '../models/userModel.js';

export default async function checkAuth(req, res, next) {
  const { sId } = req.signedCookies;
  if (!sId) {
    res.clearCookie('sId');
    return res.status(401).json({ error: 'Not Logged In' });
  }

  const session = await Session.findById(sId);
  if (!session) {
    res.clearCookie('sId');
    return res.status(401).json({ error: 'Not Logged In' });
  }

  const user = await User.findOne({ _id: session.userId }).lean();
  if (!user) {
    return res.status(401).json({ error: 'Not Logged In' });
  }
  req.user = user;
  next();
}
