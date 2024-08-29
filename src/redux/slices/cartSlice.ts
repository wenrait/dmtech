import { IOrderInfo } from '../../types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
  cart: IOrderInfo[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addNewProduct: (state, action: PayloadAction<IOrderInfo>) => {
      state.cart.push(action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addNewProduct, clearCart } = cartSlice.actions;
