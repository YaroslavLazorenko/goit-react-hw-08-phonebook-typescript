import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import * as actions from './phonebook-actions';
import { fetchContacts, postContact, deleteContact } from './phonebook-operations';

const initialItemsState = [];
const initialFilterState = '';

const itemsReducer = createReducer(initialItemsState, {
  [deleteContact.fulfilled]: (state, { payload }) => state.filter(({ id }) => id !== payload.id),
  [fetchContacts.fulfilled]: (_, { payload }) => payload,
  [postContact.fulfilled]: (state, { payload }) => [...state, payload],
});

const filterReducer = createReducer(initialFilterState, {
  [actions.changeFilter]: (_, { payload }) => payload,
});

const isLoadingReducer = createReducer(false, {
  [fetchContacts.pending]: () => true,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,
  [postContact.pending]: () => true,
  [postContact.fulfilled]: () => false,
  [postContact.rejected]: () => false,
  [deleteContact.pending]: () => true,
  [deleteContact.fulfilled]: () => false,
  [deleteContact.rejected]: () => false,
});

const errorReducer = createReducer(null, {
  [fetchContacts.rejected]: (_, { payload }) => payload,
  [fetchContacts.pending]: () => null,
  [postContact.rejected]: (_, { payload }) => payload,
  [postContact.pending]: () => null,
  [deleteContact.rejected]: (_, { payload }) => payload,
  [deleteContact.pending]: () => null,
});

export default combineReducers({
  items: itemsReducer,
  filter: filterReducer,
  isLoading: isLoadingReducer,
  error: errorReducer,
});
