import React from 'react';
import { ArrowLeft, MapPin, Thermometer, Droplets, Wind, Eye, Gauge, Cloud, Sunrise, Sunset, Compass, Heart, Calendar, Clock, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { WeatherData } from '../../redux/favoritesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { addFavorite, removeFavorite, addFavoriteAsync, removeFavoriteAsync } from '../../redux/favoritesSlice';
import { getWindDirection, formatTime, getPressureStatus, getVisibilityStatus, getHumidityStatus } from '../../utils/weatherApi';
import ActivityChatbot from './ActivityChatbot';

interface DetailedWeatherViewProps {
  weather: WeatherData;
  onBack: () => void;
}

const DetailedWeatherView: React.FC<DetailedWeatherViewProps> = ({ weather, onBack }) => {
  const dispatch = useDispatch();
  const { cities: favorites } = useSelector((state: RootState) => state.favorites);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const isFavorite = favorites.some(city => city.id === weather.id);

  const handleToggleFavorite = async () => {
    if (!isLoggedIn) {
      // For non-logged in users, use local storage
      if (isFavorite) {
        dispatch(removeFavorite(weather.id));
      } else {
        dispatch(addFavorite(weather));
      }
      return;
    }

    // For logged in users, use server API
    if (isFavorite) {
      dispatch(removeFavoriteAsync(weather.id) as any);
    } else {
      dispatch(addFavoriteAsync({
        city: weather.city,
        country: weather.country,
        coordinates: weather.coordinates,
        weatherData: {
          temperature: weather.temperature,
          condition: weather.condition,
          icon: weather.icon,
          humidity: weather.humidity,
          windSpeed: weather.windSpeed,
          lastUpdated: new Date(),
        },
      }) as any);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatUpdateTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWeatherSummary = () => {
    const summary = [];
    
    // Temperature analysis
    if (weather.temperature > 30) {
      summary.push({ icon: AlertTriangle, text: `High temperature of ${weather.temperature}°C - Stay hydrated and avoid prolonged sun exposure`, type: 'warning' });
    } else if (weather.temperature < 5) {
      summary.push({ icon: AlertTriangle, text: `Low temperature of ${weather.temperature}°C - Dress warmly and be cautious of icy conditions`, type: 'warning' });
    } else {
      summary.push({ icon: CheckCircle, text: `Comfortable temperature of ${weather.temperature}°C - Perfect weather for outdoor activities`, type: 'success' });
    }

    // Humidity analysis
    if (weather.humidity > 80) {
      summary.push({ icon: Info, text: `High humidity at ${weather.humidity}% - Expect muggy conditions and slower sweat evaporation`, type: 'info' });
    } else if (weather.humidity < 30) {
      summary.push({ icon: Info, text: `Low humidity at ${weather.humidity}% - Dry air may cause skin and respiratory irritation`, type: 'info' });
    } else {
      summary.push({ icon: CheckCircle, text: `Comfortable humidity level at ${weather.humidity}% - Ideal conditions for most activities`, type: 'success' });
    }

    // Wind analysis
    if (weather.windSpeed > 10) {
      summary.push({ icon: AlertTriangle, text: `Strong winds at ${weather.windSpeed} m/s from ${getWindDirection(weather.windDirection)} - Secure loose objects`, type: 'warning' });
    } else {
      summary.push({ icon: CheckCircle, text: `Gentle winds at ${weather.windSpeed} m/s from ${getWindDirection(weather.windDirection)} - Pleasant breeze conditions`, type: 'success' });
    }

    // Visibility analysis
    if (weather.visibility < 5) {
      summary.push({ icon: AlertTriangle, text: `Reduced visibility at ${weather.visibility} km - Drive carefully and use headlights`, type: 'warning' });
    } else {
      summary.push({ icon: CheckCircle, text: `Excellent visibility at ${weather.visibility} km - Clear conditions for travel and outdoor activities`, type: 'success' });
    }

    // Pressure analysis
    const pressureStatus = getPressureStatus(weather.pressure);
    if (pressureStatus === 'Low') {
      summary.push({ icon: Info, text: `Low atmospheric pressure at ${weather.pressure} hPa - Possible weather changes ahead`, type: 'info' });
    } else if (pressureStatus === 'High') {
      summary.push({ icon: CheckCircle, text: `High atmospheric pressure at ${weather.pressure} hPa - Stable weather conditions expected`, type: 'success' });
    } else {
      summary.push({ icon: CheckCircle, text: `Normal atmospheric pressure at ${weather.pressure} hPa - Stable weather conditions`, type: 'success' });
    }

    return summary;
  };

  const weatherSummary = getWeatherSummary();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 transform hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Search</span>
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleToggleFavorite}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 ${
                  isFavorite
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gradient-primary text-white shadow-lg hover:shadow-xl'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                <span className="font-semibold">{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Weather Card */}
        <div className="card p-8 mb-8 bg-gradient-primary text-white relative overflow-hidden animate-scale-in">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8 text-center lg:text-left">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                  alt={weather.description}
                  className="w-32 h-32 lg:w-40 lg:h-40 animate-bounce-gentle drop-shadow-2xl"
                />
                <div>
                  <h1 className="text-4xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                    {weather.city}, {weather.country}
                  </h1>
                  <div className="flex items-center justify-center lg:justify-start text-blue-100 mb-3">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-lg">{weather.coordinates.lat.toFixed(4)}°, {weather.coordinates.lon.toFixed(4)}°</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start text-blue-100 mb-6">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span className="text-lg">{formatDate(weather.timestamp)}</span>
                  </div>
                  <div className="text-6xl lg:text-8xl font-bold mb-4 drop-shadow-lg">
                    {weather.temperature}°C
                  </div>
                  <div className="text-2xl lg:text-3xl capitalize mb-2 drop-shadow-md">
                    {weather.description}
                  </div>
                  <div className="text-xl text-blue-100">
                    Feels like {weather.feelsLike}°C
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <div className="flex items-center justify-center lg:justify-end text-blue-100 mb-4">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="text-lg">Last updated: {formatUpdateTime(weather.timestamp)}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-sm text-blue-100 mb-2">Weather Quality Index</div>
                  <div className="text-3xl font-bold mb-2">Excellent</div>
                  <div className="text-sm text-blue-200">Perfect conditions for outdoor activities</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Summary Section */}
        <div className="card p-8 mb-8 animate-fade-in">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-primary rounded-xl">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Weather Analysis & Recommendations</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {weatherSummary.map((item, index) => (
              <div key={index} className={`p-6 rounded-xl border-l-4 ${
                item.type === 'warning' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500' :
                item.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-500' :
                'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
              } animate-slide-in-up stagger-${index + 1}`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${
                    item.type === 'warning' ? 'bg-orange-100 dark:bg-orange-800' :
                    item.type === 'success' ? 'bg-green-100 dark:bg-green-800' :
                    'bg-blue-100 dark:bg-blue-800'
                  }`}>
                    <item.icon className={`h-5 w-5 ${
                      item.type === 'warning' ? 'text-orange-600' :
                      item.type === 'success' ? 'text-green-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Weather Grid - Full Width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-8">
          {/* Temperature Details */}
          <div className="card p-6 hover-lift animate-scale-in stagger-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-lg">
                <Thermometer className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Temperature</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Current & Feel</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Current</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{weather.temperature}°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Feels like</span>
                <span className="text-xl font-semibold text-gray-900 dark:text-white">{weather.feelsLike}°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Difference</span>
                <span className="font-semibold text-orange-600">
                  {Math.abs(weather.temperature - weather.feelsLike)}°C
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-4">
                <div 
                  className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((weather.temperature + 20) * 2, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Humidity Details */}
          <div className="card p-6 hover-lift animate-scale-in stagger-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl shadow-lg">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Humidity</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Air Moisture</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Level</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{weather.humidity}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Status</span>
                <span className="font-semibold text-blue-600">{getHumidityStatus(weather.humidity)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-4">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-cyan-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${weather.humidity}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Wind Details */}
          <div className="card p-6 hover-lift animate-scale-in stagger-3">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg">
                <Wind className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Wind</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Speed & Direction</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Speed</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{weather.windSpeed} m/s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Direction</span>
                <span className="font-semibold text-green-600">{getWindDirection(weather.windDirection)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Degrees</span>
                <span className="font-semibold text-gray-900 dark:text-white">{weather.windDirection}°</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-4">
                <div 
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(weather.windSpeed * 10, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Pressure Details */}
          <div className="card p-6 hover-lift animate-scale-in stagger-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl shadow-lg">
                <Gauge className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pressure</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Atmospheric</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Current</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{weather.pressure} hPa</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Status</span>
                <span className="font-semibold text-purple-600">{getPressureStatus(weather.pressure)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Sea Level</span>
                <span className="font-semibold text-gray-900 dark:text-white">1013 hPa</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-4">
                <div 
                  className="bg-gradient-to-r from-purple-400 to-pink-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${((weather.pressure - 950) / 100) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Visibility Details */}
          <div className="card p-6 hover-lift animate-scale-in stagger-5">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl shadow-lg">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Visibility</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Clear Distance</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Distance</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{weather.visibility} km</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Quality</span>
                <span className="font-semibold text-cyan-600">{getVisibilityStatus(weather.visibility)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-4">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(weather.visibility * 10, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="card p-8 animate-fade-in-delayed">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <Info className="h-6 w-6 mr-3 text-primary-600" />
            Additional Weather Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Location Details</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400">City</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{weather.city}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400">Country</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{weather.country}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400">Latitude</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{weather.coordinates.lat.toFixed(6)}°</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400">Longitude</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{weather.coordinates.lon.toFixed(6)}°</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Weather Condition</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400">Main</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{weather.condition}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400">Description</span>
                  <span className="font-semibold text-gray-900 dark:text-white capitalize">{weather.description}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400">Icon Code</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{weather.icon}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400">Cloudiness</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{weather.cloudiness}%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Sun & Time</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400">Sunrise</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatTime(weather.sunrise, weather.timezone)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400">Sunset</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatTime(weather.sunset, weather.timezone)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400">Timezone</span>
                  <span className="font-semibold text-gray-900 dark:text-white">UTC{weather.timezone >= 0 ? '+' : ''}{weather.timezone / 3600}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400">Data Source</span>
                  <span className="font-semibold text-gray-900 dark:text-white">OpenWeatherMap</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Chatbot - Fixed Position */}
      <ActivityChatbot weather={weather} />
    </div>
  );
};

export default DetailedWeatherView;