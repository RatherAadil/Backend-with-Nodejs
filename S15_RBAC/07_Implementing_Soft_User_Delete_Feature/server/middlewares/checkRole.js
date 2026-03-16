import mongoose from 'mongoose';

export const checkRole = async (req, res, next) => {
  const user = req.user;
  if (user.role !== 'User') return next();
  return res.status(403).json({ error: 'You cannot access users' });
};

export const checkIsAdmin = async (req, res, next) => {
  const user = req.user;
  const { userId } = req.params;

  if (!userId) return res.status(404).json({ message: 'User Id not included' });

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  if (user._id.toString() === userId) {
    return res.status(403).json({ message: 'You cannot delete yourself' });
  }
  if (user.role === 'Admin') return next();
  return res
    .status(403)
    .json({ error: 'You are not authorized to perform this action.' });
};
