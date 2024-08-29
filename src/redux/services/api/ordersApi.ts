import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetOrders, IGetOrdersParams } from '../../../types/types.ts';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skillfactory-task.detmir.team',
    credentials: 'include',
  }),
  endpoints: ({ query }) => ({
    getOrders: query<IGetOrders, IGetOrdersParams>({
      query: (params: IGetOrdersParams) => ({
        url: `/orders?limit=${params.limit}&page=${params.page}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
