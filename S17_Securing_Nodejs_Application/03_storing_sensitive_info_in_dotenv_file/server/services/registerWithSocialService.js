import mongoose from 'mongoose';
import Directory from '../models/directoryModel.js';
import User from '../models/userModel.js';
import { setUserSession } from '../utils/sessionUtil.js';

export const registerWithSocialService = async ({
  name,
  email,
  picture,
  socialProvider,
}) => {
  const session = await mongoose.startSession();
  try {
    const rootDirId = new mongoose.Types.ObjectId();
    const userId = new mongoose.Types.ObjectId();

    session.startTransaction();
    await Directory.insertOne(
      { _id: rootDirId, name: `root-${email}`, parentDirId: null, userId },
      { session },
    );
    await User.insertOne(
      {
        _id: userId,
        name,
        email,
        picture,
        rootDirId,
        isSocialLogin: true,
        socialProvider,
      },
      { session },
    );

    await session.commitTransaction();

    const sessionId = await setUserSession({
      id: userId,
      rootDirId,
      name,
      email,
      picture,
      role: 'User',
    });

    return sessionId;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    await session.endSession();
  }
};
