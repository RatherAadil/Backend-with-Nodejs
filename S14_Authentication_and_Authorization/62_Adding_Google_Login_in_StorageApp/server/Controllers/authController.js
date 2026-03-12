import mongoose from 'mongoose';
import User from '../models/userModel.js';
import Directory from '../models/directoryModel.js';
import Session from '../models/sessionsModel.js';
import OTP from '../models/otpModel.js';
import { sendOtpService } from '../services/sendOtpService.js';
import { verifyIdToken } from '../services/verifyIdToken.js';

export const sendOtp = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(404).json({ error: 'email not included' });
  }
  const resData = await sendOtpService(email);
  return res.status(201).json(resData);
};

export const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;

  if (!otp) {
    return res.status(404).json({ error: 'otp not included' });
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
            picture,
            rootDirId,
          },
          { session },
        );

        const newSession = await Session.insertOne({ userId }, { session });

        res.cookie('sId', newSession.id, {
          httpOnly: true,
          signed: true,
          maxAge: 60 * 1000 * 60 * 24 * 7,
        });
        await session.commitTransaction();
        return res.status(201).json({ message: 'User Registered' });
      } catch (err) {
        await session.abortTransaction();
        next(err);
      }
    } else {
      const allSessions = await Session.find({ userId: user.id });

      if (allSessions.length >= 2) {
        await allSessions[0].deleteOne();
      }
      if (!user.picture.includes('googleusercontent.com')) {
        user.picture = picture;
        await user.save();
      }

      const session = await Session.create({ userId: user._id });
      res.cookie('sId', session.id, {
        httpOnly: true,
        signed: true,
        maxAge: 60 * 1000 * 60 * 24 * 7,
      });
      return res.status(201).json({ message: 'Logged in' });
    }
  } else {
    next();
  }
};
