import redisClient from '../config/redis.js';

export default async function checkAuth(req, res, next) {
  const { sId } = req.signedCookies;
  if (!sId) {
    res.clearCookie('sId');
    return res
      .status(401)
      .json({ error: 'No active session found', success: false });
  }

  const session = await redisClient.json.get(`session:${sId}`);
  if (!session) {
    res.clearCookie('sId');
    return res
      .status(401)
      .json({ error: 'No active session found', success: false });
  }

  req.user = {
    id: session.userId,
    rootDirId: session.rootDirId,
    name: session.name,
    email: session.email,
    picture: session.picture,
    role: session.role,
  };
  next();
}
