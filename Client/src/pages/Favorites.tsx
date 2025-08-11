import React, { useState, useEffect } from 'react';
import { Heart, Plus, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import FavoriteCard from '../components/favorites/FavoriteCard';
import FilterBar from '../components/favorites/FilterBar';
import DetailedWeatherView from '../components/search/DetailedWeatherView';
import { WeatherData, fetchFavorites } from '../redux/favoritesSlice';

const Favorites: React.FC = () => {
  const dispatch = useDispatch();
  const { cities, filter, loading } = useSelector((state: RootState) => state.favorites);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const [selectedWeather, setSelectedWeather] = useState<WeatherData | null>(null);

  // Load favorites from server when user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchFavorites() as any);
    }
  }, [isLoggedIn, dispatch]);

  const getSortedCities = () => {
    switch (filter) {
      case 'temperature':
        return [...cities].sort((a, b) => b.temperature - a.temperature);
      case 'alphabetical':
        return [...cities].sort((a, b) => a.city.localeCompare(b.city));
      case 'condition':
        return [...cities].sort((a, b) => a.condition.localeCompare(b.condition));
      default:
        return cities;
    }
  };

  const sortedCities = getSortedCities();

  const handleViewDetails = (weather: WeatherData) => {
    setSelectedWeather(weather);
  };

  const handleBackToFavorites = () => {
    setSelectedWeather(null);
  };

  // Show login prompt if not authenticated
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              My Favorites
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Keep track of weather in your favorite cities
            </p>
          </div>

          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <Lock className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Login Required
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  You need to be logged in to view and manage your favorite cities.
                </p>
                <Link
                  to="/login"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>Login to Continue</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedWeather) {
    return (
      <DetailedWeatherView 
        weather={selectedWeather} 
        onBack={handleBackToFavorites}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Favorites
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Keep track of weather in your favorite cities
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">Loading your favorites...</p>
          </div>
        ) : cities.length > 0 ? (
          <>
            <FilterBar />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedCities.map((weather) => (
                <FavoriteCard 
                  key={weather.id} 
                  weather={weather} 
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <Heart className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  No Favorites Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Start adding cities to your favorites to keep track of their weather conditions.
                </p>
                <Link
                  to="/search"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Your First City</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;