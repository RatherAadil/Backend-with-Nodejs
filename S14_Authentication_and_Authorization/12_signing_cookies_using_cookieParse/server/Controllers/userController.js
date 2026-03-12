import User from '../models/userModel.js';
import Directory from '../models/directoryModel.js';
import mongoose from 'mongoose';

export const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

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
  const { email, password } = req.body;
  const user = await User.findOne({ email, password }).lean();
  if (!user) return res.status(404).json({ error: 'Invalid Credentials' });

  const cookiePayload = JSON.stringify({
    id: user._id.toString(),
    expiry: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  });

  res.cookie('token', Buffer.from(cookiePayload).toString('base64url'), {
    httpOnly: true,
    signed: true,
    maxAge: 60 * 1000 * 60 * 24 * 7,
  });
  res.json({ message: 'logged In' });
};

export const logout = (req, res) => {
  res.clearCookie('uid');
  res.status(204).end();
};

export const getUserDetails = (req, res) => {
  const user = req.user;
  return res.status(200).json({
    name: user.name,
    email: user.email,
  });
};
