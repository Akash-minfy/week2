import express from 'express';
import User from '../models/User.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Follow a user
router.post('/:id/follow', protect, async (req, res) => {
  const userId = req.params.id;

  try {
    const userToFollow = await User.findById(userId);
    if (!userToFollow) return res.status(404).json({ success: false, message: 'User not found' });

    if (req.user.id === userId) {
      return res.status(400).json({ success: false, message: 'You cannot follow yourself' });
    }

    // Add to following and followers
    req.user.following.push(userId);
    userToFollow.followers.push(req.user.id);

    await req.user.save();
    await userToFollow.save();

    res.status(200).json({ success: true, message: 'User followed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
