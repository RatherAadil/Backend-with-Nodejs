import express from 'express';
import {
  githubRedirectUrl,
  loginWithGithub,
  loginWithGoogle,
  sendOtp,
  verifyOtp,
} from '../Controllers/authController.js';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/google', loginWithGoogle);
router.get('/github', githubRedirectUrl);
router.get('/github/callback', loginWithGithub);

export default router;
