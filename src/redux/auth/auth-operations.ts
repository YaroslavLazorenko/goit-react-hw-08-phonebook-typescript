import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import * as phonebookApi from 'services/phonebook-api';
import { IRegisterCredentials, ILoginCredentials, IAuthFetchingData } from 'types';

export const register = createAsyncThunk<
  IAuthFetchingData,
  IRegisterCredentials,
  { rejectValue: string }
>('auth/register', async (credentials: IRegisterCredentials, { rejectWithValue }) => {
  try {
    const data = await phonebookApi.registerNewUser(credentials);
    return data;
  } catch (error) {
    let err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

export const login = createAsyncThunk<
  IAuthFetchingData,
  ILoginCredentials,
  { rejectValue: string }
>('auth/login', async (credentials: ILoginCredentials, { rejectWithValue }) => {
  try {
    const data = await phonebookApi.loginUser(credentials);
    return data;
  } catch (error) {
    let err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await phonebookApi.logoutUser();
    } catch (error) {
      let err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  },
);

export const refreshUser = createAsyncThunk<
  IAuthFetchingData,
  void,
  { rejectValue: string | null }
>('auth/refreshUser', async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) return rejectWithValue(null);

    const data = await phonebookApi.refreshUser(token);
    return data;
  } catch (error) {
    let err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});
