export const checkRole = async (req, res, next) => {
  const user = req.user;
  if (user.role !== 'User') return next();
  return res.status(403).json({ error: 'You cannot access users' });
};
