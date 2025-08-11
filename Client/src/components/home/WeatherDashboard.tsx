import React, { useEffect, useState } from 'react';
import { MapPin, Thermometer, Droplets, Wind, Eye, Gauge, Cloud, Sunrise, Sunset, Compass } from 'lucide-react';
import { fetchWeatherByCoords, getCurrentPosition, transformWeatherData, getWindDirection, formatTime, getPressureStatus, getVisibilityStatus, getHumidityStatus } from '../../utils/weatherApi';
import { WeatherData } from '../../redux/favoritesSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const WeatherDashboard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentLocationWeather = async () => {
      try {
        setLoading(true);
        const position = await getCurrentPosition();
        const weatherData = await fetchWeatherByCoords(
          position.coords.latitude,
          position.coords.longitude
        );
        setWeather(transformWeatherData(weatherData));
      } catch (err) {
        setError('Unable to fetch weather data for your location');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentLocationWeather();
  }, []);

  if (loading) {
    return (
      <section className="py-12 lg:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <LoadingSpinner size="lg" text="Fetching your local weather..." />
          </div>
        </div>
      </section>
    );
  }

  if (error || !weather) {
    return (
      <section className="py-12 lg:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12 animate-fade-in">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Detailed Weather Information
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive weather data for your current location
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Weather Card */}
          <div className="card p-6 lg:p-8 mb-6 lg:mb-8 animate-scale-in">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4 lg:space-x-6">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                  alt={weather.description}
                  className="w-20 h-20 lg:w-24 lg:h-24"
                />
                <div className="text-center lg:text-left">
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                    {weather.temperature}°C
                  </h3>
                  <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 capitalize">
                    {weather.description}
                  </p>
                  <div className="flex items-center justify-center lg:justify-start text-gray-500 dark:text-gray-400 mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{weather.city}, {weather.country}</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start text-gray-500 dark:text-gray-400 mt-1">
                    <Compass className="h-3 w-3 mr-1" />
                    <span className="text-sm">{weather.coordinates.lat.toFixed(2)}°, {weather.coordinates.lon.toFixed(2)}°</span>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-lg text-gray-600 dark:text-gray-400">
                  Feels like <span className="font-semibold">{weather.feelsLike}°C</span>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {/* Temperature & Feel */}
            <div className="card p-4 lg:p-6 animate-scale-in stagger-1">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Thermometer className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Temperature</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {weather.temperature}°C
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Feels like {weather.feelsLike}°C
                  </p>
                </div>
              </div>
            </div>

            {/* Humidity */}
            <div className="card p-4 lg:p-6 animate-scale-in stagger-2">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Humidity</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {weather.humidity}%
                  </p>
                  <p className="text-xs text-blue-600">
                    {getHumidityStatus(weather.humidity)}
                  </p>
                </div>
              </div>
            </div>

            {/* Wind */}
            <div className="card p-4 lg:p-6 animate-scale-in stagger-3">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Wind className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Wind Speed</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {weather.windSpeed} m/s
                  </p>
                  <p className="text-xs text-green-600">
                    {getWindDirection(weather.windDirection)}
                  </p>
                </div>
              </div>
            </div>

            {/* Pressure */}
            <div className="card p-4 lg:p-6 animate-scale-in stagger-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Gauge className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pressure</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {weather.pressure} hPa
                  </p>
                  <p className="text-xs text-purple-600">
                    {getPressureStatus(weather.pressure)}
                  </p>
                </div>
              </div>
            </div>

            {/* Visibility */}
            <div className="card p-4 lg:p-6 animate-scale-in stagger-5">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                  <Eye className="h-6 w-6 text-cyan-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Visibility</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {weather.visibility} km
                  </p>
                  <p className="text-xs text-cyan-600">
                    {getVisibilityStatus(weather.visibility)}
                  </p>
                </div>
              </div>
            </div>

            {/* Cloudiness */}
            <div className="card p-4 lg:p-6 animate-scale-in stagger-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Cloud className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Cloudiness</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {weather.cloudiness}%
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Sky coverage
                  </p>
                </div>
              </div>
            </div>

            {/* Sunrise */}
            <div className="card p-4 lg:p-6 animate-scale-in stagger-7">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <Sunrise className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sunrise</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {formatTime(weather.sunrise, weather.timezone)}
                  </p>
                  <p className="text-xs text-yellow-600">
                    Local time
                  </p>
                </div>
              </div>
            </div>

            {/* Sunset */}
            <div className="card p-4 lg:p-6 animate-scale-in stagger-8">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Sunset className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sunset</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {formatTime(weather.sunset, weather.timezone)}
                  </p>
                  <p className="text-xs text-orange-600">
                    Local time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherDashboard;