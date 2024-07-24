import { IOrderInfo } from '../../src/types';
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
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const currentOrder = state.cart.find(
        (order) => order.product.id === action.payload,
      );
      currentOrder.quantity += 1;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const currentOrder = state.cart.find(
        (order) => order.product.id === action.payload,
      );
      currentOrder.quantity = currentOrder.quantity - 1;
      if (currentOrder.quantity < 1) {
        state.cart = state.cart.filter(
          (order) => order.product.id !== currentOrder.product.id,
        );
      }
    },
    setQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const currentOrder = state.cart.find(
        (order) => order.product.id === action.payload.id,
      );
      currentOrder.quantity = action.payload.quantity;

      if (currentOrder.quantity < 1) {
        state.cart = state.cart.filter(
          (order) => order.product.id !== currentOrder.product.id,
        );
      }

      if (currentOrder.quantity > 10) {
        currentOrder.quantity = 10;
      }

      if (currentOrder.quantity * currentOrder.product.price > 10000) {
        currentOrder.quantity = Math.floor(10000 / currentOrder.product.price);
      }
    },
  },
});

export const {
  addNewProduct,
  increaseQuantity,
  decreaseQuantity,
  setQuantity,
} = cartSlice.actions;
