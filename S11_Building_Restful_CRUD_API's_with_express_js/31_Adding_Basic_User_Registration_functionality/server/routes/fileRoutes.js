import express from 'express';
import { createWriteStream } from 'node:fs';
import { rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import filesData from '../filesDB.json' with { type: 'json' };
import directoriesData from '../directoriesDB.json' with { type: 'json' };
const router = express.Router();

const STORAGE_ROOT = path.resolve('./storage');
//Create
router.post('{/:parentDirId}', (req, res) => {
  const parentDirId = req.params.parentDirId || directoriesData[0].id;
  const filename = req.headers.filename || 'untitled';
  const fileExtension = path.extname(filename);
  const randomFileId = crypto.randomUUID();
  const fullFileName = `${randomFileId}${fileExtension}`;
  const writeStream = createWriteStream(`./storage/${fullFileName}`);
  req.pipe(writeStream);
  req.on('end', async () => {
    filesData.push({
      id: randomFileId,
      fileExtension,
      filename,
      parentDirId,
    });
    const parentDirData = directoriesData.find(
      (directoryData) => directoryData.id === parentDirId,
    );
    parentDirData.files.push(randomFileId);
    try {
      await writeFile('./filesDB.json', JSON.stringify(filesData));
      await writeFile('./directoriesDB.json', JSON.stringify(directoriesData));
      return res.status(201).json({ message: `File uploaded successfully` });
    } catch (err) {
      return res.status(500).json({
        message: `Could Not Save Files`,
      });
    }
  });
});

//Read
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const fileData = filesData.find((file) => file.id === id);
  if (!fileData) {
    return res.status(404).json({ message: 'File Not Found!' });
  }
  if (req.query.action === 'download') {
    res.set('Content-Disposition', `attachment;filename=${fileData.filename}`);
  }
  return res.sendFile(
    `${STORAGE_ROOT}/${id}${fileData.fileExtension}`,
    (err) => {
      if (!res.headersSent && err) {
        return res.status(404).json({ message: 'File Not Found!' });
      }
    },
  );
});

//Update
router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { newFilename } = req.body;
  const fileData = filesData.find((file) => file.id === id);
  fileData.filename = newFilename;
  try {
    await writeFile('./filesDB.json', JSON.stringify(filesData));
    return res.status(200).json({ message: 'File Renamed Successfully' });
  } catch (err) {
    err.status = 500;
    next(err);
  }
});

//Delete
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const fileIndex = filesData.findIndex((file) => file.id === id);
  if (fileIndex === -1) {
    return res.status(404).json({ message: 'File Not Found' });
  }
  try {
    const fileData = filesData[fileIndex];
    const fileExtension = fileData.fileExtension;
    const filePath = `${STORAGE_ROOT}/${id}${fileExtension}`;
    await rm(filePath, { recursive: true });
    filesData.splice(fileIndex, 1);

    const parentDirectory = directoriesData.find(
      (directory) => directory.id === fileData.parentDirId,
    );
    parentDirectory.files = parentDirectory.files.filter(
      (fileId) => fileId !== id,
    );
    await writeFile('./filesDB.json', JSON.stringify(filesData));
    await writeFile('./directoriesDB.json', JSON.stringify(directoriesData));

    res.status(200).json({ message: `File Deleted Successfully` });
  } catch (err) {
    next(err);
  }
});

export default router;
