import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import analyticsReducer from './slices/analyticsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    analytics: analyticsReducer,
  },
});