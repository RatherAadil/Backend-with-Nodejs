import Session from '../models/sessionsModel.js';
import User from '../models/userModel.js';

export default async function checkAuth(req, res, next) {
  const { sId } = req.signedCookies;
  if (!sId) {
    res.clearCookie('sId');
    return res
      .status(401)
      .json({ error: 'No active session found', success: false });
  }

  const session = await Session.findById(sId);
  if (!session) {
    res.clearCookie('sId');
    return res
      .status(401)
      .json({ error: 'No active session found', success: false });
  }

  const user = await User.findOne({ _id: session.userId });
  if (!user) {
    return res
      .status(401)
      .json({ error: 'No active session found', success: false });
  }
  req.user = user;
  next();
}
