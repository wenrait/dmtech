import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IProduct,
  IProductReq,
  IProductsReq,
  IProductsRes,
} from '../../../src/types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skillfactory-task.detmir.team',
    credentials: 'include',
  }),
  endpoints: ({ query }) => ({
    getProducts: query<IProductsRes, IProductsReq>({
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
