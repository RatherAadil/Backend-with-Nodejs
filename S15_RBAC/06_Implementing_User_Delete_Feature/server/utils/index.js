export const canPerformAction = (currentUserRole, userToLogoutRole) => {
  const roleHierarchy = ['User', 'Manager', 'Admin'];
  return (
    roleHierarchy.indexOf(currentUserRole) >=
    roleHierarchy.indexOf(userToLogoutRole)
  );
};
