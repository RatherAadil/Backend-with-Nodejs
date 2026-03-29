import { rm } from 'fs/promises';
import Directory from '../models/directoryModel.js';
import File from '../models/fileModel.js';

export const getDirectoryById = async (req, res, next) => {
  const user = req.user;
  const _id = req.params.id || user.rootDirId;
  try {
    const directoryData = await Directory.findOne({ _id }).lean();

    if (!directoryData)
      return res.status(404).json({
        message:
          'Directory not found! or You Dont Have Acess To This Directory',
      });

    const files = await File.find({ parentDirId: directoryData._id }).lean();

    const directories = await Directory.find({ parentDirId: _id }).lean();
    return res.status(200).json({
      ...directoryData,
      files: files.map((file) => ({ ...file, id: file._id })),
      directories: directories.map((dir) => ({ ...dir, id: dir._id })),
    });
  } catch (err) {
    next(err);
  }
};

export const createDirectory = async (req, res, next) => {
  const user = req.user;
  const parentDirId = req.params.parentDirId || user.rootDirId;
  const dirname = req.headers.dirname || 'New Folder';
  try {
    const parentDir = await Directory.findOne({ _id: parentDirId }).lean();

    if (!parentDir)
      return res.status(404).json({
        message:
          'Parent Directory Does not exist! or You Dont Have Acess To This Directory',
      });
    await Directory.insertOne({
      name: dirname,
      parentDirId,
      userId: user.id,
    });
    return res.status(200).json({ message: 'Directory Created!' });
  } catch (err) {
    next(err);
  }
};

export const renameDirectory = async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  const { newDirName } = req.body;
  try {
    const result = await Directory.findOneAndUpdate(
      { _id: id, userId: user.id },
      { name: newDirName },
      { runValidators: true, returnDocument: 'after' },
    );
    if (!result) {
      return res.status(404).json({ message: 'Directory not found' });
    }
    res.status(200).json({ message: 'Directory Renamed!' });
  } catch (err) {
    next(err);
  }
};

export const deleteDirectory = async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const directoryData = await Directory.findOne({
      _id: id,
      userId: user.id,
    })
      .select('_id')
      .lean();

    if (!directoryData) {
      return res.status(404).json({ error: 'Directory not found!' });
    }

    async function getDirectoryContents(id) {
      let files = await File.find({ parentDirId: id, userId: user.id })
        .select('extension')
        .lean();
      let directories = await Directory.find({
        parentDirId: id,
        userId: user.id,
      })
        .select('_id')
        .lean();

      for (const dir of directories) {
        const { files: childFiles, directories: childDirectories } =
          await getDirectoryContents(dir._id);
        files = [...files, ...childFiles];
        directories = [...directories, ...childDirectories];
      }
      return { files, directories };
    }
    const { files, directories } = await getDirectoryContents(id);
    for (const { _id, extension } of files) {
      await rm(`./storage/${_id.toString()}${extension}`);
    }
    await File.deleteMany({
      _id: { $in: files.map(({ _id }) => _id) },
    });
    await Directory.deleteMany({
      _id: { $in: [...directories.map(({ _id }) => _id), id] },
    });
    return res.status(200).json({ message: 'Directory deleted successfully' });
  } catch (err) {
    next(err);
  }
};
