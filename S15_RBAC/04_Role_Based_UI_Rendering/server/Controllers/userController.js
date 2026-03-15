import mongoose from 'mongoose';
import User from '../models/userModel.js';
import Directory from '../models/directoryModel.js';
import Session from '../models/sessionsModel.js';
import OTP from '../models/otpModel.js';

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
  const { email, password, otp } = req.body;

  const otpRecord = await OTP.findOne({ email, otp });
  if (!otpRecord) {
    return res.status(404).json({ error: 'Invalid OTP or expired OTP' });
  }
  await otpRecord.deleteOne();

  const user = await User.findOne({ email });

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
export const getAllUsers = async (req, res) => {
  const allUsers = await User.find().select('name email').lean();
  const allSessions = await Session.find().select('userId').lean();

  const allSessionsUserIdSet = new Set(
    allSessions.map((s) => s.userId.toString()),
  );

  const transformedUsers = allUsers.map(({ _id, name, email }) => ({
    id: _id,
    name,
    email,
    isLoggedIn: allSessionsUserIdSet.has(_id.toString()),
  }));

  return res.status(200).json(transformedUsers);
};
