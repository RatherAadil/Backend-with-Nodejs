import express from 'express';
import checkAuth from '../middlewares/authMiddleware.js';
import {
  adminLogoutUser,
  createUser,
  getAllUsers,
  getUserDetails,
  login,
  logout,
  logoutAll,
} from '../Controllers/userController.js';
import { checkRole } from '../middlewares/checkRole.js';

const router = express.Router();

router.post('/user/register', createUser);

router.post('/user/login', login);

router.get('/user', checkAuth, getUserDetails);
router.get('/users', checkAuth, checkRole, getAllUsers);
router.post('/user/logout', logout);
router.post('/user/logout-all', checkAuth, logoutAll);

router.post('/users/:userId/logout', checkAuth, checkRole, adminLogoutUser);
export default router;
