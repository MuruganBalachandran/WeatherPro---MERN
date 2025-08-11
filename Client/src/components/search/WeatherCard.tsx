import React from 'react';
import { Heart, MapPin, Thermometer, Droplets, Wind, Eye, Gauge, Cloud, Sunrise, Sunset, Compass, ExternalLink } from 'lucide-react';
import { WeatherData } from '../../redux/favoritesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { addFavorite, removeFavorite } from '../../redux/favoritesSlice';
import { getWindDirection, formatTime, getPressureStatus, getVisibilityStatus, getHumidityStatus } from '../../utils/weatherApi';

interface WeatherCardProps {
  weather: WeatherData;
  onViewDetails?: (weather: WeatherData) => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onViewDetails }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.cities);
  const isFavorite = favorites.some(city => city.id === weather.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(weather.id));
    } else {
      dispatch(addFavorite(weather));
    }
  };

  return (
    <div className="card p-4 lg:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in relative group">
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
        <button
          onClick={handleToggleFavorite}
          className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${
            isFavorite
              ? 'text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30'
              : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
          }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Main Temperature */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              {weather.temperature}°C
            </div>
            <div className="text-gray-600 dark:text-gray-400 capitalize">
              {weather.description}
            </div>
          </div>
          <div className="text-right text-sm text-gray-500 dark:text-gray-400">
            <div>Feels like {weather.feelsLike}°C</div>
          </div>
        </div>
      </div>

      {/* Primary Weather Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
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
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Cloud className="h-4 w-4 text-gray-500" />
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Cloudiness</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">{weather.cloudiness}%</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Compass className="h-4 w-4 text-gray-500" />
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Coordinates</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {weather.coordinates.lat.toFixed(1)}°, {weather.coordinates.lon.toFixed(1)}°
            </div>
          </div>
        </div>
      </div>

      {/* Sun Times */}
      <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Sunrise className="h-4 w-4 text-yellow-500" />
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Sunrise</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {formatTime(weather.sunrise, weather.timezone)}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Sunset className="h-4 w-4 text-orange-500" />
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Sunset</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {formatTime(weather.sunset, weather.timezone)}
            </div>
          </div>
        </div>
      </div>

      {/* View Details Button */}
      {onViewDetails && (
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => onViewDetails(weather)}
            className="w-full btn-primary flex items-center justify-center space-x-2 py-2 text-sm"
          >
            <ExternalLink className="h-4 w-4" />
            <span>View All Details</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;