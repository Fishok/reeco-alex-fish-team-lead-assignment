import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '@/features/api/userApi.ts';
import authReducer from '@/features/slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});