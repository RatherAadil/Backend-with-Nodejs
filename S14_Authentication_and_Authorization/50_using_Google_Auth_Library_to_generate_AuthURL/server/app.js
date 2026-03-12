import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { writeFile } from 'fs/promises';
import {
  fetchUserFromGoogle,
  generateGoogleAuthUrl,
} from './services/googleAuthService.js';
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

app.get('/auth/google', async (req, res) => {
  const googleAuthUrl = generateGoogleAuthUrl();
  res.redirect(googleAuthUrl);
  res.end();
});

app.get('/auth/google/callback', async (req, res) => {
  const { sid } = req.cookies;
  const existingSession = sessions.find(({ sessionId }) => sessionId === sid);
  if (existingSession) {
    return res.status(200).json({ message: 'User already logged in' });
  }

  const { code } = req.query;
  const { name, email, sub, picture } = await fetchUserFromGoogle(code);

  const newUser = { id: sub, email, name, picture };
  const existingUser = users.find(({ id }) => id === sub);

  if (existingUser) {
    const existingSessionIndex = sessions.findIndex(
      ({ userId }) => userId === sub,
    );
    const sessionId = crypto.randomUUID();
    if (existingSessionIndex === -1) {
      sessions.push({ sessionId, userId: sub });
    } else {
      sessions[existingSessionIndex].sessionId = sessionId;
    }
    await writeFile('./sessionsDB.json', JSON.stringify(sessions, null, 2));

    res.redirect(`http://localhost:5500/client/callback.html?sid=${sessionId}`);
    return res.end();
  }
  users.push(newUser);
  const sessionId = crypto.randomUUID();
  sessions.push({ sessionId, userId: sub });
  await writeFile('./usersDB.json', JSON.stringify(users, null, 2));
  await writeFile('./sessionsDB.json', JSON.stringify(sessions, null, 2));

  res.redirect(`http://localhost:5500/client/callback.html?sid=${sessionId}`);
  return res.end();
});

app.get('/session-cookie', async (req, res) => {
  const { sid } = req.query;
  res.cookie('sid', sid, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  res.end();
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

app.post('/logout', async (req, res) => {
  const { sid } = req.cookies;
  const sessionIndex = sessions.findIndex(({ sessionId }) => sessionId === sid);
  if (sessionIndex === -1) {
    return res.status(400).json({ error: 'No active session' });
  }
  sessions.splice(sessionIndex, 1);
  await writeFile('./sessionsDB.json', JSON.stringify(sessions, null, 2));
  res.clearCookie('sid');
  res.json({ message: 'Logged out successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
