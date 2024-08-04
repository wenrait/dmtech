import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './services/api/productsApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { paginationSlice } from './slices/paginationSlice.ts';
import { useDispatch } from 'react-redux';
import { cartSlice } from './slices/cartSlice.ts';
import { cartApi } from './services/api/cartApi.ts';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    paginationReducer: paginationSlice.reducer,
    cartReducer: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
