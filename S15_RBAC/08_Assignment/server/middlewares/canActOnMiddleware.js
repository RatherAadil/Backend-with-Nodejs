import { ROLES } from '../config/roles.js';

export const canActOn = async (req, res, next) => {
  const user = req.user;

  const actorRole = user.role;
  const targetRole = req.targetUser?.role;

  const actorLevel = ROLES[actorRole]?.level || 0;
  const targetLevel = ROLES[targetRole]?.level || 0;

  if (actorLevel <= targetLevel) {
    return res
      .status(403)
      .json({ error: 'Cannot act on a user with equal or higher role' });
  }

  next();
};
