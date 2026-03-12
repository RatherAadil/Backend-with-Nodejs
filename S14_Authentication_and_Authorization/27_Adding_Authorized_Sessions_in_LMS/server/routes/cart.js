import express from 'express';
import Session from '../models/Session.js';
import { checkSession } from '../middleware/checkSession.js';

const router = express.Router();

// GET cart
router.get('/', checkSession, async (req, res) => {
  const sessionId = req.signedCookies.sId;
  try {
    const cartDetails = await Session.findOne({ _id: sessionId })
      .populate('data.cart.courseId')
      .lean();

    if (!cartDetails || !cartDetails.data?.cart) {
      return res.json([]);
    }

    const cartData = cartDetails.data.cart.map((item) => {
      return { ...item.courseId, quantity: item.quantity };
    });
    return res.status(201).json(cartData);
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

    res.status(201).json({ message: 'Course added to the cart' });
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
