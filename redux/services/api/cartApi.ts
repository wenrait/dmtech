import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skillfactory-task.detmir.team',
    credentials: 'include',
  }),
  endpoints: ({ query }) => ({
    getCart: query<unknown, unknown>({
      query: () => ({
        url: `/cart`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCartQuery } = cartApi;
