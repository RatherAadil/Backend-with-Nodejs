import express from 'express';
import Course from '../models/Course.js';
import Session from '../models/Session.js';

const router = express.Router();

// GET all courses
router.get('/', async (req, res) => {
  let { sId } = req.signedCookies;
  try {
    const courses = await Course.find();
    // if (sId) {
    //   const { expires } = await Session.findById(sId);
    //   if (Date.now() / 1000 >= expires) {
    //     await Session.findByIdAndDelete(sId);
    //     sId = null;
    //   }
    // }
    if (!sId) {
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
