import express from 'express';
import Session from '../models/Session.js';
import { checkSession } from '../middleware/checkSession.js';
import Cart from '../models/Cart.js';
const router = express.Router();

// GET cart
router.get('/', checkSession, async (req, res) => {
  const sessionId = req.signedCookies.sId;
  try {
    const session = await Session.findOne({ _id: sessionId })
      .populate('data.cart.courseId')
      .lean();
    if (!session) {
      return res.json([]);
    }
    if (!session.userId) {
      const cartCourses = session.data.cart.map((item) => {
        return { ...item.courseId, quantity: item.quantity };
      });
      console.log(cartCourses);
      return res.status(201).json(cartCourses);
    }

    const cart = await Cart.findOne({ userId: session.userId })
      .populate('courses.courseId')
      .lean();
    const cartCourses = cart.courses.map((course) => {
      return { ...course.courseId, quantity: course.quantity };
    });

    return res.status(201).json(cartCourses);
  } catch (err) {
    console.log(err);
  }
});

// Add to cart
router.post('/', checkSession, async (req, res) => {
  const sessionId = req.signedCookies.sId;
  const courseId = req.body.courseId;
  try {
    if (!courseId) {
      return res.status(400).json({ error: 'courseId not included.' });
    }

    const session = await Session.findById(sessionId);

    if (session.userId) {
      const result = await Cart.updateOne(
        {
          userId: session.userId,
          'courses.courseId': courseId,
        },
        {
          $inc: { 'courses.$.quantity': 1 },
        },
      );
      if (result.matchedCount === 0) {
        await Cart.updateOne(
          { userId: session.userId },
          {
            $push: {
              courses: { courseId, quantity: 1 },
            },
          },
        );
      }
      return res.status(201).json({ message: 'Course added to the cart' });
    }

    const result = await Session.updateOne(
      {
        _id: sessionId,
        'data.cart.courseId': courseId,
      },
      {
        $inc: { 'data.cart.$.quantity': 1 },
      },
    );

    if (result.matchedCount === 0) {
      await Session.updateOne(
        { _id: sessionId },
        {
          $push: {
            'data.cart': { courseId, quantity: 1 },
          },
        },
      );
    }

    return res.status(201).json({ message: 'Course added to the cart' });
  } catch (err) {
    console.log(err);
  }
});

// Remove course from cart
router.delete('/:courseId', checkSession, async (req, res) => {
  const { courseId } = req.params;
  const sessionId = req.signedCookies.sId;

  if (!courseId) {
    return res.status(404).json({ error: 'Course ID not recieved.' });
  }
  const session = await Session.findById(sessionId);

  if (session.userId) {
    await Cart.findOneAndUpdate(
      { userId: session.userId },
      {
        $pull: {
          courses: { courseId },
        },
      },
      { returnDocument: 'after' },
    );

    return res
      .status(200)
      .json({ message: 'Course removed from cart successfully.' });
  }

  await Session.findByIdAndUpdate(
    sessionId,
    {
      $pull: {
        'data.cart': { courseId },
      },
    },
    { returnDocument: 'after' },
  );

  return res.status(200).json({ message: 'Course removed successfully.' });
});

// Clear cart
router.delete('/', async (req, res) => {
  //Add your code here
});

export default router;
