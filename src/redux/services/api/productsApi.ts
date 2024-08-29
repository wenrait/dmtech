import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IGetProductsRes,
  IProduct,
  IProductReq,
  IProductsReq,
} from '../../../types.ts';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skillfactory-task.detmir.team',
    credentials: 'include',
  }),
  endpoints: ({ query }) => ({
    getProducts: query<IGetProductsRes, IProductsReq>({
      query: (params: IProductsReq) => ({
        url: `/products?limit=${params.limit}&page=${params.page}`,
        method: 'GET',
      }),
    }),
    getProduct: query<IProduct, IProductReq>({
      query: (params: IProductReq) => ({
        url: `/products/${params.id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
