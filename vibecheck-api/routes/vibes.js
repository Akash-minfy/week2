import express from 'express';
import Vibe from '../models/Vibe.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const newVibe = await Vibe.create({
      user: req.user._id,
      vibeText: req.body.vibeText
    });
    res.status(201).json(newVibe);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// router.get('/', async (req, res) => {
//   try {
//     const vibes = await Vibe.find().populate('user', 'username');
//     res.status(200).json(vibes);
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// routes/vibes.js
router.get('/', async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  try {
    const vibes = await Vibe.find()
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('user', 'username');

    const totalVibes = await Vibe.countDocuments();

    res.status(200).json({
      success: true,
      vibes,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalVibes,
        next: totalVibes > page * limit ? { page: (parseInt(page) + 1), limit } : null,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// Like/Unlike a vibe
router.put('/:id/like', protect, async (req, res) => {
  try {
    const vibe = await Vibe.findById(req.params.id);
    if (!vibe) return res.status(404).json({ success: false, message: 'Vibe not found' });

    // Check if user already liked the vibe
    const likeIndex = vibe.likes.indexOf(req.user.id);

    if (likeIndex !== -1) {
      // User already liked, so unlike it
      vibe.likes.splice(likeIndex, 1);
    } else {
      // Add user to likes array
      vibe.likes.push(req.user.id);
    }

    await vibe.save();
    res.status(200).json({ success: true, likes: vibe.likes.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


router.delete('/:id', protect, async (req, res) => {
  try {
    const vibe = await Vibe.findById(req.params.id);
    if (!vibe) return res.status(404).json({ success: false, message: 'Vibe not found' });

    if (vibe.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this vibe' });
    }

    await vibe.deleteOne();
    res.status(200).json({ success: true, message: 'Vibe deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
