import express from 'express';
import checkAuth from '../middlewares/authMiddleware.js';
import {
  changeRole,
  createUser,
  getAllUsers,
  getUserDetails,
  hardDeleteUser,
  login,
  logout,
  logoutAll,
  logoutUser,
  restoreUser,
  searchUserByEmail,
  setPasswordForManualLogin,
  setting,
  softDeleteUser,
  udpatePassword,
} from '../Controllers/userController.js';
import { isDeletedUser } from '../middlewares/isDeletedUserMiddleware.js';
import { authorize } from '../middlewares/authorizeMiddleware.js';
import { canActOn } from '../middlewares/canActOnMiddleware.js';
import { fetchTargetUser } from '../middlewares/fetchTargetUserMiddleware.js';
import { canAssignRole } from '../middlewares/canAssignRoleMiddleware.js';

const router = express.Router();

//user routes
router.post('/user/register', createUser);
router.post('/user/login', isDeletedUser, login);
router.get('/user', checkAuth, isDeletedUser, getUserDetails);
router.post('/user/logout', logout);
router.post('/user/logout-all', checkAuth, logoutAll);
router.get('/user/setting', checkAuth, isDeletedUser, setting);
router.patch(
  '/user/changePassword',
  checkAuth,
  isDeletedUser,
  setPasswordForManualLogin,
);
router.patch('/user/updatePassword', checkAuth, isDeletedUser, udpatePassword);

//admin routes
router.get('/users', checkAuth, authorize('users:read'), getAllUsers);
router.post(
  '/users/:userId/logout',
  checkAuth,
  authorize('users:logout'),
  fetchTargetUser,
  canActOn,
  logoutUser,
);
router.delete(
  '/users/:userId/hard',
  checkAuth,
  authorize('users:delete.hard'),
  fetchTargetUser,
  canActOn,
  hardDeleteUser,
);
router.delete(
  '/users/:userId/soft',
  checkAuth,
  authorize('users:delete.soft'),
  fetchTargetUser,
  canActOn,
  softDeleteUser,
);
router.patch(
  '/users/:userId/restore',
  checkAuth,
  fetchTargetUser,
  authorize('users:restore'),
  canActOn,
  restoreUser,
);

//role assign
router.patch(
  '/users/:userId/role',
  checkAuth,
  fetchTargetUser,
  authorize('users:role.change'),
  canAssignRole,
  changeRole,
);

//File sharing
router.get('/user/sharewith', checkAuth, searchUserByEmail);

export default router;
