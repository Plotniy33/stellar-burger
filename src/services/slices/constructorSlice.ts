import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface ConstructorSliceState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

export const initialState: ConstructorSliceState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  selectors: {
    getConstructor: (state) => state.constructorItems
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    ingredientMoveUp: (state, action: PayloadAction<number>) => {
      state.constructorItems.ingredients.splice(
        action.payload,
        0,
        state.constructorItems.ingredients.splice(action.payload - 1, 1)[0]
      );
    },
    ingredientMoveDown: (state, action: PayloadAction<number>) => {
      state.constructorItems.ingredients.splice(
        action.payload,
        0,
        state.constructorItems.ingredients.splice(action.payload + 1, 1)[0]
      );
    },
    deleteIngredient: (state, action) => {
      state.constructorItems.ingredients.splice(action.payload, 1);
    },
    clearIngredients: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    }
  }
});

export const { getConstructor } = constructorSlice.selectors;

export const {
  addIngredient,
  deleteIngredient,
  ingredientMoveUp,
  ingredientMoveDown,
  clearIngredients
} = constructorSlice.actions;

export default constructorSlice.reducer;
