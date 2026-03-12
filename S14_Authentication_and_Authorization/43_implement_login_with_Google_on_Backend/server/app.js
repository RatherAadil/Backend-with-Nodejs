import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { writeFile } from 'fs/promises';
import { fetchUserFromGoogle } from './services/googleAuthService.js';
import users from './usersDB.json' with { type: 'json' };
import sessions from './sessionsDB.json' with { type: 'json' };

const app = express();
const PORT = 4000;
app.use(
  cors({
    origin: 'http://localhost:5500',
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.post('/auth/google/callback', async (req, res) => {
  const { code } = req.body;
  const { sid } = req.cookies;
  const existingSession = sessions.find(({ sessionId }) => sessionId === sid);
  if (existingSession) {
    return res.status(200).json({ message: 'User already logged in' });
  }
  const { name, email, sub, picture } = await fetchUserFromGoogle(code);
  const newUser = { id: sub, email, name, picture };
  const existingUser = users.find(({ id }) => id === sub);
  const sessionExists = sessions.find(({ sessionId }) => sessionId === sid);

  if (existingUser) {
    const sessionId = crypto.randomUUID();
    sessions.push({ sessionId, userId: sub });
    await writeFile('./sessionsDB.json', JSON.stringify(sessions, null, 2));
    res.cookie('sid', sessionId, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json(existingUser);
  }
  users.push(newUser);
  const sessionId = crypto.randomUUID();
  sessions.push({ sessionId, userId: sub });
  await writeFile('./usersDB.json', JSON.stringify(users, null, 2));
  await writeFile('./sessionsDB.json', JSON.stringify(sessions, null, 2));
  res.cookie('sid', sessionId, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: true,
  });
  res.json(newUser);
});

app.get('/profile', (req, res) => {
  const { sid } = req.cookies;
  const session = sessions.find(({ sessionId }) => sessionId === sid);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const user = users.find(({ id }) => id === session.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
