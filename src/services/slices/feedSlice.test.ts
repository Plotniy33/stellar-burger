import feedSlice, {
  getFeedAll,
  getOrderByNumber,
  getOrders,
  initialState
} from './feedSlice';

describe('тестирование работы редьюсера "feedSlice"', () => {
  describe('тестирование работы экшена "getFeedAll"', () => {
    const actions = {
      pending: {
        type: getFeedAll.pending.type,
        payload: null
      },
      fulfilled: {
        type: getFeedAll.fulfilled.type,
        payload: {
          orders: ['', ''],
          total: 1,
          totalToday: 1
        }
      },
      rejected: {
        type: getFeedAll.rejected.type,
        error: { message: 'Some error' }
      }
    };

    it('тестирование работы экшена "pending"', () => {
      const state = feedSlice(initialState, actions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(actions.pending.payload);
    });

    it('тестирование работы экшена "fulfilled"', () => {
      const state = feedSlice(initialState, actions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(actions.fulfilled.payload.orders);
      expect(state.total).toEqual(actions.fulfilled.payload.total);
      expect(state.totalToday).toEqual(actions.fulfilled.payload.totalToday);
    });

    it('тестирование работы экшена "rejected"', () => {
      const state = feedSlice(initialState, actions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
    });
  });

  describe('тестирование работы экшена "getOrders"', () => {
    const actions = {
      pending: {
        type: getOrders.pending.type,
        payload: null
      },
      fulfilled: {
        type: getOrders.fulfilled.type,
        payload: {
          profileOrders: ['', '']
        }
      },
      rejected: {
        type: getOrders.rejected.type,
        error: { message: 'Some error' }
      }
    };

    it('тестирование работы экшена "pending"', () => {
      const state = feedSlice(initialState, actions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(actions.pending.payload);
    });

    it('тестирование работы экшена "fulfilled"', () => {
      const state = feedSlice(initialState, actions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.profileOrders).toEqual(actions.fulfilled.payload);
    });

    it('тестирование работы экшена "rejected"', () => {
      const state = feedSlice(initialState, actions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
    });
  });

  describe('тестирование работы экшена "getOrderByNumber"', () => {
    const actions = {
      pending: {
        type: getOrderByNumber.pending.type,
        payload: null
      },
      fulfilled: {
        type: getOrderByNumber.fulfilled.type,
        payload: {
          orderModalData: ['1']
        }
      },
      rejected: {
        type: getOrderByNumber.rejected.type,
        error: { message: 'Some error' }
      }
    };

    it('тестирование работы экшена "pending"', () => {
      const state = feedSlice(initialState, actions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(actions.pending.payload);
    });

    it('тестирование работы экшена "fulfilled"', () => {
      const state = feedSlice(initialState, actions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.orderModalData).toEqual(
        actions.fulfilled.payload.orderModalData['1']
      );
    });

    it('тестирование работы экшена "rejected"', () => {
      const state = feedSlice(initialState, actions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
    });
  });
});
