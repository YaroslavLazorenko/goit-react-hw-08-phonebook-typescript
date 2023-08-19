import { createAsyncThunk } from '@reduxjs/toolkit';
import * as phonebookApi from 'services/phonebook-api';

type Contact = {
  name: string;
  number: string;
};

export const fetchContacts = createAsyncThunk(
  'phonebook/fetchContacts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const contacts = await phonebookApi.fetchContacts(token);
      return contacts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const postContact = createAsyncThunk(
  'phonebook/postContact',
  async ({ name, number }: Contact, { rejectWithValue }) => {
    try {
      const id = await phonebookApi.postContact({ name, number });
      return { id, name, number };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteContact = createAsyncThunk(
  'phonebook/deleteContact',
  async (id: string, { rejectWithValue }) => {
    try {
      await phonebookApi.deleteContact(id);
      return { id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
