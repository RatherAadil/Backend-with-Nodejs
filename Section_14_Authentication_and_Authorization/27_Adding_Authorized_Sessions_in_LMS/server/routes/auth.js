import express from 'express';
import User from '../models/User.js';
import Session from '../models/Session.js';
import Cart from '../models/Cart.js';

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      email,
      password,
      name,
    });
    await user.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const sessionId = req.signedCookies.sId;
  try {
    const { email, password } = req.body;

    if (!sessionId)
      return res.status(401).json({ message: 'Session not found' });

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const session = await Session.findById({ _id: sessionId });
    if (session) {
      session.userId = user.id;
      session.expires = Math.round(Date.now() / 1000 + 60 * 60 * 24 * 30);
      await session.save();

      res.cookie('sId', session.id, {
        httpOnly: true,
        signed: true,
        maxAge: 60 * 60 * 24 * 30 * 1000,
      });

      return res.json({ message: 'Login successful' });
    }
    const newSession = await Session.create({ userId: user._id });
    res.cookie('sId', newSession.id, {
      httpOnly: true,
      signed: true,
      maxAge: 60 * 60 * 24 * 30 * 1000,
    });
    return res.json({
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/logout', (req, res) => {});

router.get('/profile', async (req, res) => {
  try {
    const sessionId = req.signedCookies.sId;
    const userSession = await Session.findById({ _id: sessionId });
    if (!userSession || !userSession.userId) {
      return res.status(404).json({ message: 'User not logged in' });
    }
    const user = await User.findById({ _id: userSession.userId });

    return res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
