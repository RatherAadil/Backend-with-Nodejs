export const ROLES = {
  User: { level: 1 },
  Manager: { level: 2 },
  Admin: { level: 3 },
  Owner: { level: 4 },
};
export const ROLES_HIERARCHY = ['User', 'Manager', 'Admin', 'Owner'];
export const PERMISSIONS = {
  User: [],
  Manager: ['users:read', 'users:logout', 'users:role.change'],
  Admin: [
    'users:read',
    'users:logout',
    'users:delete.soft',
    'users:delete.hard',
    'users:role.change',
  ],
  Owner: ['*'],
};

export const VALID_RESOURCE_PERMISSIONS = ['viewer', 'editor'];
