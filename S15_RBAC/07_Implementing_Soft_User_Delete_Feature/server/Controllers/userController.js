import mongoose from 'mongoose';
import { rm } from 'fs/promises';
import User from '../models/userModel.js';
import Directory from '../models/directoryModel.js';
import Session from '../models/sessionsModel.js';
import OTP from '../models/otpModel.js';
import { canPerformAction } from '../utils/index.js';
import File from '../models/fileModel.js';

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
export const getAllUsers = async (req, res, next) => {
  const userRole = req.user.role;
  try {
    const allUsers = await User.find().select('name email role deleted').lean();
    const allSessions = await Session.find().select('userId').lean();

    const allSessionsUserIdSet = new Set(
      allSessions.map((s) => s.userId.toString()),
    );

    const transformedUsers = allUsers
      .filter((user) => userRole === 'Admin' || !user.deleted)
      .map(({ _id, name, email, role, deleted }) => {
        return {
          id: _id,
          name,
          name,
          email,
          role,
          ...(userRole === 'Admin' && { deleted }),
          isLoggedIn: allSessionsUserIdSet.has(_id.toString()),
        };
      });
    return res.status(200).json(transformedUsers);
  } catch (err) {
    next(err);
  }
};

export const logoutSpecificUser = async (req, res, next) => {
  const currentUserRole = req.user.role;
  const { userId } = req.params;
  try {
    if (!userId)
      return res.status(404).json({ message: 'User Id not included' });

    const { role: userRole } = await User.findOne({ _id: userId })
      .select('-_id role')
      .lean();
    const hasPermission = canPerformAction(currentUserRole, userRole);
    if (!hasPermission) {
      return res
        .status(403)
        .json({ error: 'You are not authorized to perform this action' });
    }

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

    const user = await User.findOne({ _id: userId }).lean();
    if (!user) {
      await session.abortTransaction();
      await session.endSession();
      return res.status(404).json({ error: 'User does not exist' });
    }

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
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.deleted = true;
    await user.save();

    await Session.deleteMany({ userId });

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};
export const restoreDeletedUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.deleted = false;
    await user.save();

    return res.status(200).json({ message: 'User restored successfully' });
  } catch (err) {
    next(err);
  }
};
