import mongoose from 'mongoose';
import { rm } from 'fs/promises';
import User from '../models/userModel.js';
import Directory from '../models/directoryModel.js';
import Session from '../models/sessionsModel.js';
import OTP from '../models/otpModel.js';
import File from '../models/fileModel.js';
import { PERMISSIONS } from '../config/roles.js';

export const createUser = async (req, res, next) => {
  const { name, email, password, otp } = req.body;

  const otpRecord = await OTP.findOne({ email, otp });
  if (!otpRecord) {
    return res.status(404).json({ error: 'Invalid OTP or expired OTP' });
  }
  await otpRecord.deleteOne();
  //create Session
  const session = await mongoose.startSession();
  try {
    const rootDirId = new mongoose.Types.ObjectId();
    const userId = new mongoose.Types.ObjectId();

    //Transaction
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
      console.log(err.errInfo.details);
      res
        .status(400)
        .json({ error: 'Invalid input, please enter valid fields' });
    } else if (err.code === 11000) {
      if (err.keyValue.email) {
        res.status(409).json({
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

export const login = async (req, res, next) => {
  const user = req.user;
  const { email, password, otp } = req.body;

  const otpRecord = await OTP.findOne({ email, otp });
  if (!otpRecord) {
    return res.status(404).json({ error: 'Invalid OTP or expired OTP' });
  }
  await otpRecord.deleteOne();

  if (!user) return res.status(404).json({ error: 'Invalid Credentials' });

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword)
    return res.status(404).json({ error: 'Invalid Credentials' });

  const allSessions = await Session.find({ userId: user.id });

  if (allSessions.length >= 2) {
    await allSessions[0].deleteOne();
  }

  const session = await Session.create({ userId: user._id });

  res.cookie('sId', session.id, {
    httpOnly: true,
    signed: true,
    maxAge: 60 * 1000 * 60 * 24 * 7,
  });
  res.json({ message: 'logged In' });
};

export const logout = async (req, res) => {
  const { sId } = req.signedCookies;
  await Session.findByIdAndDelete(sId);
  res.clearCookie('sId');
  res.status(204).end();
};
export const logoutAll = async (req, res) => {
  const user = req.user;
  await Session.deleteMany({ userId: user._id });
  res.clearCookie('sId');
  res.status(204).end();
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
    const {
      name,
      email,
      picture,
      isManualLogin,
      isSocialLogin,
      socialProvider,
    } = user;
    const resData = {
      success: true,
      data: {
        name,
        email,
        picture,
        isManualLogin,
        isSocialLogin,
        ...(isSocialLogin && { socialProvider }),
      },
    };
    return res.status(201).json(resData);
  } catch (err) {
    next(err);
  }
};
export const changePassword = async (req, res, next) => {
  const user = req.user;
  const { newPassword, confirmPassword } = req.body;
  try {
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    user.password = newPassword;
    user.isManualLogin = true;
    await user.save();

    return res.status(201).json({ message: 'Password changed successfully' });
  } catch (err) {
    next(err);
  }
};
export const udpatePassword = async (req, res, next) => {
  const user = req.user;
  const { currentPassword, newPassword, confirmPassword } = req.body;
  try {
    if (!newPassword || !confirmPassword || !currentPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }
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

export const getAllUsers = async (req, res, next) => {
  const userRole = req.user.role;
  try {
    const allUsers = await User.find()
      .select('name email role isDeleted')
      .lean();

    const allSessions = await Session.find().select('userId').lean();

    const allSessionsUserIdSet = new Set(
      allSessions.map((s) => s.userId.toString()),
    );

    const perms = PERMISSIONS[userRole] || [];
    const transformedUsers = allUsers
      .filter((user) => perms.includes('*') || !user.isDeleted)
      .map(({ _id, name, email, role, isDeleted }) => {
        return {
          id: _id,
          name,
          name,
          email,
          role,
          ...(userRole === 'Owner' && { isDeleted }),
          isLoggedIn: allSessionsUserIdSet.has(_id.toString()),
        };
      });
    return res.status(200).json(transformedUsers);
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    await Session.deleteMany({ userId });
    return res.status(200).json({ message: 'User logged out' });
  } catch (err) {
    next(err);
  }
};
export const hardDeleteUser = async (req, res, next) => {
  const { userId } = req.params;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const userFiles = await File.find({ userId })
      .select('extension userId')
      .lean();

    const fileNames = userFiles.map(
      ({ _id, extension }) => `${_id.toString()}${extension}`,
    );
    await Promise.all([
      Session.deleteMany({ userId }, { session }),
      Directory.deleteMany({ userId }, { session }),
      User.findByIdAndDelete({ _id: userId }, { session }),
      File.deleteMany({ userId }, { session }),
    ]);

    await session.commitTransaction();

    await Promise.all(fileNames.map((file) => rm(`./storage/${file}`)));

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    await session.endSession();
  }
};
export const softDeleteUser = async (req, res, next) => {
  const user = req.targetUser;
  try {
    user.isDeleted = true;
    await user.save();

    await Session.deleteMany({ userId: user._id });
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};
export const restoreUser = async (req, res, next) => {
  const user = req.targetUser;
  try {
    user.isDeleted = false;
    await user.save();

    return res.status(200).json({ message: 'User restored successfully' });
  } catch (err) {
    next(err);
  }
};

export const changeRole = async (req, res, next) => {
  const user = req.targetUser;
  const { newRole } = req.body;
  try {
    if (!newRole)
      return res.status(404).json({ message: 'Role not included.' });

    user.role = newRole;
    await user.save();
    return res.status(200).json({ message: 'Role changed successfully' });
  } catch (err) {
    next(err);
  }
};
