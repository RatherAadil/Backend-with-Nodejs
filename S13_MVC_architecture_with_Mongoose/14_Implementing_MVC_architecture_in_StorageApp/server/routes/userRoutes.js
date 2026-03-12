import express from 'express';
import checkAuth from '../middlewares/authMiddleware.js';
import {
  createUser,
  getUserDetails,
  userLogin,
  userLogout,
} from '../Controllers/userController.js';

const router = express.Router();

router.post('/register', createUser);

router.post('/login', userLogin);

router.get('/', checkAuth, getUserDetails);
router.post('/logout', userLogout);
export default router;
