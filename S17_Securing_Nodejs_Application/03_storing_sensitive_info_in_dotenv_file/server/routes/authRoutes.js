import express from 'express';
import {
  githubRedirectUrl,
  loginWithGithub,
  loginWithGoogle,
  sendLoginWithEmailOTP,
  verifyLoginWithEmailOTP,
} from '../Controllers/authController.js';

const router = express.Router();

router.post('/send-otp', sendLoginWithEmailOTP);
router.post('/verify-otp', verifyLoginWithEmailOTP);
router.post('/google', loginWithGoogle);
router.get('/github', githubRedirectUrl);
router.get('/github/callback', loginWithGithub);

export default router;
