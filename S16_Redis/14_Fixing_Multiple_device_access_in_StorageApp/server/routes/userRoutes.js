import express from 'express';
import checkAuth from '../middlewares/authMiddleware.js';
import {
  getUserDetails,
  loginUserWithEmail,
  logout,
  logoutAll,
  registerUserWithEmail,
  searchUserByEmail,
  setPasswordForManualLogin,
  setting,
  udpatePassword,
} from '../Controllers/userController.js';

const router = express.Router();

router.post('/user/register', registerUserWithEmail);
router.post('/user/login', loginUserWithEmail);
router.get('/user', checkAuth, getUserDetails);
router.post('/user/logout', logout);
router.post('/user/logout-all', checkAuth, logoutAll);
router.get('/user/setting', checkAuth, setting);
router.patch('/user/changePassword', checkAuth, setPasswordForManualLogin);
router.patch('/user/updatePassword', checkAuth, udpatePassword);

//File sharing
router.get('/user/sharewith', checkAuth, searchUserByEmail);

export default router;
