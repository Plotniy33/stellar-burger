import { orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrderBurgerSliceState {
  order: TOrder | null;
  loading: boolean;
  error?: string | null;
}

export const initialState: OrderBurgerSliceState = {
  order: null,
  loading: false,
  error: null
};

export const getOrderBurger = createAsyncThunk(
  'user/getOrderBurger',
  orderBurgerApi
);

const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState,
  selectors: {
    getOrder: (state) => state.order,
    getLoading: (state) => state.loading
  },
  reducers: {
    closeOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderBurger.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(getOrderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { getOrder, getLoading } = orderBurgerSlice.selectors;

export const { closeOrder } = orderBurgerSlice.actions;

export default orderBurgerSlice.reducer;
