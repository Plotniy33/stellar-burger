import {
  getUserApi,
  loginUserApi,
  TLoginData,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

interface TUserState {
  isAuth: boolean;
  user: TUser;
  error?: string | null;
}

const initialState: TUserState = {
  isAuth: false,
  user: { email: '', name: '' },
  error: null
};

export const register = createAsyncThunk('user/register', registerUserApi);
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const res = await loginUserApi({ email, password });
    if (!res.success) {
      return res;
    }
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);
export const getProfile = createAsyncThunk('user/getProfile', getUserApi);
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  updateUserApi
);
export const logout = createAsyncThunk('user/logout', async () => {
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
  });
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    isAuthCheck: (state) => state.isAuth,
    getUser: (state) => state.user,
    getUserName: (state) => state.user?.name,
    getError: (state) => state.error
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isAuth = false;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.isAuth = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.error.message;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isAuth = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.isAuth = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
        state.user = { name: '', email: '' };
      })
      .addCase(logout.rejected, (state) => {
        state.isAuth = false;
        state.error = null;
      });
  }
});

export const { isAuthCheck, getUser, getUserName, getError } =
  userSlice.selectors;

export default userSlice.reducer;
