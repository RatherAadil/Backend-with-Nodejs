import express from 'express';
import Course from '../models/Course.js';
import Session from '../models/Session.js';

const router = express.Router();

// GET all courses
router.get('/', async (req, res) => {
  let { sId } = req.signedCookies;
  try {
    const courses = await Course.find();

    const session = await Session.findById(sId);
    if (!session) {
      const guestSession = await Session.create({});
      res.cookie('sId', guestSession.id, {
        httpOnly: true,
        signed: true,
        maxAge: 60 * 60 * 24 * 30 * 1000,
      });
    }
    return res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
