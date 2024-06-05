import userSlice, {
  getProfile,
  initialState,
  login,
  logout,
  register,
  updateProfile
} from './userSlice';

describe('тестирование работы редьюсера "userSlice"', () => {
  describe('тестирование работы экшена "register"', () => {
    const actions = {
      pending: {
        type: register.pending.type,
        payload: null
      },
      fulfielld: {
        type: register.fulfilled.type,
        payload: {
          user: {
            email: 'qwerty@mail.ru',
            name: 'qwerty'
          }
        }
      },
      rejected: {
        type: register.rejected.type,
        error: { message: 'Some error' }
      }
    };

    it('тестирование работы экшена "pending"', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.isAuth).toBe(false);
      expect(state.error).toBe(actions.pending.payload);
    });

    it('тестирование работы экшена "fulfielld"', () => {
      const state = userSlice(initialState, actions.fulfielld);
      expect(state.isAuth).toBe(true);
      expect(state.user).toBe(actions.fulfielld.payload.user);
    });

    it('тестирование работы экшена "rejected"', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.isAuth).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
    });
  });

  describe('тестирование работы экшена "login"', () => {
    const actions = {
      pending: {
        type: login.pending.type,
        payload: null
      },
      fulfielld: {
        type: login.fulfilled.type,
        payload: {
          user: {
            email: 'qwerty@mail.ru',
            name: 'qwerty'
          }
        }
      },
      rejected: {
        type: login.rejected.type,
        error: { message: 'Some error' }
      }
    };

    it('тестирование работы экшена "pending"', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.isAuth).toBe(false);
      expect(state.error).toBe(actions.pending.payload);
    });

    it('тестирование работы экшена "fulfielld"', () => {
      const state = userSlice(initialState, actions.fulfielld);
      expect(state.isAuth).toBe(true);
      expect(state.user).toBe(actions.fulfielld.payload.user);
    });

    it('тестирование работы экшена "rejected"', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.isAuth).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
    });
  });

  describe('тестирование работы экшена "getProfile"', () => {
    const actions = {
      pending: {
        type: getProfile.pending.type,
        payload: null
      },
      fulfielld: {
        type: getProfile.fulfilled.type,
        payload: {
          user: {
            email: 'user@mail.ru',
            name: 'user'
          }
        }
      },
      rejected: {
        type: getProfile.rejected.type,
        error: { message: 'Some error' }
      }
    };

    it('тестирование работы экшена "pending"', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.isAuth).toBe(false);
      expect(state.error).toBe(actions.pending.payload);
    });

    it('тестирование работы экшена "fulfielld"', () => {
      const state = userSlice(initialState, actions.fulfielld);
      expect(state.isAuth).toBe(true);
      expect(state.user).toEqual(actions.fulfielld.payload.user);
    });

    it('тестирование работы экшена "rejected"', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.isAuth).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
    });
  });

  describe('тестирование работы экшена "updateProfile"', () => {
    const actions = {
      pending: {
        type: updateProfile.pending.type,
        payload: null
      },
      fulfielld: {
        type: updateProfile.fulfilled.type,
        payload: {
          user: {
            email: 'user@mail.ru',
            name: 'user'
          }
        }
      },
      rejected: {
        type: updateProfile.rejected.type,
        error: { message: 'Some error' }
      }
    };

    it('тестирование работы экшена "pending"', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.isAuth).toBe(true);
      expect(state.error).toBe(actions.pending.payload);
    });

    it('тестирование работы экшена "fulfielld"', () => {
      const state = userSlice(initialState, actions.fulfielld);
      expect(state.isAuth).toBe(true);
      expect(state.user).toEqual(actions.fulfielld.payload.user);
    });

    it('тестирование работы экшена "rejected"', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.isAuth).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
    });
  });

  describe('тестирование работы экшена "logout"', () => {
    const actions = {
      pending: {
        type: logout.pending.type,
        payload: null
      },
      fulfielld: {
        type: logout.fulfilled.type,
        payload: {
          user: {
            email: '',
            name: ''
          }
        }
      },
      rejected: {
        type: logout.rejected.type,
        error: { message: 'Some error' }
      }
    };

    it('тестирование работы экшена "pending"', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.isAuth).toBe(true);
      expect(state.error).toBe(actions.pending.payload);
    });

    it('тестирование работы экшена "fulfielld"', () => {
      const state = userSlice(initialState, actions.fulfielld);
      expect(state.isAuth).toBe(false);
      expect(state.user).toEqual(actions.fulfielld.payload.user);
    });

    it('тестирование работы экшена "rejected"', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.isAuth).toBe(false);
      expect(state.error).toBe(null);
    });
  });
});
