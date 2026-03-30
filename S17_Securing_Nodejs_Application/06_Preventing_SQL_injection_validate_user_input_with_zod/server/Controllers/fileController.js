import { rm } from 'fs/promises';
import path from 'path';
import { createWriteStream } from 'fs';
import Directory from '../models/directoryModel.js';
import File from '../models/fileModel.js';
import User from '../models/userModel.js';
import { VALID_RESOURCE_PERMISSIONS } from '../utils/roles.js';
import { validateInput } from '../utils/validateInput.js';
import {
  enabledAndPermissionSchema,
  enabledSchema,
  permissionSchema,
  renameSharedFileSchema,
  uuidSchema,
} from '../validators/commonValidations.js';

export const uploadFile = async (req, res, next) => {
  const user = req.user;
  const parentDirId = req.params.parentDirId || user.rootDirId;
  try {
    const parentDirData = await Directory.findOne({
      _id: parentDirId,
      userId: user.id,
    }).lean();
    if (!parentDirData) {
      return res.status(404).json({ error: 'Parent directory not found!' });
    }
    const filename = req.headers.filename || 'untitled';
    const extension = path.extname(filename);
    const insertedFile = await File.insertOne({
      name: filename,
      extension,
      parentDirId: parentDirData._id,
      userId: user.id,
    });

    const fileId = insertedFile._id.toString();
    const fullFileName = `${fileId}${extension}`;
    const writeStream = createWriteStream(`./storage/${fullFileName}`);
    req.pipe(writeStream);

    req.on('end', () => {
      return res.status(201).json({ message: 'File Uploaded' });
    });
    req.on('error', async () => {
      await File.findOneAndDelete({ _id: fileId });
      await rm(`./storage/${fullFileName}`);
      return res.status(404).json({ message: 'Could not upload file' });
    });
  } catch (err) {
    next(err);
  }
};

export const getFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const fileData = await File.findOne({
      _id: id,
      userId: req.user.id,
    }).lean();

    if (!fileData) {
      return res.status(404).json({
        message: 'File Not Found! or You Dont Have Acess To This File',
      });
    }

    const filePath = `${process.cwd()}/storage/${id}${fileData.extension}`;
    if (req.query.action === 'download') {
      return res.download(filePath, fileData.name);
    }
    return res.sendFile(filePath, (err) => {
      if (!res.headersSent && err) {
        return res.status(404).json({ error: 'File not found!' });
      }
    });
  } catch (err) {
    next(err);
  }
};

export const renameFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const file = await File.findOne({
      _id: id,
      userId: req.user.id,
    });
    if (!file) {
      return res.status(404).json({ error: 'File not found!' });
    }
    file.name = req.body.newFilename;
    await file.save();
    return res.status(200).json({ message: 'Renamed' });
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

export const deleteFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const fileData = await File.findOne({
      _id: id,
      userId: req.user.id,
    })
      .select('extension')
      .lean();
    if (!fileData) {
      return res.status(404).json({ error: 'File not found!' });
    }
    await rm(`./storage/${id}${fileData.extension}`);
    await File.deleteOne({ _id: fileData._id });
    return res.status(200).json({ message: 'File Deleted Successfully' });
  } catch (err) {
    next(err);
  }
};

//File sharing via link
export const generateFileSharingLink = async (req, res, next) => {
  const user = req.user;
  const { id: fileId } = req.params;

  const { data, error } = validateInput(enabledAndPermissionSchema, req.body);
  if (error) return res.status(400).json({ error });

  const { enabled, permission } = data;
  if (!enabled)
    return res.status(403).json({ error: 'This file is not accessible.' });

  try {
    const fileData = await File.findOne({
      _id: fileId,
      userId: user.id,
    });

    if (!fileData) {
      return res.status(404).json({
        message: 'File Not Found! or you dont have access to it.',
      });
    }

    const existingToken = fileData.sharedViaLink.token;
    const newToken = existingToken || crypto.randomUUID();

    if (!existingToken) {
      fileData.sharedViaLink.token = newToken;
      await fileData.save();
    }

    res.status(200).json({
      message: 'Link generated successfully',
      success: true,
      data: {
        url: `${process.env.SERVER_BASE_URL}/guest/access/${fileId}?token=${newToken}`,
        isEnabled: fileData.sharedViaLink.enabled,
        permission,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const toggleFileSharing = async (req, res, next) => {
  const { id: fileId } = req.params;
  const { data, error } = validateInput(enabledSchema, req.body);
  if (error) return res.status(400).json({ error });

  const { enabled } = data;
  try {
    const fileData = await File.findOne({
      _id: fileId,
      userId: req.user.id,
    });

    if (!fileData) {
      return res.status(404).json({
        success: false,
        message: 'File Not Found! or you dont have access to it.',
      });
    }

    if (!enabled) {
      fileData.sharedViaLink.enabled = enabled;
      fileData.sharedViaLink.token = '';
      await fileData.save();
      return res
        .status(200)
        .json({ success: true, message: 'File shared access removed' });
    }

    fileData.sharedViaLink.enabled = enabled;
    await fileData.save();

    const resData = {
      permission: fileData.sharedViaLink.permission,
      enabled: fileData.sharedViaLink.enabled,
    };

    return res.status(200).json({
      success: true,
      data: {
        resData,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getSharedFileInformation = async (req, res) => {
  const { id } = req.params;
  const { data, error } = validateInput(uuidSchema, req.query);
  if (error) return res.status(400).json(error);
  const { token } = data;
  const fileData = await File.findOne({
    _id: id,
    'sharedViaLink.token': token,
    'sharedViaLink.enabled': true,
  });

  if (!fileData) {
    return res.status(404).json({
      message:
        'This file is not accessible. The link may have expired, been revoked, or you may not have permission to view this content.',
    });
  }

  const user = await User.findById(fileData.userId).select('name').lean();
  const resData = {
    id,
    url: `${process.env.SERVER_BASE_URL}/guest/file/view/${id}?token=${token}`,
    name: fileData.name,
    extension: fileData.extension,
    sharedBy: user.name,
    isAccessible: fileData.sharedViaLink.enabled,
    permission: fileData.sharedViaLink.permission,
  };

  return res.status(200).json({
    message: 'File access link generated successfully',
    success: true,
    data: resData,
  });
};

export const serveSharedFile = async (req, res, next) => {
  const { id } = req.params;
  const { data, error } = validateInput(uuidSchema, req.query);
  if (error) return res.status(400).json(error);
  const { token } = data;
  try {
    const fileData = await File.findOne({
      _id: id,
      'sharedViaLink.token': token,
      'sharedViaLink.enabled': true,
    }).lean();

    if (!fileData || !fileData.sharedViaLink.token) {
      return res.status(404).json({
        message:
          'This file is not accessible. The link may have expired, been revoked, or you may not have permission to view this content.',
      });
    }

    const filePath = `${process.cwd()}/storage/${id}${fileData.extension}`;
    if (req.query.action === 'download') {
      return res.download(filePath, fileData.name);
    }
    return res.sendFile(filePath, (err) => {
      if (!res.headersSent && err) {
        return res.status(404).json({ error: 'File not found!' });
      }
    });
  } catch (err) {
    next(err);
  }
};

export const renameSharedWithAnyoneFile = async (req, res, next) => {
  const { id: fileId } = req.params;
  const { data, error } = validateInput(renameSharedFileSchema, {
    token: req.query.token,
    newFileName: req.body.newFileName,
  });
  if (error) return res.status(400).json(error);
  const { token, newFileName } = data;

  try {
    const fileData = await File.findOne({
      _id: fileId,
      'sharedViaLink.token': token,
      'sharedViaLink.enabled': true,
      'sharedViaLink.permission': 'editor',
    });
    if (!fileData) {
      return res.status(404).json({
        message:
          'This file is not accessible. The link may have expired, been revoked, or you may not have permission to view this content.',
      });
    }
    fileData.name = newFileName;
    await fileData.save();

    return res
      .status(201)
      .json({ message: 'File renamed successfully', success: true });
  } catch (err) {
    next(err);
  }
};
export const changeSharedFilePermission = async (req, res, next) => {
  const { id: fileId } = req.params;
  const user = req.user;

  const { data, error } = validateInput(permissionSchema, req.body);
  if (error) return res.status(400).json(error);
  const { permission } = data;

  try {
    const file = await File.findOne({ _id: fileId, userId: user.id });
    console.log(fileId, user.id);
    if (!file) {
      return res.status(404).json({
        message: 'File not found or you do not have access to it.',
      });
    }

    if (file.sharedViaLink.permission === permission) {
      return res.status(200).json({ message: 'Permission unchanged' });
    }

    file.sharedViaLink.permission = permission;
    await file.save();

    return res.status(200).json({ message: 'Permission changed successfully' });
  } catch (err) {
    next(err);
  }
};

//file sharing with user
export const shareFileWithRegisteredUser = async (req, res, next) => {
  const user = req.user;
  const { fileId, userId } = req.params;
  const { permission } = req.body;

  if (!fileId || !userId) {
    return res.status(400).json({ error: 'File id or User id not included' });
  }

  if (!permission || !VALID_RESOURCE_PERMISSIONS.includes(permission)) {
    return res.status(400).json({ message: 'Invalid permission' });
  }

  try {
    const file = await File.findOne({ _id: fileId, userId: user.id });

    if (!file) {
      return res.status(404).json({
        message: 'File not found or you do not have access to it.',
      });
    }

    const alreadyShared = file.sharedWith.some(
      (entry) => entry.userId.toString() === userId,
    );

    if (alreadyShared) {
      return res
        .status(400)
        .json({ message: 'File already shared with this user' });
    }

    file.sharedWith.push({ userId, permission });
    await file.save();

    return res
      .status(200)
      .json({ success: true, message: 'File shared successfully' });
  } catch (err) {
    next(err);
  }
};
