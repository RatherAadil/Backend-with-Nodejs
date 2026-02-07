import express from 'express';
import { createWriteStream } from 'node:fs';
import { rename, rm } from 'node:fs/promises';
import path from 'node:path';

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
router.post('{/*filename}', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = getSafePath(...filename);
    const writeStream = createWriteStream(filePath);
    req.pipe(writeStream);
    req.on('end', () => {
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
router.get('{/*path}', (req, res) => {
  try {
    const path = req.params.path;
    const filepath = getSafePath(...path);
    if (req.query.action === 'download') {
      res.set('Content-Disposition', 'attachment');
    }
    res.sendFile(filepath, (err) => {
      if (err) {
        res.status(404).end();
      }
    });
  } catch (err) {
    res.status(403).json({ message: 'Access Denied', error: err.message });
  }
});

//Update
router.patch('/{*filename}', async (req, res) => {
  try {
    const filename = req.params.filename;
    const oldPath = getSafePath(...filename);
    const newPath = getSafePath(req.body.newFilename);
    await rename(oldPath, newPath);
    res.json({ message: 'Renamed' });
  } catch (err) {
    res.status(500).json({ message: 'Error occured' });
  }
});

//Delete
router.delete('{/*filename}', async (req, res) => {
  const filename = req.params.filename;
  try {
    const filePath = getSafePath(...filename);
    await rm(filePath, { recursive: true });
    res.json({ message: `File deleted successfully` });
  } catch (err) {
    res.status(`${err.message.includes('Traversal')}` ? 403 : 404).json({
      message: `Error deleting file.`,
      error: err.message,
    });
  }
});

export default router;
