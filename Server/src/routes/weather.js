import express from 'express';
import axios from 'axios';
import { asyncHandler } from '../middleware/errorHandler.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// OpenWeatherMap API configuration
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Weather API request wrapper
const makeWeatherRequest = async (url) => {
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  
  if (!API_KEY || API_KEY === 'your-openweathermap-api-key-here') {
    throw new Error('OpenWeatherMap API key is not configured. Please set OPENWEATHER_API_KEY in your environment variables.');
  }

  const response = await axios.get(url);
  return response.data;
};

// Transform weather data to match client expectations
const transformWeatherData = (data) => ({
  id: data.id.toString(),
  city: data.name,
  country: data.sys.country,
  temperature: Math.round(data.main.temp),
  feelsLike: Math.round(data.main.feels_like),
  condition: data.weather[0].main,
  humidity: data.main.humidity,
  pressure: data.main.pressure,
  windSpeed: Math.round(data.wind.speed * 10) / 10,
  windDirection: data.wind.deg,
  cloudiness: data.clouds.all,
  visibility: Math.round(data.visibility / 1000), // Convert to km
  icon: data.weather[0].icon,
  description: data.weather[0].description,
  sunrise: data.sys.sunrise,
  sunset: data.sys.sunset,
  coordinates: {
    lat: data.coord.lat,
    lon: data.coord.lon,
  },
  timezone: data.timezone,
  timestamp: Date.now(),
});

// @desc    Get weather by city name
// @route   GET /api/weather/city/:city
// @access  Public
router.get('/city/:city', optionalAuth, asyncHandler(async (req, res) => {
  const { city } = req.params;
  const { units = 'metric' } = req.query;

  if (!city || city.trim().length === 0) {
    return res.status(400).json({
      error: 'Invalid request',
      message: 'City name is required',
    });
  }

  try {
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${process.env.OPENWEATHER_API_KEY}&units=${units}`;
    const data = await makeWeatherRequest(url);
    
    const transformedData = transformWeatherData(data);
    
    res.json({
      message: 'Weather data retrieved successfully',
      data: transformedData,
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({
        error: 'City not found',
        message: 'The specified city could not be found',
      });
    }
    
    if (error.response?.status === 401) {
      return res.status(500).json({
        error: 'API configuration error',
        message: 'Weather service is temporarily unavailable',
      });
    }
    
    throw error;
  }
}));

// @desc    Get weather by coordinates
// @route   GET /api/weather/coordinates
// @access  Public
router.get('/coordinates', optionalAuth, asyncHandler(async (req, res) => {
  const { lat, lon, units = 'metric' } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({
      error: 'Invalid request',
      message: 'Latitude and longitude are required',
    });
  }

  // Validate coordinates
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);
  
  if (isNaN(latitude) || isNaN(longitude) || 
      latitude < -90 || latitude > 90 || 
      longitude < -180 || longitude > 180) {
    return res.status(400).json({
      error: 'Invalid coordinates',
      message: 'Please provide valid latitude (-90 to 90) and longitude (-180 to 180)',
    });
  }

  try {
    const url = `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}&units=${units}`;
    const data = await makeWeatherRequest(url);
    
    const transformedData = transformWeatherData(data);
    
    res.json({
      message: 'Weather data retrieved successfully',
      data: transformedData,
    });
  } catch (error) {
    if (error.response?.status === 401) {
      return res.status(500).json({
        error: 'API configuration error',
        message: 'Weather service is temporarily unavailable',
      });
    }
    
    throw error;
  }
}));

// @desc    Get weather forecast (5-day)
// @route   GET /api/weather/forecast/:city
// @access  Public
router.get('/forecast/:city', optionalAuth, asyncHandler(async (req, res) => {
  const { city } = req.params;
  const { units = 'metric' } = req.query;

  if (!city || city.trim().length === 0) {
    return res.status(400).json({
      error: 'Invalid request',
      message: 'City name is required',
    });
  }

  try {
    const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${process.env.OPENWEATHER_API_KEY}&units=${units}`;
    const data = await makeWeatherRequest(url);
    
    // Transform forecast data
    const forecast = data.list.map(item => ({
      date: item.dt,
      dateString: new Date(item.dt * 1000).toISOString(),
      temperature: {
        temp: Math.round(item.main.temp),
        feelsLike: Math.round(item.main.feels_like),
        min: Math.round(item.main.temp_min),
        max: Math.round(item.main.temp_max),
      },
      weather: {
        main: item.weather[0].main,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      },
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      windSpeed: Math.round(item.wind?.speed * 10) / 10,
      cloudiness: item.clouds.all,
      visibility: item.visibility ? Math.round(item.visibility / 1000) : null,
      precipitationProbability: Math.round((item.pop || 0) * 100),
    }));

    res.json({
      message: 'Weather forecast retrieved successfully',
      data: {
        city: data.city.name,
        country: data.city.country,
        coordinates: {
          lat: data.city.coord.lat,
          lon: data.city.coord.lon,
        },
        forecast,
      },
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({
        error: 'City not found',
        message: 'The specified city could not be found',
      });
    }
    
    if (error.response?.status === 401) {
      return res.status(500).json({
        error: 'API configuration error',
        message: 'Weather service is temporarily unavailable',
      });
    }
    
    throw error;
  }
}));

// @desc    Search cities by name
// @route   GET /api/weather/search
// @access  Public
router.get('/search', optionalAuth, asyncHandler(async (req, res) => {
  const { q: query, limit = 5 } = req.query;

  if (!query || query.trim().length < 2) {
    return res.status(400).json({
      error: 'Invalid request',
      message: 'Search query must be at least 2 characters long',
    });
  }

  try {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${process.env.OPENWEATHER_API_KEY}`;
    const data = await makeWeatherRequest(url);
    
    const cities = data.map(city => ({
      name: city.name,
      country: city.country,
      state: city.state,
      coordinates: {
        lat: city.lat,
        lon: city.lon,
      },
      displayName: `${city.name}, ${city.state ? city.state + ', ' : ''}${city.country}`,
    }));

    res.json({
      message: 'Cities found successfully',
      data: cities,
    });
  } catch (error) {
    if (error.response?.status === 401) {
      return res.status(500).json({
        error: 'API configuration error',
        message: 'Weather service is temporarily unavailable',
      });
    }
    
    throw error;
  }
}));

// @desc    Get current weather conditions summary
// @route   GET /api/weather/conditions
// @access  Public
router.get('/conditions', optionalAuth, asyncHandler(async (req, res) => {
  // This could be extended to provide weather alerts, air quality, etc.
  res.json({
    message: 'Weather conditions service',
    data: {
      alerts: [],
      airQuality: null,
      uvIndex: null,
      note: 'Extended weather conditions coming soon',
    },
  });
}));

export default router;
