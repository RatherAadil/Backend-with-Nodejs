import express from 'express';
import { writeFile } from 'node:fs/promises';
import usersData from '../usersDB.json' with { type: 'json' };
import directoriesData from '../directoriesDB.json' with { type: 'json' };

const router = express.Router();
router.post('/', async (req, res, next) => {
  const { username, email, password } = req.body;
  const isUserRegistered = usersData.find((user) => user.email === email);
  if (isUserRegistered)
    return res
      .status(409)
      .json({
        error: 'User already exists',
        message:
          'A user with this email address already exists please try different email.',
      });
  const dirId = crypto.randomUUID();
  const userId = crypto.randomUUID();
  directoriesData.push({
    id: dirId,
    name: `root-${email}`,
    userId,
    parentDirId: null,
    files: [],
    directories: [],
  });

  usersData.push({
    userId,
    username,
    email,
    password,
    rootDirId: dirId,
  });
  console.log(directoriesData, usersData);
  try {
    await writeFile('./directoriesDB.json', JSON.stringify(directoriesData));
    await writeFile('./usersDB.json', JSON.stringify(usersData));
    return res.status(201).json({ message: 'User Registered' });
  } catch (err) {
    next(err);
  }
});

export default router;
