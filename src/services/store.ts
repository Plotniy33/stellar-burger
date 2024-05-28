import { combineReducers, configureStore } from '@reduxjs/toolkit';
import constructorSlice from './slices/constructorSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlise from './slices/ingredientsSlise';
import feedSlice from './slices/feedSlice';
import orderBurgerSlice from './slices/orderSlice';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
  constructorBurger: constructorSlice,
  ingredients: ingredientsSlise,
  feed: feedSlice,
  orderBurger: orderBurgerSlice,
  user: userSlice
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
