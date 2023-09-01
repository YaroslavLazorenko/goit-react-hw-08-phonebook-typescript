import { createSlice } from '@reduxjs/toolkit';
import { login, register, logout, refreshUser } from './auth-operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoading: false,
  isLoggedIn: false,
  isRefreshingUser: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.pending](state) {
      state.isLoading = true;
    },
    [register.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [register.rejected](state, { payload }) {
      state.error = payload;
      state.isLoading = false;
    },
    [login.pending](state) {
      state.isLoading = true;
    },
    [login.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [login.rejected](state, { payload }) {
      state.error = payload;
      state.isLoading = false;
    },
    [logout.pending](state) {
      state.isLoading = true;
    },
    [logout.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
    },
    [logout.rejected](state, { payload }) {
      state.error = payload;
      state.isLoading = false;
    },
    [refreshUser.pending](state) {
      state.isRefreshingUser = true;
    },
    [refreshUser.fulfilled](state, { payload }) {
      state.user = payload;
      state.isLoggedIn = true;
      state.isRefreshingUser = false;
    },
    [refreshUser.rejected](state, { payload }) {
      state.isRefreshingUser = false;
      state.error = payload;
    },
  },
});

export default authSlice.reducer;
