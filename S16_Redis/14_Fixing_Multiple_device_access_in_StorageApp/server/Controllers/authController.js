import mongoose from 'mongoose';
import User from '../models/userModel.js';
import OTP from '../models/otpModel.js';
import crypto from 'node:crypto';
import { sendOtpService } from '../services/sendOtpService.js';
import { verifyIdToken } from '../services/verifyIdToken.js';
import { githubAuthService } from '../services/githubAuthService.js';
import { registerWithSocialService } from '../services/registerWithSocialService.js';
import { checkMaxSessionsLimit, setUserSession } from '../utils/sessionUtil.js';

export const sendLoginWithEmailOTP = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(404).json({ error: 'Email is required' });
  }
  try {
    const resData = await sendOtpService(email);
    return res.status(201).json(resData);
  } catch (err) {
    next(err);
  }
};

export const verifyLoginWithEmailOTP = async (req, res, next) => {
  const { email, otp } = req.body;

  if (!otp) {
    return res.status(404).json({ error: 'OTP is required' });
  }
  const otpRecord = await OTP.findOne({ email, otp });
  if (!otpRecord) {
    return res.status(404).json({ error: 'Invalid OTP or expired OTP' });
  }

  return res.status(200).json({ message: 'OTP Verified' });
};

export const loginWithGoogle = async (req, res, next) => {
  const { idToken } = req.body;
  if (idToken) {
    const { name, email, picture } = await verifyIdToken(idToken);

    const user = await User.findOne({ email });
    if (!user) {
      const sessionId = await registerWithSocialService({
        name,
        email,
        picture,
        socialProvider: 'google',
      });
      res.cookie('sId', sessionId, {
        httpOnly: true,
        signed: true,
        maxAge: 60 * 1000 * 60 * 24,
      });
      return res.status(201).json({ message: 'Logged in' });
    } else {
      if (user.isDeleted)
        return res.status(404).json({
          error: 'Your account has been deleted, contact admin to recover',
        });

      await checkMaxSessionsLimit(user._id.toString());

      if (!user.picture.includes('googleusercontent.com')) {
        user.picture = picture;
        await user.save();
      }
      const sessionId = await setUserSession(user);
      res.cookie('sId', sessionId, {
        httpOnly: true,
        signed: true,
        maxAge: 60 * 1000 * 60 * 24,
      });

      return res.status(201).json({ message: 'Logged in' });
    }
  } else {
    next();
  }
};
export const githubRedirectUrl = async (req, res) => {
  const referer = req.get('referer');
  const origin = referer ? new URL(referer).origin : null;
  const githubState = crypto.randomBytes(16).toString('hex');

  const combinedState = Buffer.from(
    JSON.stringify({ origin, githubState }),
  ).toString('base64url');

  res.cookie('github_state', combinedState, {
    httpOnly: true,
    signed: true,
    maxAge: 1000 * 60 * 10,
  });

  const client_id = process.env.GITHUB_CLIENT_ID;
  const redirect_uri = process.env.GITHUB_REDIRECT_URI;

  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=read:user user:email &state=${githubState}`,
  );
};

export const loginWithGithub = async (req, res, next) => {
  const { github_state } = req.signedCookies;
  const { code, state, error } = req.query;

  if (!github_state) return res.status(403).send('Invalid or expired state');

  const { githubState, origin } = JSON.parse(
    Buffer.from(github_state, 'base64url').toString(),
  );

  if (error) return res.redirect(`${origin}/login?error=${error}`);
  if (!code || !state) return res.status(400).send('Missing code or state');
  if (githubState !== state) return res.status(403).send('State mismatch');

  res.clearCookie('github_state');

  try {
    const { name, email, picture } = await githubAuthService(code);
    const user = await User.findOne({ email });

    if (!user) {
      const sessionId = await registerWithSocialService({
        name,
        email,
        picture,
        socialProvider: 'github',
      });
      res.cookie('sId', sessionId, {
        httpOnly: true,
        signed: true,
        maxAge: 60 * 1000 * 60 * 24,
      });
    } else {
      if (user.isDeleted)
        return res.status(404).json({
          error: 'Your account has been deleted, contact admin to recover',
        });

      await checkMaxSessionsLimit(user._id.toString());

      if (!user.picture.includes('githubusercontent.com')) {
        user.picture = picture;
        await user.save();
      }
      const sessionId = await setUserSession(user);
      res.cookie('sId', sessionId, {
        httpOnly: true,
        signed: true,
        maxAge: 60 * 1000 * 60 * 24,
      });
    }

    return res.redirect(`${origin}/`);
  } catch (err) {
    next(err);
  }
};
