import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetCart, IUpdateCart } from '../../../types/types.ts';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skillfactory-task.detmir.team',
    credentials: 'include',
  }),
  endpoints: ({ query, mutation }) => ({
    getCart: query<IGetCart[], void>({
      query: () => ({
        url: `/cart`,
        method: 'GET',
      }),
    }),
    updateCart: mutation<IGetCart, IUpdateCart>({
      query: (cartData: IUpdateCart) => ({
        url: `/cart/update`,
        method: 'POST',
        body: cartData,
      }),
    }),
    submitCart: mutation<IGetCart, void>({
      query: () => ({
        url: `/cart/submit`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetCartQuery, useUpdateCartMutation, useSubmitCartMutation } =
  cartApi;
