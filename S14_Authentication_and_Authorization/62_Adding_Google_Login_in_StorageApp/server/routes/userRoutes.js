import express from 'express';
import checkAuth from '../middlewares/authMiddleware.js';
import {
  createUser,
  getUserDetails,
  login,
  logout,
  logoutAll,
} from '../Controllers/userController.js';

const router = express.Router();

router.post('/register', createUser);

router.post('/login', login);

router.get('/', checkAuth, getUserDetails);
router.post('/logout', logout);
router.post('/logout-all', checkAuth, logoutAll);
export default router;
