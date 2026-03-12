import express from 'express';
import { rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import directoriesData from '../directoriesDB.json' with { type: 'json' };
import filesData from '../filesDB.json' with { type: 'json' };
const router = express.Router();

const STORAGE_ROOT = path.resolve('./storage');

async function deleteRecursively(dir) {
  // delete files
  for (const fileId of dir.files) {
    const fileIndex = filesData.findIndex((f) => f.id === fileId);
    const file = filesData[fileIndex];
    await rm(`${STORAGE_ROOT}/${file.id}${file.fileExtension}`, {
      force: true,
    });
    filesData.splice(fileIndex, 1);
  }
  // delete sub-directories recursively
  for (const dirId of dir.directories) {
    const dirIndex = directoriesData.findIndex((d) => d.id === dirId);
    const directory = directoriesData[dirIndex];
    await deleteRecursively(directory);
    directoriesData.splice(dirIndex, 1);
  }
}

//create Directory
router.post('{/:parentDirId}', async (req, res, next) => {
  const parentDirId = req.params.parentDirId || directoriesData[0].id;
  const dirname = req.headers.dirname || 'New Folder';
  const dirId = crypto.randomUUID();
  const parentDirectory = directoriesData.find(
    (directory) => directory.id === parentDirId,
  );
  if (!parentDirectory)
    return res
      .status(404)
      .json({ message: 'Parent Directory Does Not Exist!' });
  parentDirectory.directories.push(dirId);
  directoriesData.push({
    id: dirId,
    name: dirname,
    parentDirId,
    files: [],
    directories: [],
  });

  try {
    await writeFile('./directoriesDB.json', JSON.stringify(directoriesData));
    return res.status(200).json({ message: 'Directory created successfully' });
  } catch (err) {
    next(err);
  }
});

//Read directory
router.get('{/:id}', async (req, res) => {
  const id = req.params.id || directoriesData[0].id;
  const directoryData = directoriesData.find(
    (directory) => directory.id === id,
  );
  if (!directoryData)
    return res.status(404).json({ message: 'Directory Not Found!' });
  const files = directoryData.files.map((fileId) =>
    filesData.find((file) => file.id === fileId),
  );

  const directories = directoryData.directories
    .map((dirId) => directoriesData.find((dir) => dir.id === dirId))
    .map(({ id, name }) => ({ id, name }));

  return res.status(200).json({ ...directoryData, files, directories });
});

//Update directory
router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { newDirname } = req.body;
  const dirData = directoriesData.find((dir) => dir.id === id);
  if (!dirData)
    return res.status(404).json({ message: 'Directory Not Found!' });
  dirData.name = newDirname;
  try {
    await writeFile('./directoriesDB.json', JSON.stringify(directoriesData));
    return res.status(200).json({ message: 'Directory Renamed Successfully' });
  } catch (err) {
    next(err);
  }
});

//Delete directory
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const dirIndex = directoriesData.findIndex(
      (directory) => directory.id === id,
    );
    const dirData = directoriesData[dirIndex];
    directoriesData.splice(dirIndex, 1);

    for (const fileId of dirData.files) {
      const fileIndex = filesData.findIndex((file) => file.id === fileId);
      const file = filesData[fileIndex];
      await rm(`${STORAGE_ROOT}/${file.id}${file.fileExtension}`);
      filesData.splice(fileIndex, 1);
    }

    for (const dirId of dirData.directories) {
      const dirIndex = directoriesData.findIndex((dir) => dir.id === dirId);
      const directory = directoriesData[dirIndex];
      directoriesData.splice(dirIndex, 1);
      await deleteRecursively(directory);
    }
    const parentDirId = dirData.parentDirId;
    const parentDir = directoriesData.find((dir) => dir.id === parentDirId);
    const indexInParentDir = parentDir.directories.findIndex(
      (dirId) => dirId === id,
    );
    parentDir.directories.splice(indexInParentDir, 1);
    await writeFile('./filesDB.json', JSON.stringify(filesData));
    await writeFile('./directoriesDB.json', JSON.stringify(directoriesData));
    return res.status(200).json({ message: 'Directory Deleted Successfully' });
  } catch (err) {
    next(err);
  }
});
export default router;
