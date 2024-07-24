import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PaginationState {
  limit: number;
  page: number;
}

const initialState: PaginationState = {
  limit: 10,
  page: 1,
};

export const paginationSlice = createSlice({
  name: 'paginationSlice',
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setLimit, setPage } = paginationSlice.actions;
