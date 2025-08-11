import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validateProfileUpdate, validatePasswordChange, validate } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
router.get('/profile', asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  if (!user) {
    return res.status(404).json({
      error: 'User not found',
      message: 'User profile not found',
    });
  }

  res.json({
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        location: user.location,
        temperatureUnit: user.temperatureUnit,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
    },
  });
}));

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
router.put('/profile', validateProfileUpdate, validate, asyncHandler(async (req, res) => {
  console.log('Profile update request body:', req.body);
  const { name, location, temperatureUnit, avatar } = req.body;

  const user = await User.findById(req.user.id);
  
  if (!user) {
    return res.status(404).json({
      error: 'User not found',
      message: 'User profile not found',
    });
  }

  // Update fields if provided
  if (name !== undefined) user.name = name;
  if (location !== undefined) user.location = location;
  if (temperatureUnit !== undefined) user.temperatureUnit = temperatureUnit;
  if (avatar !== undefined) user.avatar = avatar;

  console.log('Updated user data:', {
    name: user.name,
    location: user.location,
    temperatureUnit: user.temperatureUnit,
    avatar: user.avatar
  });

  const updatedUser = await user.save();

  res.json({
    message: 'Profile updated successfully',
    data: {
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        location: updatedUser.location,
        temperatureUnit: updatedUser.temperatureUnit,
        lastLogin: updatedUser.lastLogin,
        createdAt: updatedUser.createdAt,
      },
    },
  });
}));

// @desc    Change password
// @route   PUT /api/user/password
// @access  Private
router.put('/password', validatePasswordChange, validate, asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select('+password');
  
  if (!user) {
    return res.status(404).json({
      error: 'User not found',
      message: 'User profile not found',
    });
  }

  // Check current password
  const isMatch = await user.matchPassword(currentPassword);
  
  if (!isMatch) {
    return res.status(400).json({
      error: 'Password change failed',
      message: 'Current password is incorrect',
    });
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.json({
    message: 'Password changed successfully',
  });
}));

// @desc    Delete user account
// @route   DELETE /api/user/account
// @access  Private
router.delete('/account', asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  if (!user) {
    return res.status(404).json({
      error: 'User not found',
      message: 'User account not found',
    });
  }

  // Soft delete - deactivate account
  user.isActive = false;
  await user.save();

  res.json({
    message: 'Account deactivated successfully',
  });
}));

// @desc    Get user statistics
// @route   GET /api/user/stats
// @access  Private
router.get('/stats', asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate('favorites');
  
  if (!user) {
    return res.status(404).json({
      error: 'User not found',
      message: 'User profile not found',
    });
  }

  const stats = {
    accountAge: Math.floor((Date.now() - user.createdAt) / (1000 * 60 * 60 * 24)), // days
    favoriteLocations: user.favorites?.length || 0,
    lastLoginDays: user.lastLogin 
      ? Math.floor((Date.now() - user.lastLogin) / (1000 * 60 * 60 * 24))
      : null,
    temperatureUnit: user.temperatureUnit,
  };

  res.json({
    stats,
  });
}));

// Upload or update profile avatar
router.post('/avatar', protect, async (req, res) => {
  try {
    const { avatar } = req.body;
    if (!avatar) {
      return res.status(400).json({ 
        error: 'Avatar upload failed',
        message: 'No avatar provided' 
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User profile not found',
      });
    }

    user.avatar = avatar;
    await user.save();

    res.json({
      message: 'Avatar updated successfully',
      data: {
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error('Avatar upload error:', err);
    res.status(500).json({ 
      error: 'Avatar upload failed',
      message: 'Failed to update avatar. Please try again.' 
    });
  }
});

export default router;
