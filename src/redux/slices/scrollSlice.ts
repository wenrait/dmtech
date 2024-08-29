import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PaginationState {
  limit: number;
  page: number;
  position: number;
}

const initialState: PaginationState = {
  limit: 10,
  page: 1,
  position: 0,
};

export const scrollSlice = createSlice({
  name: 'scrollSlice',
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPosition: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setLimit, setPage, setPosition } = scrollSlice.actions;
