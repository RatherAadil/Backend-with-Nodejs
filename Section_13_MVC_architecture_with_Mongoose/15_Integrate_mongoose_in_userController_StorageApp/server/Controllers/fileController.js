import { rm } from 'fs/promises';
import path from 'path';
import { createWriteStream } from 'fs';
import { ObjectId } from 'mongodb';

export const uploadFile = async (req, res, next) => {
  const db = req.db;
  const dirCollection = db.collection('directories');
  const filesCollection = db.collection('files');
  const user = req.user;
  const parentDirId = req.params.parentDirId || user.rootDirId;

  const parentDirData = await dirCollection.findOne({
    _id: new ObjectId(parentDirId),
    userId: user._id,
  });
  // Check if parent directory exists
  if (!parentDirData) {
    return res.status(404).json({ error: 'Parent directory not found!' });
  }

  const filename = req.headers.filename || 'untitled';
  const extension = path.extname(filename);
  const insertedFile = await filesCollection.insertOne({
    name: filename,
    extension,
    parentDirId: parentDirData._id,
    userId: user._id,
  });
  const fileId = insertedFile.insertedId.toString();
  const fullFileName = `${fileId}${extension}`;

  const writeStream = createWriteStream(`./storage/${fullFileName}`);
  req.pipe(writeStream);

  req.on('end', () => {
    return res.status(201).json({ message: 'File Uploaded' });
  });
  req.on('error', async () => {
    await filesCollection.deleteOne({ _id: insertedFile.insertedId });
    return res.status(404).json({ message: 'Could not upload file' });
  });
};

export const getFile = async (req, res) => {
  const db = req.db;
  const filesCollection = db.collection('files');
  const { id } = req.params;
  const fileData = await filesCollection.findOne({
    _id: new ObjectId(id),
    userId: req.user._id,
  });

  if (!fileData) {
    return res
      .status(404)
      .json({ message: 'File Not Found! or You Dont Have Acess To This File' });
  }

  const filePath = `${process.cwd()}/storage/${id}${fileData.extension}`;
  if (req.query.action === 'download') {
    // res.set('Content-Disposition', `attachment; filename=${fileData.name}`);
    return res.download(filePath, fileData.name);
  }
  return res.sendFile(filePath, (err) => {
    if (!res.headersSent && err) {
      return res.status(404).json({ error: 'File not found!' });
    }
  });
};

export const renameFile = async (req, res, next) => {
  const db = req.db;
  const filesCollection = db.collection('files');
  const { id } = req.params;
  try {
    const fileData = await filesCollection.findOne({
      _id: new ObjectId(id),
      userId: req.user._id,
    });
    if (!fileData) {
      return res.status(404).json({ error: 'File not found!' });
    }
    await filesCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      { $set: { name: req.body.newFilename } },
    );
    return res.status(200).json({ message: 'Renamed' });
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

export const deleteFile = async (req, res, next) => {
  const db = req.db;
  const filesCollection = db.collection('files');
  const { id } = req.params;
  try {
    const fileData = await filesCollection.findOne({
      _id: new ObjectId(id),
      userId: req.user._id,
    });
    if (!fileData) {
      return res.status(404).json({ error: 'File not found!' });
    }
    await rm(`./storage/${id}${fileData.extension}`);
    await filesCollection.deleteOne({ _id: fileData._id });
    return res.status(200).json({ message: 'File Deleted Successfully' });
  } catch (err) {
    next(err);
  }
};
