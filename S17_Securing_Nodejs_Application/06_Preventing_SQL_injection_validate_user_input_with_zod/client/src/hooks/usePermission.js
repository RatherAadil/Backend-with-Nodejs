// hooks/usePermissions.js
import { PERMISSIONS } from '../config/roles.js';

const usePermissions = (currentUserRole) => {
  const perms = PERMISSIONS[currentUserRole] || [];

  const has = (permission) => {
    return perms.includes('*') || perms.includes(permission);
  };

  return { has, perms };
};

export default usePermissions;
