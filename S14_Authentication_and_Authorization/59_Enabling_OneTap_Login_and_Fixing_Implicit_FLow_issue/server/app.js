import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { writeFile } from 'fs/promises';
import {
  // fetchUserFromGoogle,
  // generateGoogleAuthUrl,
  verifyIdToken,
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

// 1.Generate AuthURL and Redirect
app.post('/auth/google', async (req, res) => {
  const { idToken } = req.body;
  if (idToken) {
    const { name, email, sub, picture } = await verifyIdToken(idToken);

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

      res.cookie('sid', sessionId, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      return res.end();
    }
    users.push(newUser);
    const sessionId = crypto.randomUUID();
    sessions.push({ sessionId, userId: sub });
    await writeFile('./usersDB.json', JSON.stringify(users, null, 2));
    await writeFile('./sessionsDB.json', JSON.stringify(sessions, null, 2));

    res.cookie('sid', sessionId, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    return res.end();
  } else {
    res.redirect(`http://localhost:5500/client/callback.html?error='true'`);
    return res.end();
  }
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
