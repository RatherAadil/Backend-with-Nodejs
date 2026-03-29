import { ROLES_HIERARCHY } from './roles.js';

export const canPerform = (currentUser, targetUser) => {
  if (
    ROLES_HIERARCHY.indexOf(currentUser) <= ROLES_HIERARCHY.indexOf(targetUser)
  ) {
    return false;
  }
  return true;
};
