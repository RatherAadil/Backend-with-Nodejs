import express from 'express';
import checkAuth from '../middlewares/authMiddleware.js';
import {
  createUser,
  getAllUsers,
  getUserDetails,
  hardDeleteUser,
  login,
  logout,
  logoutAll,
  logoutSpecificUser,
  restoreDeletedUser,
  softDeleteUser,
} from '../Controllers/userController.js';
import { checkIsAdmin, checkRole } from '../middlewares/checkRole.js';
import { isDeletedUser } from '../middlewares/isDeletedUser.js';

const router = express.Router();

router.post('/user/register', createUser);

router.post('/user/login', isDeletedUser, login);

router.get('/user', checkAuth, isDeletedUser, getUserDetails);
router.get('/users', checkAuth, checkRole, getAllUsers);
router.post('/user/logout', logout);
router.post('/user/logout-all', checkAuth, logoutAll);

router.post('/users/:userId/logout', checkAuth, checkRole, logoutSpecificUser);
router.delete('/users/:userId/hard', checkAuth, checkIsAdmin, hardDeleteUser);
router.delete('/users/:userId/soft', checkAuth, checkIsAdmin, softDeleteUser);
router.patch(
  '/users/:userId/restore',
  checkAuth,
  checkIsAdmin,
  restoreDeletedUser,
);
export default router;
