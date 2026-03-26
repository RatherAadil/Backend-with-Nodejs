import User from '../models/userModel.js';

export const fetchTargetUser = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) return res.status(404).json({ message: 'User Id not included' });

  const target = await User.findById(userId);
  if (!target) return res.status(404).json({ error: 'User not found' });

  req.targetUser = target;
  next();
};
