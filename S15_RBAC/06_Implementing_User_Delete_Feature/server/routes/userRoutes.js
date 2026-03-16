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
} from '../Controllers/userController.js';
import { checkIsAdmin, checkRole } from '../middlewares/checkRole.js';

const router = express.Router();

router.post('/user/register', createUser);

router.post('/user/login', login);

router.get('/user', checkAuth, getUserDetails);
router.get('/users', checkAuth, checkRole, getAllUsers);
router.post('/user/logout', logout);
router.post('/user/logout-all', checkAuth, logoutAll);

router.post('/users/:userId/logout', checkAuth, checkRole, logoutSpecificUser);
router.delete(
  '/users/:userId/hardDelete',
  checkAuth,
  checkIsAdmin,
  hardDeleteUser,
);
export default router;
