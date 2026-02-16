import express from 'express';
import checkAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  const db = req.db;
  const { name, email, password } = req.body;

  const foundUser = await db.collection('users').findOne({ email });
  if (foundUser) {
    return res.status(409).json({
      error: 'User already exists',
      message:
        'A user with this email address already exists. Please try logging in or use a different email.',
    });
  }

  try {
    const dirCollection = db.collection('directories');
    const userRootDir = await dirCollection.insertOne({
      name: `root-${email}`,
      parentDirId: null,
      files: [],
      directories: [],
    });

    const rootDirId = userRootDir.insertedId;
    const createdUser = await db.collection('users').insertOne({
      name,
      email,
      password,
      rootDirId,
    });
    const userId = createdUser.insertedId;
    await dirCollection.updateOne({ _id: rootDirId }, { $set: { userId } });
    res.status(201).json({ message: 'User Registered' });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  const db = req.db;
  const { email, password } = req.body;
  const user = await db.collection('users').findOne({ email, password });
  if (!user) return res.status(404).json({ error: 'Invalid Credentials' });
  const userOid = user._id.toString();
  res.cookie('uid', userOid, {
    httpOnly: true,
    maxAge: 60 * 1000 * 60 * 24 * 7,
  });
  res.json({ message: 'logged In' });
});

router.get('/', checkAuth, (req, res) => {
  const user = req.user;
  return res.status(200).json({
    name: user.name,
    email: user.email,
  });
});
router.post('/logout', (req, res) => {
  res.clearCookie('uid');
  res.status(204).end();
});
export default router;
