import { PERMISSIONS } from '../utils/roles.js';

export function authorize(...requiredPermissions) {
  return function (req, res, next) {
    const { role } = req.user;
    const perms = PERMISSIONS[role] || [];

    const hasAll = requiredPermissions.every(
      (p) => perms.includes('*') || perms.includes(p),
    );

    if (!hasAll) {
      return res
        .status(403)
        .json({ error: 'Forbidden: insufficient permissions' });
    }

    next();
  };
}
