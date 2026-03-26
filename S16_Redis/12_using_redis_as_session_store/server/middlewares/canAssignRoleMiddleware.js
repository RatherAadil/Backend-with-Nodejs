import { ROLES } from '../config/roles.js';

export const canAssignRole = (req, res, next) => {
  const user = req.user;
  const { newRole } = req.body;
  const { userId } = req.params;

  if (user._id.toString() === userId)
    return res.status(403).json({ error: 'You cannot change your role' });

  const actorRole = user.role;
  const targetRole = req.targetUser?.role;

  const actorLevel = ROLES[actorRole]?.level || 0;
  const targetLevel = ROLES[targetRole]?.level || 0;
  const newRoleLevel = ROLES[newRole]?.level || 0;

  if (actorLevel <= targetLevel) {
    return res.status(403).json({
      error:
        'Forbidden: You cannot modify a user with equal or higher privileges.',
    });
  }

  if (newRoleLevel > actorLevel) {
    return res.status(403).json({
      error: 'Forbidden: You cannot assign a role higher than your own.',
    });
  }

  if (newRole === 'Owner') {
    return res.status(403).json({
      error: 'Forbidden: Owner role cannot be assigned.',
    });
  }
  next();
};
