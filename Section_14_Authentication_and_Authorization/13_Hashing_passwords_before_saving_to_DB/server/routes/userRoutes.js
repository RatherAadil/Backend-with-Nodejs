import express from 'express';
import checkAuth from '../middlewares/authMiddleware.js';
import {
  createUser,
  getUserDetails,
  login,
  logout,
} from '../Controllers/userController.js';

const router = express.Router();

router.post('/register', createUser);

router.post('/login', login);

router.get('/', checkAuth, getUserDetails);
router.post('/logout', logout);
export default router;
