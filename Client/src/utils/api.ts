// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Check if we're in production
const isProduction = import.meta.env.PROD;

// API response interfaces
export interface ApiResponse<T = any> {
  message: string;
  data?: T;
  error?: string;
  details?: any[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  temperatureUnit: 'C' | 'F';
  lastLogin?: string;
  createdAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Token management
export const getToken = (): string | null => {
  return localStorage.getItem('weatherpro_token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('weatherpro_token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('weatherpro_token');
};

// Base API request function
const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    // Handle network errors
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Enhanced error logging for production debugging
    if (isProduction) {
      console.error('API request failed:', {
        endpoint,
        url,
        error: error instanceof Error ? error.message : error
      });
    } else {
      console.error('API request failed:', error);
    }
    throw error;
  }
};

// Authentication API calls
export const authApi = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<AuthResponse> => {
    const response = await apiRequest<{ user: User; token: string; message: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    const raw: any = response as any;
    const payload: any = (raw && typeof raw === 'object' && 'data' in raw && raw.data) ? raw.data : raw;
    if (!payload || typeof payload !== 'object' || !('user' in payload) || !('token' in payload)) {
      const msg = (payload && (payload.message || payload.error)) || response.message || 'Registration failed';
      throw new Error(msg);
    }

    const authResponse: AuthResponse = { user: payload.user as User, token: payload.token as string };
    setToken(authResponse.token);
    return authResponse;
  },

  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await apiRequest<{ user: User; token: string; message: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    const raw: any = response as any;
    const payload: any = (raw && typeof raw === 'object' && 'data' in raw && raw.data) ? raw.data : raw;
    if (!payload || typeof payload !== 'object' || !('user' in payload) || !('token' in payload)) {
      const msg = (payload && (payload.message || payload.error)) || response.message || 'Login failed';
      throw new Error(msg);
    }

    const authResponse: AuthResponse = { user: payload.user as User, token: payload.token as string };
    setToken(authResponse.token);
    return authResponse;
  },

  demoLogin: async (): Promise<AuthResponse> => {
    const response = await apiRequest<{ user: User; token: string; message: string }>('/auth/demo', {
      method: 'POST',
    });

    const raw: any = response as any;
    const payload: any = (raw && typeof raw === 'object' && 'data' in raw && raw.data) ? raw.data : raw;
    if (!payload || typeof payload !== 'object' || !('user' in payload) || !('token' in payload)) {
      const msg = (payload && (payload.message || payload.error)) || response.message || 'Demo login failed';
      throw new Error(msg);
    }

    const authResponse: AuthResponse = { user: payload.user as User, token: payload.token as string };
    setToken(authResponse.token);
    return authResponse;
  },

  logout: async (): Promise<void> => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } finally {
      removeToken();
    }
  },
};

// User API calls
export const userApi = {
  getProfile: async (): Promise<User> => {
    const response = await apiRequest<{ user: User }>('/user/profile');
    const payload: any = (response as any).data ?? (response as any);
    return payload.user as User;
  },

  updateProfile: async (updates: Partial<User>): Promise<User> => {
    const response = await apiRequest<{ user: User }>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    const payload: any = (response as any).data ?? (response as any);
    return payload.user as User;
  },

  changePassword: async (passwordData: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }): Promise<void> => {
    await apiRequest('/user/password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
  },

  deleteAccount: async (): Promise<void> => {
    await apiRequest('/user/account', {
      method: 'DELETE',
    });
    removeToken();
  },

  getStats: async (): Promise<any> => {
    const response = await apiRequest('/user/stats');
    return response.data;
  },

  uploadAvatar: async (avatar: string): Promise<string> => {
    const response = await apiRequest<{ avatar: string }>('/user/avatar', {
      method: 'POST',
      body: JSON.stringify({ avatar }),
    });

    const payload: any = (response as any).data ?? (response as any);
    if (!payload || !payload.avatar) {
      throw new Error(payload?.message || response.message || 'Avatar upload failed');
    }

    return payload.avatar as string;
  },

  getSettings: async () => {
    return apiRequest('/settings');
  },

  updateSettings: async (settings: any) => {
    return apiRequest('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },
};

// Weather API calls
export const weatherApi = {
  getWeatherByCity: async (city: string, units: string = 'metric') => {
    const response = await apiRequest(`/weather/city/${encodeURIComponent(city)}?units=${units}`);
    return response.data;
  },

  getWeatherByCoordinates: async (lat: number, lon: number, units: string = 'metric') => {
    const response = await apiRequest(`/weather/coordinates?lat=${lat}&lon=${lon}&units=${units}`);
    return response.data;
  },

  getForecast: async (city: string, units: string = 'metric') => {
    const response = await apiRequest(`/weather/forecast/${encodeURIComponent(city)}?units=${units}`);
    return response.data;
  },

  searchCities: async (query: string, limit: number = 5) => {
    const response = await apiRequest(`/weather/search?q=${encodeURIComponent(query)}&limit=${limit}`);
    return response.data;
  },
};

// Favorites API calls
export const favoritesApi = {
  getFavorites: async (page: number = 1, limit: number = 10) => {
    const response = await apiRequest(`/favorites?page=${page}&limit=${limit}`);
    return response.data;
  },

  addFavorite: async (favorite: {
    city: string;
    country: string;
    coordinates: { lat: number; lon: number };
    weatherData?: any;
  }) => {
    const response = await apiRequest('/favorites', {
      method: 'POST',
      body: JSON.stringify(favorite),
    });
    return response.data;
  },

  removeFavorite: async (id: string): Promise<void> => {
    await apiRequest(`/favorites/${id}`, {
      method: 'DELETE',
    });
  },

  updateFavorite: async (id: string, weatherData: any) => {
    const response = await apiRequest(`/favorites/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ weatherData }),
    });
    return response.data;
  },

  refreshFavorites: async () => {
    const response = await apiRequest('/favorites/refresh', {
      method: 'POST',
    });
    return response.data;
  },

  getFavoritesStats: async () => {
    const response = await apiRequest('/favorites/stats');
    return response.data;
  },
};

// Health check
export const healthCheck = async (): Promise<any> => {
  const response = await apiRequest('/health');
  return response.data;
};

// AI Chat API
export const aiApi = {
  chat: async (payload: { message: string; weather?: any }): Promise<string> => {
    const response = await apiRequest<{ answer: string }>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const raw: any = response as any;
    const data: any = (raw && typeof raw === 'object' && 'data' in raw && raw.data) ? raw.data : raw;
    if (!data || !data.answer) {
      throw new Error(data?.message || response.message || 'Chat failed');
    }
    return data.answer as string;
  },
};

export default {
  auth: authApi,
  user: userApi,
  weather: weatherApi,
  favorites: favoritesApi,
  ai: aiApi,
  healthCheck,
};
