import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AppDispatch, RootState } from 'redux/store';
import * as phonebookApi from 'services/phonebook-api';
import { IContact, IContactId, IContactNameAndNumber, RejectValueType } from 'types';

export const fetchContacts = createAsyncThunk<
  IContact[],
  void,
  { rejectValue: RejectValueType; state: RootState }
>('phonebook/fetchContacts', async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const contacts = await phonebookApi.fetchContacts(token);
    return contacts;
  } catch (error) {
    let err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

export const postContact = createAsyncThunk<
  IContact,
  IContactNameAndNumber,
  { rejectValue: RejectValueType; dispatch: AppDispatch }
>('phonebook/postContact', async ({ name, number }: IContactNameAndNumber, { rejectWithValue }) => {
  try {
    const id = await phonebookApi.postContact({ name, number });
    return { id, name, number };
  } catch (error) {
    let err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

export const deleteContact = createAsyncThunk<IContactId, string, { rejectValue: RejectValueType }>(
  'phonebook/deleteContact',
  async (id: string, { rejectWithValue }) => {
    try {
      await phonebookApi.deleteContact(id);
      return { id };
    } catch (error) {
      let err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  },
);
