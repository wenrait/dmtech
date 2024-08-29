import { Action, configureStore, ThunkDispatch } from '@reduxjs/toolkit/react';
import { productsApi } from '@api/productsApi.ts';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { paginationSlice } from './slices/paginationSlice.ts';
import { useDispatch } from 'react-redux';
import { cartSlice } from './slices/cartSlice.ts';
import { cartApi } from '@api/cartApi.ts';
import { ordersApi } from '@api/ordersApi.ts';
import { scrollSlice } from './slices/scrollSlice.ts';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    paginationReducer: paginationSlice.reducer,
    cartReducer: cartSlice.reducer,
    scrollReducer: scrollSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(cartApi.middleware)
      .concat(ordersApi.middleware),
});

setupListeners(store.dispatch as ThunkDispatch<unknown, unknown, Action>);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
