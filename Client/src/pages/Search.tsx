import React, { useState } from 'react';
import { CloudOff } from 'lucide-react';
import SearchBar from '../components/search/SearchBar';
import DetailedWeatherView from '../components/search/DetailedWeatherView';
import { fetchWeatherByCity, transformWeatherData } from '../utils/weatherApi';
import { WeatherData } from '../redux/favoritesSlice';

const Search: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      
      const data = await fetchWeatherByCity(query);
      const transformedData = transformWeatherData(data);
      setWeatherData(transformedData);
    } catch (err) {
      setError('City not found. Please check the spelling and try again.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSearch = () => {
    setWeatherData(null);
    setHasSearched(false);
    setError(null);
  };

  if (weatherData) {
    return (
      <DetailedWeatherView 
        weather={weatherData} 
        onBack={handleBackToSearch}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12 animate-fade-in">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Search Weather
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find current weather conditions for any city around the world
          </p>
        </div>

        <div className="mb-8 lg:mb-12 animate-slide-in-up">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Search Results */}
        <div className="max-w-6xl mx-auto">
          {loading && (
            <div className="text-center py-12 animate-fade-in">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Searching...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12 animate-scale-in">
              <CloudOff className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setHasSearched(false);
                }}
                className="mt-4 btn-primary"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && !hasSearched && (
            <div className="text-center py-12 animate-scale-in">
              <div className="max-w-md mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Ready to explore?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Enter a city name above to get started with your weather search.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600">100K+</div>
                      <div className="text-gray-500">Cities Available</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary-600">Real-time</div>
                      <div className="text-gray-500">Updates</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;