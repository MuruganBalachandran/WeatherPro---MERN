import express from 'express';
import Settings from '../models/Settings.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Create settings for a user
router.post('/', protect, async (req, res) => {
  try {
    const settings = new Settings({ ...req.body, user: req.user.id });
    await settings.save();
    res.status(201).json(settings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get settings for the current user
router.get('/', protect, async (req, res) => {
  try {
    const settings = await Settings.findOne({ user: req.user.id });
    if (!settings) return res.status(404).json({ error: 'Settings not found' });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update settings for the current user
router.put('/', protect, async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!settings) return res.status(404).json({ error: 'Settings not found' });
    res.json(settings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete settings for the current user
router.delete('/', protect, async (req, res) => {
  try {
    const settings = await Settings.findOneAndDelete({ user: req.user.id });
    if (!settings) return res.status(404).json({ error: 'Settings not found' });
    res.json({ message: 'Settings deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; 