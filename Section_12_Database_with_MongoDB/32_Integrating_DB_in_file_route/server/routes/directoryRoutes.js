import express from 'express';
import { rm, writeFile } from 'fs/promises';
import directoriesData from '../directoriesDB.json' with { type: 'json' };
import filesData from '../filesDB.json' with { type: 'json' };
import validateIdMiddleware from '../middlewares/validateIdMiddleware.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.param('id', validateIdMiddleware);
router.param('parentDirId', validateIdMiddleware);

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

// Read
router.get('{/:id}', async (req, res) => {
  const db = req.db;
  const user = req.user;
  const _id = req.params.id ? new ObjectId(req.params.id) : user.rootDirId;
  const dirCollection = db.collection('directories');

  const directoryData = await dirCollection.findOne({ _id });

  if (!directoryData)
    return res.status(404).json({
      message: 'Directory not found! or You Dont Have Acess To This Directory',
    });

  const files = await db
    .collection('files')
    .find({ parentDirId: directoryData._id })
    .toArray();

  const directories = await dirCollection.find({ parentDirId: _id }).toArray();
  return res.status(200).json({
    ...directoryData,
    files: files.map((file) => ({ ...file, id: file._id })),
    directories: directories.map((dir) => ({ ...dir, id: dir._id })),
  });
});

//Create
router.post('{/:parentDirId}', async (req, res, next) => {
  const db = req.db;
  const dirCollection = db.collection('directories');
  const user = req.user;
  const parentDirId = req.params.parentDirId || user.rootDirId;
  const dirname = req.headers.dirname || 'New Folder';
  try {
    const parentDir = await dirCollection.findOne({
      _id: new ObjectId(parentDirId),
    });

    if (!parentDir)
      return res.status(404).json({
        message:
          'Parent Directory Does not exist! or You Dont Have Acess To This Directory',
      });

    await dirCollection.insertOne({
      name: dirname,
      parentDirId: new ObjectId(parentDirId),
      userId: user._id,
    });

    return res.status(200).json({ message: 'Directory Created!' });
  } catch (err) {
    next(err);
  }
});

//Update
router.patch('/:id', async (req, res, next) => {
  const db = req.db;
  const dirCollection = db.collection('directories');
  const user = req.user;
  const { id } = req.params;
  const { newDirName } = req.body;
  try {
    await dirCollection.updateOne(
      { _id: new ObjectId(id), userId: user._id },
      { $set: { name: newDirName } },
    );

    res.status(200).json({ message: 'Directory Renamed!' });
  } catch (err) {
    next(err);
  }
});

//Delete
router.delete('/:id', async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const dirIndex = directoriesData.findIndex(
      (directory) => directory.id === id,
    );
    const directoryData = directoriesData[dirIndex];
    if (directoryData.userId !== user.id)
      return res
        .status(401)
        .json({ error: 'You Dont Have Acess To This Directory' });
    directoriesData.splice(dirIndex, 1);
    for await (const fileId of directoryData.files) {
      const fileIndex = filesData.findIndex((file) => file.id === fileId);
      const fileData = filesData[fileIndex];
      await rm(`./storage/${fileId}${fileData.extension}`);
      filesData.splice(fileIndex, 1);
    }
    for await (const dirId of directoryData.directories) {
      const dirIndex = directoriesData.findIndex(({ id }) => id === dirId);
      const directory = directoriesData[dirIndex];
      directoriesData.splice(dirIndex, 1);
      await deleteRecursively(directory);
    }
    const parentDirData = directoriesData.find(
      (dirData) => dirData.id === directoryData.parentDirId,
    );
    parentDirData.directories = parentDirData.directories.filter(
      (dirId) => dirId !== id,
    );
    await writeFile('./filesDB.json', JSON.stringify(filesData));
    await writeFile('./directoriesDB.json', JSON.stringify(directoriesData));
    res.status(200).json({ message: 'Directory Deleted!' });
  } catch (err) {
    next(err);
  }
});
export default router;
