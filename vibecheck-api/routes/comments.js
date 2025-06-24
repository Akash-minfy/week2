import express from 'express';
import Comment from '../models/Comment.js';
import Vibe from '../models/Vibe.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Post a comment
router.post('/:id/comments', protect, async (req, res) => {
  const { commentText } = req.body;
  try {
    const { id} = req.params;
    const vibe = await Vibe.findById(id);
    console.log(id)
    if (!vibe) return res.status(404).json({ success: false, message: 'Vibe not found' });

    const comment = new Comment({
      user: req.user.id,
      vibe: vibe._id,
      commentText,
    });

    await comment.save();
    res.status(201).json({ success: true, comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all comments for a vibe
router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ vibe: req.params.id }).populate('user', 'username');
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
