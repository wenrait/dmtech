import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skillfactory-task.detmir.team',
    credentials: 'include',
  }),
  endpoints: ({ query, mutation }) => ({
    getCart: query<unknown, unknown>({
      query: () => ({
        url: `/cart`,
        method: 'GET',
      }),
    }),
    updateCart: mutation<void, { data: { id: string; quantity: number }[] }>({
      query: (cartData) => ({
        url: `/cart/update`,
        method: 'POST',
        body: cartData,
      }),
    }),
    submitCart: mutation<void, unknown>({
      query: (cartData) => ({
        url: `/cart/submit`,
        method: 'POST',
        body: cartData,
      }),
    }),
  }),
});

export const { useGetCartQuery, useUpdateCartMutation, useSubmitCartMutation } =
  cartApi;
