import express from 'express';
import {
  changeRole,
  getAllUsers,
  hardDeleteUser,
  logoutUser,
  restoreUser,
  softDeleteUser,
} from '../Controllers/userController.js';
import { authorize } from '../middlewares/authorizeMiddleware.js';
import { fetchTargetUser } from '../middlewares/fetchTargetUserMiddleware.js';
import { canActOn } from '../middlewares/canActOnMiddleware.js';
import { canAssignRole } from '../middlewares/canAssignRoleMiddleware.js';

const router = express.Router();

router.get('/users', authorize('users:read'), getAllUsers);
router.post(
  '/users/:userId/logout',
  authorize('users:logout'),
  fetchTargetUser,
  canActOn,
  logoutUser,
);
router.delete(
  '/users/:userId/hard',
  authorize('users:delete.hard'),
  fetchTargetUser,
  canActOn,
  hardDeleteUser,
);
router.delete(
  '/users/:userId/soft',
  authorize('users:delete.soft'),
  fetchTargetUser,
  canActOn,
  softDeleteUser,
);
router.patch(
  '/users/:userId/restore',
  fetchTargetUser,
  authorize('users:restore'),
  canActOn,
  restoreUser,
);

//role assign
router.patch(
  '/users/:userId/role',
  fetchTargetUser,
  authorize('users:role.change'),
  canAssignRole,
  changeRole,
);

export default router;
