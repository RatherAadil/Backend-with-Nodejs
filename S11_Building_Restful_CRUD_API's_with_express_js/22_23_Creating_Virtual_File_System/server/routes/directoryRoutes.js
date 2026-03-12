import express from 'express';
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import directoriesData from '../directoriesDB.json' with { type: 'json' };
import filesData from '../filesDB.json' with { type: 'json' };
const router = express.Router();

const STORAGE_ROOT = path.resolve('./storage');
function getSafePath(...segments) {
  const finalPath = path.resolve(STORAGE_ROOT, ...segments);

  if (!finalPath.startsWith(STORAGE_ROOT)) {
    throw new Error('Traversal Attempt Blocked');
  }
  return finalPath;
}
//Serving directory content
router.get('{/:id}', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      const directoryData = directoriesData[0];
      const files = directoryData.files.map((fileId) =>
        filesData.find((file) => file.id === fileId),
      );
      res.json({ ...directoryData, files });
    } else {
      const directoryData = directoriesData.find((folder) => folder.id === id);
      res.json(directoryData);
    }
  } catch (err) {
    res.json({ err: err.message });
  }
});

//create Directory
router.post('{/*dirname}', async (req, res) => {
  try {
    const dirname = req.params.dirname || [];
    const dirCreationPath = getSafePath(...dirname);
    await mkdir(dirCreationPath);
    res.json({ message: 'Folder created successfully' });
  } catch (err) {
    const isTraversal = err.message.includes('Traversal');
    res
      .status(isTraversal ? 403 : 404)
      .json({ err: isTraversal ? 'Access Denied' : err.message });
  }
});

export default router;
