import { RootState } from 'redux/store';

export const getIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const getUserName = (state: RootState) => state.auth.user?.name;

export const getUserEmail = (state: RootState) => state.auth.user?.email;

export const getToken = (state: RootState) => state.auth.token;

export const getIsRefreshingUser = (state: RootState) => state.auth.isRefreshingUser;

export const getIsAuthLoading = (state: RootState) => state.auth.isLoading;

export const getError = (state: RootState) => state.auth.error;
