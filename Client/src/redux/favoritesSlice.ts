import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { favoritesApi } from '../utils/api';

export interface WeatherData {
  id: string;
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  cloudiness: number;
  visibility: number;
  icon: string;
  description: string;
  sunrise: number;
  sunset: number;
  coordinates: {
    lat: number;
    lon: number;
  };
  timezone: number;
  timestamp: number;
}

interface FavoritesState {
  cities: WeatherData[];
  filter: 'all' | 'temperature' | 'condition' | 'alphabetical';
  loading: boolean;
  error: string | null;
}

// Async thunks for API calls
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const response = await favoritesApi.getFavorites();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch favorites');
    }
  }
);

export const addFavoriteAsync = createAsyncThunk(
  'favorites/addFavorite',
  async (favoriteData: {
    city: string;
    country: string;
    coordinates: { lat: number; lon: number };
    weatherData?: any;
  }, { rejectWithValue }) => {
    try {
      const response = await favoritesApi.addFavorite(favoriteData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add favorite');
    }
  }
);

export const removeFavoriteAsync = createAsyncThunk(
  'favorites/removeFavorite',
  async (favoriteId: string, { rejectWithValue }) => {
    try {
      await favoritesApi.removeFavorite(favoriteId);
      return favoriteId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to remove favorite');
    }
  }
);

// Helper function to convert server favorite to WeatherData
const convertServerFavoriteToWeatherData = (serverFavorite: any): WeatherData => {
  return {
    id: serverFavorite._id,
    city: serverFavorite.city,
    country: serverFavorite.country,
    temperature: serverFavorite.weatherData?.temperature || 0,
    feelsLike: serverFavorite.weatherData?.feelsLike || 0,
    condition: serverFavorite.weatherData?.condition || 'Unknown',
    humidity: serverFavorite.weatherData?.humidity || 0,
    pressure: serverFavorite.weatherData?.pressure || 0,
    windSpeed: serverFavorite.weatherData?.windSpeed || 0,
    windDirection: serverFavorite.weatherData?.windDirection || 0,
    cloudiness: serverFavorite.weatherData?.cloudiness || 0,
    visibility: serverFavorite.weatherData?.visibility || 0,
    icon: serverFavorite.weatherData?.icon || '01d',
    description: serverFavorite.weatherData?.description || 'Clear',
    sunrise: serverFavorite.weatherData?.sunrise || 0,
    sunset: serverFavorite.weatherData?.sunset || 0,
    coordinates: serverFavorite.coordinates,
    timezone: serverFavorite.weatherData?.timezone || 0,
    timestamp: new Date(serverFavorite.weatherData?.lastUpdated || Date.now()).getTime(),
  };
};

const initialState: FavoritesState = {
  cities: [],
  filter: 'all',
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Synchronous actions for local state management
    addFavorite: (state, action: PayloadAction<WeatherData>) => {
      const exists = state.cities.find(city => city.id === action.payload.id);
      if (!exists) {
        state.cities.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter(city => city.id !== action.payload);
    },
    updateFavorite: (state, action: PayloadAction<WeatherData>) => {
      const index = state.cities.findIndex(city => city.id === action.payload.id);
      if (index !== -1) {
        state.cities[index] = action.payload;
      }
    },
    setFilter: (state, action: PayloadAction<FavoritesState['filter']>) => {
      state.filter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearFavorites: (state) => {
      state.cities = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch favorites
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload.map(convertServerFavoriteToWeatherData);
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
    
    // Add favorite
    builder
      .addCase(addFavoriteAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavoriteAsync.fulfilled, (state, action) => {
        state.loading = false;
        const newFavorite = convertServerFavoriteToWeatherData(action.payload);
        const exists = state.cities.find(city => city.id === newFavorite.id);
        if (!exists) {
          state.cities.push(newFavorite);
        }
      })
      .addCase(addFavoriteAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
    
    // Remove favorite
    builder
      .addCase(removeFavoriteAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavoriteAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = state.cities.filter(city => city.id !== action.payload);
      })
      .addCase(removeFavoriteAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addFavorite, removeFavorite, updateFavorite, setFilter, clearError, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;