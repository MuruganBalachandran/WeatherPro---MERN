import React from 'react';
import { Trash2, RefreshCw, MapPin, Thermometer, Droplets, Wind, Eye, Gauge, Cloud, Sunrise, Sunset } from 'lucide-react';
import { WeatherData } from '../../redux/favoritesSlice';
import { useDispatch } from 'react-redux';
import { removeFavorite, updateFavorite } from '../../redux/favoritesSlice';
import { fetchWeatherByCity, transformWeatherData, getWindDirection, formatTime, getPressureStatus, getVisibilityStatus, getHumidityStatus } from '../../utils/weatherApi';

interface FavoriteCardProps {
  weather: WeatherData;
  onViewDetails?: (weather: WeatherData) => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({ weather, onViewDetails }) => {
  const dispatch = useDispatch();
  const [updating, setUpdating] = React.useState(false);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeFavorite(weather.id));
  };

  const handleRefresh = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setUpdating(true);
      const updatedData = await fetchWeatherByCity(weather.city);
      dispatch(updateFavorite(transformWeatherData(updatedData)));
    } catch (error) {
      console.error('Failed to update weather data:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(weather);
    }
  };

  const timeSinceUpdate = Math.floor((Date.now() - weather.timestamp) / (1000 * 60));

  return (
    <div 
      className="card p-4 lg:p-6 hover:shadow-xl transition-all duration-300 animate-scale-in cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            className="w-12 h-12 lg:w-16 lg:h-16"
          />
          <div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
              {weather.city}
            </h3>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{weather.country}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleRefresh}
            disabled={updating}
            className="p-2 text-gray-400 hover:text-blue-500 transition-colors transform hover:scale-110"
            title="Refresh data"
          >
            <RefreshCw className={`h-4 w-4 ${updating ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleRemove}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors transform hover:scale-110"
            title="Remove from favorites"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Temperature */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            {weather.temperature}°C
          </div>
          <div className="text-right">
            <div className="text-gray-600 dark:text-gray-400 capitalize text-sm lg:text-base">
              {weather.description}
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-xs">
              Feels like {weather.feelsLike}°C
            </div>
          </div>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <Droplets className="h-4 w-4 text-blue-500 mx-auto mb-1" />
          <div className="text-xs text-gray-600 dark:text-gray-400">Humidity</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">{weather.humidity}%</div>
          <div className="text-xs text-blue-500">{getHumidityStatus(weather.humidity)}</div>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <Wind className="h-4 w-4 text-green-500 mx-auto mb-1" />
          <div className="text-xs text-gray-600 dark:text-gray-400">Wind</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">{weather.windSpeed} m/s</div>
          <div className="text-xs text-green-500">{getWindDirection(weather.windDirection)}</div>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <Gauge className="h-4 w-4 text-purple-500 mx-auto mb-1" />
          <div className="text-xs text-gray-600 dark:text-gray-400">Pressure</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">{weather.pressure} hPa</div>
          <div className="text-xs text-purple-500">{getPressureStatus(weather.pressure)}</div>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <Eye className="h-4 w-4 text-cyan-500 mx-auto mb-1" />
          <div className="text-xs text-gray-600 dark:text-gray-400">Visibility</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">{weather.visibility} km</div>
          <div className="text-xs text-cyan-500">{getVisibilityStatus(weather.visibility)}</div>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <Cloud className="h-4 w-4 text-gray-500 mx-auto mb-1" />
          <div className="text-xs text-gray-600 dark:text-gray-400">Cloudiness</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">{weather.cloudiness}%</div>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <Sunrise className="h-4 w-4 text-yellow-500 mx-auto mb-1" />
          <div className="text-xs text-gray-600 dark:text-gray-400">Sunrise</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            {formatTime(weather.sunrise, weather.timezone)}
          </div>
        </div>
      </div>

      {/* Update Time */}
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-3 border-t border-gray-200 dark:border-gray-700">
        Updated {timeSinceUpdate} minutes ago • Click for details
      </div>
    </div>
  );
};

export default FavoriteCard;