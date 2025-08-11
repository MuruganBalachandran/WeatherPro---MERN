import express from 'express';
import Favorite from '../models/Favorite.js';
import { protect } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validateFavorite, validate } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// @desc    Get user's favorite locations
// @route   GET /api/favorites
// @access  Private
router.get('/', asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
  
  const favorites = await Favorite.find({ 
    userId: req.user.id, 
    isActive: true 
  })
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Favorite.countDocuments({ 
    userId: req.user.id, 
    isActive: true 
  });

  res.json({
    message: 'Favorites retrieved successfully',
    data: favorites,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  });
}));

// @desc    Add location to favorites
// @route   POST /api/favorites
// @access  Private
router.post('/', validateFavorite, validate, asyncHandler(async (req, res) => {
  const { city, country, coordinates, weatherData } = req.body;

  // Check if favorite already exists
  const existingFavorite = await Favorite.findOne({
    userId: req.user.id,
    city: city.trim(),
    country: country.trim(),
    isActive: true,
  });

  if (existingFavorite) {
    return res.status(400).json({
      error: 'Duplicate favorite',
      message: 'This location is already in your favorites',
    });
  }

  // Create new favorite
  const favorite = await Favorite.create({
    userId: req.user.id,
    city: city.trim(),
    country: country.trim(),
    coordinates,
    weatherData: weatherData || {},
  });

  res.status(201).json({
    message: 'Location added to favorites successfully',
    data: favorite,
  });
}));

// @desc    Get specific favorite by ID
// @route   GET /api/favorites/:id
// @access  Private
router.get('/:id', asyncHandler(async (req, res) => {
  const favorite = await Favorite.findOne({
    _id: req.params.id,
    userId: req.user.id,
    isActive: true,
  });

  if (!favorite) {
    return res.status(404).json({
      error: 'Favorite not found',
      message: 'The requested favorite location was not found',
    });
  }

  res.json({
    message: 'Favorite retrieved successfully',
    data: favorite,
  });
}));

// @desc    Update favorite location
// @route   PUT /api/favorites/:id
// @access  Private
router.put('/:id', asyncHandler(async (req, res) => {
  const { weatherData } = req.body;

  const favorite = await Favorite.findOne({
    _id: req.params.id,
    userId: req.user.id,
    isActive: true,
  });

  if (!favorite) {
    return res.status(404).json({
      error: 'Favorite not found',
      message: 'The requested favorite location was not found',
    });
  }

  // Update weather data if provided
  if (weatherData) {
    favorite.weatherData = {
      ...favorite.weatherData,
      ...weatherData,
      lastUpdated: new Date(),
    };
  }

  const updatedFavorite = await favorite.save();

  res.json({
    message: 'Favorite updated successfully',
    data: updatedFavorite,
  });
}));

// @desc    Remove location from favorites
// @route   DELETE /api/favorites/:id
// @access  Private
router.delete('/:id', asyncHandler(async (req, res) => {
  const favorite = await Favorite.findOne({
    _id: req.params.id,
    userId: req.user.id,
    isActive: true,
  });

  if (!favorite) {
    return res.status(404).json({
      error: 'Favorite not found',
      message: 'The requested favorite location was not found',
    });
  }

  // Soft delete
  favorite.isActive = false;
  await favorite.save();

  res.json({
    message: 'Location removed from favorites successfully',
  });
}));

// @desc    Update weather data for all favorites
// @route   POST /api/favorites/refresh
// @access  Private
router.post('/refresh', asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({
    userId: req.user.id,
    isActive: true,
  });

  // This endpoint could be extended to fetch fresh weather data
  // for all favorite locations using the weather API
  
  res.json({
    message: 'Favorites refresh initiated',
    data: {
      count: favorites.length,
      note: 'Weather data refresh functionality can be implemented here',
    },
  });
}));

// @desc    Get favorites statistics
// @route   GET /api/favorites/stats
// @access  Private
router.get('/stats', asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const stats = await Favorite.aggregate([
    { $match: { userId, isActive: true } },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        countries: { $addToSet: '$country' },
        oldestFavorite: { $min: '$createdAt' },
        newestFavorite: { $max: '$createdAt' },
      },
    },
  ]);

  const result = stats[0] || {
    total: 0,
    countries: [],
    oldestFavorite: null,
    newestFavorite: null,
  };

  res.json({
    message: 'Favorites statistics retrieved successfully',
    data: {
      totalFavorites: result.total,
      uniqueCountries: result.countries.length,
      countries: result.countries,
      oldestFavorite: result.oldestFavorite,
      newestFavorite: result.newestFavorite,
    },
  });
}));

export default router;
