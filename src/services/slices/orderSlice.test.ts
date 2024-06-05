import orderBurgerSlice, { getOrderBurger, initialState } from './orderSlice';

describe('тестирование работы редьюсера "orderBurgerSlice"', () => {
  const actions = {
    pending: {
      type: getOrderBurger.pending.type,
      payload: null
    },
    fulfilled: {
      type: getOrderBurger.fulfilled.type,
      payload: {
        order: ['1']
      }
    },
    rejected: {
      type: getOrderBurger.rejected.type,
      error: { message: 'Some error' }
    }
  };

  it('тестирование работы экшена "getOrderBurger/pending"', () => {
    const state = orderBurgerSlice(initialState, actions.pending);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(actions.pending.payload);
  });

  it('тестирование работы экшена "getOrderBurger/fulfilled"', () => {
    const state = orderBurgerSlice(initialState, actions.fulfilled);
    expect(state.loading).toBe(false);
    expect(state.order).toBe(actions.fulfilled.payload.order);
  });

  it('тестирование работы экшена "getOrderBurger/rejected"', () => {
    const state = orderBurgerSlice(initialState, actions.rejected);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(actions.rejected.error.message);
  });
});
