import { IProduct } from '../../src/types';
import { createSlice } from '@reduxjs/toolkit';

export interface CartState {
  cart: IProduct[];
}

const initialState: CartState = {
  cart: [],
};

export const CartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.cart.push(action.payload);
    },
  },
});
