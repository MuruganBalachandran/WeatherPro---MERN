import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  city: {
    type: String,
    required: [true, 'City name is required'],
    trim: true,
    maxLength: [100, 'City name cannot exceed 100 characters'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
    maxLength: [50, 'Country cannot exceed 50 characters'],
  },
  coordinates: {
    lat: {
      type: Number,
      required: [true, 'Latitude is required'],
      min: [-90, 'Latitude must be between -90 and 90'],
      max: [90, 'Latitude must be between -90 and 90'],
    },
    lon: {
      type: Number,
      required: [true, 'Longitude is required'],
      min: [-180, 'Longitude must be between -180 and 180'],
      max: [180, 'Longitude must be between -180 and 180'],
    },
  },
  weatherData: {
    temperature: Number,
    condition: String,
    icon: String,
    humidity: Number,
    windSpeed: Number,
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Compound index to ensure user can't have duplicate favorites
favoriteSchema.index({ userId: 1, city: 1, country: 1 }, { unique: true });

// Index for better query performance
favoriteSchema.index({ userId: 1, createdAt: -1 });
favoriteSchema.index({ isActive: 1 });

// Static method to find user's favorites
favoriteSchema.statics.findByUserId = function(userId) {
  return this.find({ userId, isActive: true }).sort({ createdAt: -1 });
};

// Instance method to update weather data
favoriteSchema.methods.updateWeatherData = function(weatherData) {
  this.weatherData = {
    ...weatherData,
    lastUpdated: new Date(),
  };
  return this.save();
};

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
