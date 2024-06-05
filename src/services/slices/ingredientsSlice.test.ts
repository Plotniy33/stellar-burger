import ingredientsSlice, {
  getIngredientsAll,
  initialState
} from './ingredientsSlise';

describe('тустирование работы редьюсера "ingredientSlice"', () => {
  const actions = {
    pending: {
      type: getIngredientsAll.pending.type,
      payload: null
    },
    fulfilled: {
      type: getIngredientsAll.fulfilled.type,
      payload: { ingredients: ['', ''] }
    },
    rejected: {
      type: getIngredientsAll.rejected.type,
      error: { message: 'Some error' }
    }
  };

  it('тустирование работы экшена "getIngredientsAll/pending"', () => {
    const state = ingredientsSlice(initialState, actions.pending);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(actions.pending.payload);
  });

  it('тустирование работы экшена "getIngredientsAll/fulfilled"', () => {
    const state = ingredientsSlice(initialState, actions.fulfilled);
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(actions.fulfilled.payload);
  });

  it('тустирование работы экшена "getIngredientsAll/rejected"', () => {
    const state = ingredientsSlice(initialState, actions.rejected);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(actions.rejected.error.message);
  });
});
