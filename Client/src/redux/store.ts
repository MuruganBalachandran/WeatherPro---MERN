import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import favoritesSlice from './favoritesSlice';
import themeSlice from './themeSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    favorites: favoritesSlice,
    theme: themeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;