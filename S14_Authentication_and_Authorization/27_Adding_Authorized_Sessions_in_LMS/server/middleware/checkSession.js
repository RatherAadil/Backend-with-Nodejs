export const checkSession = async (req, res, next) => {
  const { sId } = req.signedCookies;
  if (!sId) return res.json({ message: 'Session ID not received' });
  next();
};
