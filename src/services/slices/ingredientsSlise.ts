import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IngredientSliceState {
  data: TIngredient[];
  loading: boolean;
  error?: string | null;
}

const initialState: IngredientSliceState = {
  data: [],
  loading: false,
  error: null
};

export const getIngredientsAll = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    getIngredients: (state) => state.data,
    getLoadingIngredients: (state) => state.loading
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredientsAll.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getIngredientsAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { getIngredients, getLoadingIngredients } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
