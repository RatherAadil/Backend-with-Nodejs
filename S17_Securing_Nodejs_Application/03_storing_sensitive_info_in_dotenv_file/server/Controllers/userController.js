import mongoose from 'mongoose';
import redisClient from '../config/redis.js';
import { rm } from 'fs/promises';
import User from '../models/userModel.js';
import Directory from '../models/directoryModel.js';
import Session from '../models/sessionsModel.js';
import File from '../models/fileModel.js';
import { PERMISSIONS } from '../utils/roles.js';
import { validateOTP } from '../utils/validateOTPutil.js';
import {
  checkMaxSessionsLimit,
  deleteUserSessions,
  setUserSession,
} from '../utils/sessionUtil.js';

export const registerUserWithEmail = async (req, res, next) => {
  const { name, email, password, otp } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ messag: 'All fields are required' });

  const session = await mongoose.startSession();
  try {
    const isValidOTP = await validateOTP(email, otp);
    if (!isValidOTP)
      return res.status(404).json({ message: 'Invalid or Expired OTP' });

    const rootDirId = new mongoose.Types.ObjectId();
    const userId = new mongoose.Types.ObjectId();

    session.startTransaction();
    await Directory.insertOne(
      {
        _id: rootDirId,
        name: `root-${email}`,
        parentDirId: null,
        userId,
      },
      { session },
    );
    await User.insertOne(
      {
        _id: userId,
        name,
        email,
        password,
        rootDirId,
        isManualLogin: true,
      },
      { session },
    );
    await session.commitTransaction();
    res.status(201).json({ message: 'User Registered' });
  } catch (err) {
    await session.abortTransaction();
    if (err.code === 121) {
      return res
        .status(400)
        .json({ error: 'Invalid input, please enter valid fields' });
    } else if (err.code === 11000) {
      if (err.keyValue.email) {
        return res.status(409).json({
          error: 'User with this email already exists',
          message:
            'A user with this email address already exists. Please try logging in or use a different email.',
        });
      }
    } else {
      next(err);
    }
  }
};

export const loginUserWithEmail = async (req, res, next) => {
  const { email, password, otp } = req.body;

  if (!email || !password)
    return res.status(400).json({ messag: 'All fields are required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Invalid Credentials' });

    if (user.isDeleted)
      return res.status(404).json({
        error: 'Your account has been deleted, contact admin to recover',
      });

    const isValidOTP = await validateOTP(email, otp);
    if (!isValidOTP)
      return res.status(404).json({ message: 'Invalid or Expired OTP' });

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword)
      return res.status(404).json({ error: 'Invalid Credentials' });

    await checkMaxSessionsLimit(user._id.toString());
    const sessionId = await setUserSession(user);

    res.cookie('sId', sessionId, {
      httpOnly: true,
      signed: true,
      maxAge: 60 * 1000 * 60 * 24,
    });
    return res.json({ message: 'User logged In' });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  const { sId } = req.signedCookies;
  try {
    await redisClient.del(`session:${sId}`);
    res.clearCookie('sId');
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
export const logoutAll = async (req, res, next) => {
  try {
    await deleteUserSessions(req.user.id);
    res.clearCookie('sId');
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export const getUserDetails = (req, res) => {
  const user = req.user;
  return res.status(200).json({
    name: user.name,
    email: user.email,
    picture: user.picture,
    role: user.role,
  });
};

export const setting = async (req, res, next) => {
  const user = req.user;
  try {
    const { isManualLogin, isSocialLogin, socialProvider, isDeleted } =
      await User.findById(req.user.id)
        .select('isManualLogin isSocialLogin socialProvider isDeleted')
        .lean();
    if (isDeleted)
      return res.status(404).json({
        error: 'Your account has been deleted, contact admin to recover',
      });

    const resData = {
      success: true,
      data: {
        name: user.name,
        email: user.email,
        picture: user.picture,
        isManualLogin: isManualLogin,
        isSocialLogin: isSocialLogin,
        ...(isSocialLogin && {
          socialProvider,
        }),
      },
    };
    return res.status(201).json(resData);
  } catch (err) {
    next(err);
  }
};
export const setPasswordForManualLogin = async (req, res, next) => {
  const { newPassword, confirmPassword } = req.body;
  try {
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (isDeleted)
      return res.status(404).json({
        error: 'Your account has been deleted, contact admin to recover',
      });

    user.password = newPassword;
    user.isManualLogin = true;

    await user.save();

    return res.status(201).json({ message: 'Password changed successfully' });
  } catch (err) {
    next(err);
  }
};
export const udpatePassword = async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  try {
    if (!newPassword || !confirmPassword || !currentPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (isDeleted)
      return res.status(404).json({
        error: 'Your account has been deleted, contact admin to recover',
      });
    const isValidPassword = await user.comparePassword(currentPassword);

    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect current password',
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'password did not match',
      });
    }
    if (newPassword === currentPassword) {
      return res.status(400).json({
        success: false,
        message: 'New password cannot be same as current password',
      });
    }

    user.password = newPassword;
    user.isManualLogin = true;
    await user.save();

    return res
      .status(201)
      .json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    next(err);
  }
};

//File sharing
export const searchUserByEmail = async (req, res, next) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: 'Email is required' });
  try {
    const targetUser = await User.findOne({ email })
      .select('name email picture')
      .lean();
    if (!targetUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json({
      success: true,
      data: {
        _id: targetUser._id,
        name: targetUser.name,
        email: targetUser.email,
        picture: targetUser.picture,
      },
    });
  } catch (err) {
    next(err);
  }
};
