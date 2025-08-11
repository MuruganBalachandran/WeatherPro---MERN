import express from 'express';
import User from '../models/User.js';
import { generateToken } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validateRegister, validateLogin, validate } from '../middleware/validation.js';

const router = express.Router();

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', validateRegister, validate, asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      error: 'Registration failed',
      message: 'User with this email already exists',
    });
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate token
  const token = generateToken(user._id);

  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      location: user.location,
      temperatureUnit: user.temperatureUnit,
    },
    token,
  });
}));

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', validateLogin, validate, asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    return res.status(401).json({
      error: 'Authentication failed',
      message: 'Invalid credentials',
    });
  }

  // Check if user is active
  if (!user.isActive) {
    return res.status(401).json({
      error: 'Authentication failed',
      message: 'Account is deactivated',
    });
  }

  // Check password
  const isMatch = await user.matchPassword(password);
  
  if (!isMatch) {
    return res.status(401).json({
      error: 'Authentication failed',
      message: 'Invalid credentials',
    });
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Generate token
  const token = generateToken(user._id);

  res.json({
    message: 'Login successful',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      location: user.location,
      temperatureUnit: user.temperatureUnit,
      lastLogin: user.lastLogin,
    },
    token,
  });
}));

// @desc    Demo login
// @route   POST /api/auth/demo
// @access  Public
router.post('/demo', asyncHandler(async (req, res) => {
  // Check if demo user exists, create if not
  let demoUser = await User.findOne({ email: 'demo@weatherpro.com' });
  
  if (!demoUser) {
    demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@weatherpro.com',
      password: 'demo123',
      location: 'New York',
    });
  }

  // Update last login
  demoUser.lastLogin = new Date();
  await demoUser.save();

  // Generate token
  const token = generateToken(demoUser._id);

  res.json({
    message: 'Demo login successful',
    user: {
      id: demoUser._id,
      name: demoUser.name,
      email: demoUser.email,
      avatar: demoUser.avatar,
      location: demoUser.location,
      temperatureUnit: demoUser.temperatureUnit,
      lastLogin: demoUser.lastLogin,
    },
    token,
  });
}));

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public (client-side token removal)
router.post('/logout', (req, res) => {
  res.json({
    message: 'Logout successful',
  });
});

export default router;
