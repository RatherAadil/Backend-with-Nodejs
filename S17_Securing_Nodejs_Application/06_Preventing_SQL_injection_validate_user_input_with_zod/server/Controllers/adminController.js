import mongoose from 'mongoose';
import redisClient from '../config/redis.js';
import User from '../models/userModel.js';
import File from '../models/fileModel.js';
import Directory from '../models/directoryModel.js';
import { rm } from 'fs/promises';
import { PERMISSIONS, ROLES_HIERARCHY } from '../utils/roles.js';
import { deleteUserSessions } from '../utils/sessionUtil.js';
import { canPerform } from '../utils/canPerform.js';
import { validateInput } from '../utils/validateInput.js';
import { roleSchema } from '../validators/commonValidations.js';

export const getAllUsers = async (req, res, next) => {
  const userRole = req.user.role;
  try {
    const allUsers = await User.find()
      .select('name email role isDeleted')
      .lean();

    const { documents: sessions } = await redisClient.ft.search(
      'userIdIdx',
      '*',
    );

    const allSessions = sessions.map(({ value }) => value.userId);

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
          isLoggedIn: allSessions.includes(_id.toString()),
        };
      });
    return res.status(200).json(transformedUsers);
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (req, res, next) => {
  const currentUserRole = req.user.role;
  const { userId: targetUserId } = req.params;
  if (!targetUserId)
    return res.status(404).json({ message: 'User Id is required' });

  try {
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) return res.status(404).json({ error: 'User not found' });

    if (!canPerform(currentUserRole, targetUser.role)) {
      return res
        .status(403)
        .json({ error: 'Forbidden: Insufficient permissions' });
    }

    await deleteUserSessions(targetUserId);
    return res.status(200).json({ message: 'User logged out' });
  } catch (err) {
    next(err);
  }
};
export const hardDeleteUser = async (req, res, next) => {
  const currentUserRole = req.user.role;
  const { userId: targetUserId } = req.params;
  if (!targetUserId)
    return res.status(404).json({ message: 'User Id is required' });

  const session = await mongoose.startSession();
  try {
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) return res.status(404).json({ error: 'User not found' });

    if (!canPerform(currentUserRole, targetUser.role)) {
      return res
        .status(403)
        .json({ error: 'Forbidden: Insufficient permissions' });
    }

    session.startTransaction();

    const userFiles = await File.find({ targetUserId })
      .select('extension userId')
      .lean();

    const fileNames = userFiles.map(
      ({ _id, extension }) => `${_id.toString()}${extension}`,
    );
    await deleteUserSessions(targetUserId);
    await Promise.all([
      Directory.deleteMany({ userId: targetUserId }, { session }),
      User.findByIdAndDelete({ _id: targetUserId }, { session }),
      File.deleteMany({ userId: targetUserId }, { session }),
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
  const currentUserRole = req.user.role;
  const targetUserId = req.params.userId;
  if (!targetUserId)
    return res.status(404).json({ message: 'User Id is required' });
  try {
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) return res.status(404).json({ error: 'User not found' });

    if (!canPerform(currentUserRole, targetUser.role)) {
      return res
        .status(403)
        .json({ error: 'Forbidden: Insufficient permissions' });
    }

    targetUser.isDeleted = true;
    await targetUser.save();
    await deleteUserSessions(targetUser._id.toString());
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};
export const restoreUser = async (req, res, next) => {
  const currentUserRole = req.user.role;
  const targetUserId = req.params.userId;
  if (!targetUserId)
    return res.status(404).json({ message: 'User Id is required' });
  try {
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) return res.status(404).json({ error: 'User not found' });

    if (!canPerform(currentUserRole, targetUser.role)) {
      return res
        .status(403)
        .json({ error: 'Forbidden: Insufficient permissions' });
    }

    targetUser.isDeleted = false;
    await targetUser.save();

    return res.status(200).json({ message: 'User restored successfully' });
  } catch (err) {
    next(err);
  }
};

export const changeRole = async (req, res, next) => {
  const currentUser = req.user;
  const targetUserId = req.params.userId;
  const { data, error } = validateInput(roleSchema, req.body);
  if (error) return res.status(400).json(error);
  const { newRole } = data;

  if (currentUser.id === targetUserId)
    return res.status(403).json({ error: 'You cannot change your role' });

  if (newRole === 'Owner') {
    return res.status(403).json({
      error: 'Forbidden: Owner role cannot be assigned.',
    });
  }

  if (
    ROLES_HIERARCHY.indexOf(newRole) > ROLES_HIERARCHY.indexOf(currentUser.role)
  ) {
    return res.status(403).json({
      error: 'Forbidden: You cannot assign a role higher than your own.',
    });
  }
  try {
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) return res.status(404).json({ error: 'User not found' });
    if (targetUser.isDeleted)
      return res.status(403).json({ error: 'User account has been deleted.' });
    if (!canPerform(currentUser.role, targetUser.role)) {
      return res
        .status(403)
        .json({ error: 'Forbidden: Insufficient permissions' });
    }

    targetUser.role = newRole;
    await targetUser.save();
    const { documents: sessions } = await redisClient.ft.search(
      'userIdIdx',
      `@userId:{${targetUser._id}}`,
    );
    await Promise.all(
      sessions.map((session) =>
        redisClient.json.set(session.id, '$.role', newRole),
      ),
    );
    return res.status(200).json({ message: 'Role changed successfully' });
  } catch (err) {
    next(err);
  }
};
