import { rm } from 'fs/promises';
import path from 'path';
import { createWriteStream } from 'fs';
import Directory from '../models/directoryModel.js';
import File from '../models/fileModel.js';

export const uploadFile = async (req, res, next) => {
  const user = req.user;
  const parentDirId = req.params.parentDirId || user.rootDirId.toString();
  try {
    const parentDirData = await Directory.findOne({
      _id: parentDirId,
      userId: user._id,
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
      userId: user._id,
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
    console.log(err);
    next(err);
  }
};

export const getFile = async (req, res) => {
  const { id } = req.params;
  const fileData = await File.findOne({
    _id: id,
    userId: req.user._id,
  }).lean();

  if (!fileData) {
    return res
      .status(404)
      .json({ message: 'File Not Found! or You Dont Have Acess To This File' });
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
};

export const renameFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const file = await File.findOne({
      _id: id,
      userId: req.user._id,
    });
    if (!file) {
      return res.status(404).json({ error: 'File not found!' });
    }
    file.name = req.body.newFilename;
    await file.save();
    return res.status(200).json({ message: 'Renamed' });
  } catch (err) {
    console.log(err);
    err.status = 500;
    next(err);
  }
};

export const deleteFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const fileData = await File.findOne({
      _id: id,
      userId: req.user._id,
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
