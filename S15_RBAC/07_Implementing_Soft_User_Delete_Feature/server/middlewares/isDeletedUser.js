import User from '../models/userModel.js';

export const isDeletedUser = async (req, res, next) => {
  if (!req.user) {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user.deleted)
      return res.status(404).json({
        error: 'Your account has been deleted, contact admin to recover',
      });

    req.user = user;
  } else if (req.user.deleted) {
    return res.status(404).json({
      error: 'Your account has been deleted, contact admin to recover',
    });
  }
  next();
};
