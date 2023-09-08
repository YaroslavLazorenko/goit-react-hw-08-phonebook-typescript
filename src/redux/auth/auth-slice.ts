import { createSlice } from '@reduxjs/toolkit';
import { login, register, logout, refreshUser } from './auth-operations';

interface AuthState {
  user: { name: string | null; email: string | null };
  token: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  isRefreshingUser: boolean;
  error: null | unknown;
}

const initialState: AuthState = {
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
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(logout.pending, state => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshingUser = true;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isLoggedIn = true;
        state.isRefreshingUser = false;
      })
      .addCase(refreshUser.rejected, (state, { payload }) => {
        state.isRefreshingUser = false;
        state.error = payload;
      })
      .addDefaultCase((_, __) => {});
  },
});

export default authSlice.reducer;
