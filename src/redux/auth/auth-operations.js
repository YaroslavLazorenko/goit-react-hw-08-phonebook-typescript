import { createAsyncThunk } from '@reduxjs/toolkit';
import * as phonebookApi from 'services/phonebook-api';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await phonebookApi.registerNewUser(credentials);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const data = await phonebookApi.loginUser(credentials);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await phonebookApi.logoutUser();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue(null);

      const data = await phonebookApi.refreshUser(token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
