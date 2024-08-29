import { IOrderInfo } from '../../types/types.ts';
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
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(
        (item) => item.product.id !== action.payload,
      );
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addNewProduct, deleteProduct, clearCart } = cartSlice.actions;
