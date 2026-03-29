import express from 'express';
import {
  changeRole,
  getAllUsers,
  hardDeleteUser,
  logoutUser,
  restoreUser,
  softDeleteUser,
} from '../Controllers/adminController.js';
import { authorize } from '../middlewares/authorizeMiddleware.js';

const router = express.Router();

router.get('/users', authorize('users:read'), getAllUsers);
router.post('/users/:userId/logout', authorize('users:logout'), logoutUser);
router.delete(
  '/users/:userId/hard',
  authorize('users:delete.hard'),
  hardDeleteUser,
);
router.delete(
  '/users/:userId/soft',
  authorize('users:delete.soft'),
  softDeleteUser,
);
router.patch('/users/:userId/restore', authorize('users:restore'), restoreUser);

//role assign
router.patch('/users/:userId/role', authorize('users:role.change'), changeRole);

export default router;
