import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './services/api/productsApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { paginationSlice } from './slices/paginationSlice.ts';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    paginationReducer: paginationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
