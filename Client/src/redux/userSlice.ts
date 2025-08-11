import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  location?: string;
  temperatureUnit: 'C' | 'F';
  isLoggedIn: boolean;
}

interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    location?: string;
    temperatureUnit: 'C' | 'F';
  };
  token: string;
  message: string;
}

const initialState: User = {
  id: '',
  name: '',
  email: '',
  avatar: '',
  location: '',
  temperatureUnit: 'C',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (_, action: PayloadAction<Omit<User, 'isLoggedIn'> | AuthResponse>) => {
      // Handle both direct user object and AuthResponse object
      if (action.payload && typeof action.payload === 'object' && 'user' in action.payload) {
        // AuthResponse case
        return { ...action.payload.user, isLoggedIn: true };
      } else if (action.payload) {
        // Direct user object case
        return { ...action.payload, isLoggedIn: true };
      } else {
        // Fallback to initial state if payload is undefined
        return { ...initialState, isLoggedIn: false };
      }
    },
    logout: () => {
      return initialState;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;