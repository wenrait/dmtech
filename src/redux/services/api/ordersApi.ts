import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skillfactory-task.detmir.team',
    credentials: 'include',
  }),
  endpoints: ({ query }) => ({
    getOrders: query<unknown, unknown>({
      query: (params) => ({
        url: `/orders?limit=${params.limit}&page=${params.page}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
