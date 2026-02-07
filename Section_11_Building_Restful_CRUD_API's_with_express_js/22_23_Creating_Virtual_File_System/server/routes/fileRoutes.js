import express from 'express';
import { createWriteStream } from 'node:fs';
import { rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import filesData from '../filesDB.json' with { type: 'json' };
import directoriesData from '../directoriesDB.json' with { type: 'json' };
const router = express.Router();

const STORAGE_ROOT = path.resolve('./storage');
function getSafePath(...segments) {
  const finalPath = path.resolve(STORAGE_ROOT, ...segments);

  if (!finalPath.startsWith(STORAGE_ROOT)) {
    throw new Error('Traversal Attempt Blocked');
  }
  return finalPath;
}
//Create
router.post('/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const parentDirId = req.headers.parentdirid || directoriesData[0].id;
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
      await writeFile('./filesDB.json', JSON.stringify(filesData));
      await writeFile('./directoriesDB.json', JSON.stringify(directoriesData));
      res.status(200).json({ message: `File uploaded successfully` });
    });
  } catch (error) {
    res.status(500).json({
      message: `Error uploading file`,
      error: error.message,
    });
  }
});

//Read
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const fileData = filesData.find((file) => file.id === id);
    if (req.query.action === 'download') {
      res.set('Content-Disposition', 'attachment');
    }
    res.sendFile(`${STORAGE_ROOT}/${id}${fileData.fileExtension}`, (err) => {
      if (err) {
        res.status(404).end();
      }
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

//Update
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { newFilename } = req.body;
    const fileData = filesData.find((file) => file.id === id);
    fileData.filename = newFilename;
    await writeFile('./filesDB.json', JSON.stringify(filesData));
    res.json({ message: 'File renamed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Delete
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const fileIndex = filesData.findIndex((file) => file.id === id);
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

    res.json({ message: `File deleted successfully` });
  } catch (err) {
    res.status(404).json({
      message: `Error deleting file.`,
    });
  }
});

export default router;
