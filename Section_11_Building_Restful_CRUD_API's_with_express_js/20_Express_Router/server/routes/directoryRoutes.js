import express from 'express';
import { mkdir, readdir, stat } from 'node:fs/promises';
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
//Serving directory content
router.get('{/*dirname}', async (req, res) => {
  try {
    const segments = req.params.dirname || [];
    const fullDirPath = getSafePath(...segments);
    const filesList = await readdir(fullDirPath);
    const resData = [];
    for (const item of filesList) {
      const stats = await stat(`${fullDirPath}/${item}`);
      resData.push({
        name: item,
        isDirectory: stats.isDirectory(),
      });
    }
    res.json(resData);
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
