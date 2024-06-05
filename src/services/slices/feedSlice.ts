import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface FeedSliceState {
  orders: TOrder[];
  orderModalData: TOrder[];
  profileOrders: TOrder[];
  total: number | null;
  totalToday: number | null;
  loading: boolean;
  error?: string | null;
}

export const initialState: FeedSliceState = {
  orders: [],
  orderModalData: [],
  profileOrders: [],
  total: null,
  totalToday: null,
  loading: false,
  error: null
};

export const getFeedAll = createAsyncThunk('feed/getFeedAll', getFeedsApi);
export const getOrders = createAsyncThunk('order/getOrders', getOrdersApi);
export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  getOrderByNumberApi
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  selectors: {
    getFeedLoading: (state) => state.loading,
    getFeed: (state) => state.orders,
    getProfileOrders: (state) => state.profileOrders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getOrderModalData: (state) => state.orderModalData[0]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedAll.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.orders = action.payload.orders;
      })
      .addCase(getFeedAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.profileOrders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderModalData = action.payload.orders;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  getFeedLoading,
  getFeed,
  getProfileOrders,
  getTotal,
  getTotalToday,
  getOrderModalData
} = feedSlice.selectors;

export default feedSlice.reducer;
