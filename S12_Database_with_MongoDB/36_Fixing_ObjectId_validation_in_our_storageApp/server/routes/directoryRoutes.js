import express from 'express';
import { rm } from 'fs/promises';
import validateIdMiddleware from '../middlewares/validateIdMiddleware.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.param('id', validateIdMiddleware);
router.param('parentDirId', validateIdMiddleware);

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
  const db = req.db;
  const dirCollection = db.collection('directories');
  const filesCollection = db.collection('files');
  const user = req.user;
  const { id } = req.params;
  const dirObjId = new ObjectId(id);
  const directoryData = await dirCollection.findOne(
    { _id: dirObjId, userId: user._id },
    { projection: { _id: 1 } },
  );
  if (!directoryData) {
    return res.status(404).json({ error: 'Directory not found!' });
  }

  async function getDirectoryContents(id) {
    let files = await filesCollection
      .find(
        { parentDirId: id, userId: user._id },
        { projection: { extension: 1 } },
      )
      .toArray();
    let directories = await dirCollection
      .find({ parentDirId: id, userId: user._id }, { projection: { _id: 1 } })
      .toArray();

    for (const dir of directories) {
      const { files: childFiles, directories: childDirectories } =
        await getDirectoryContents(dir._id);
      files = [...files, ...childFiles];
      directories = [...directories, ...childDirectories];
    }
    return { files, directories };
  }
  const { files, directories } = await getDirectoryContents(dirObjId);
  for (const { _id, extension } of files) {
    await rm(`./storage/${_id.toString()}${extension}`);
  }
  await filesCollection.deleteMany({
    _id: { $in: files.map(({ _id }) => _id) },
  });
  await dirCollection.deleteMany({
    _id: { $in: [...directories.map(({ _id }) => _id), dirObjId] },
  });
  return res.status(200).json({ message: 'Directory deleted successfully' });
});
export default router;
