import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import * as actions from './phonebook-actions';
import { fetchContacts, postContact, deleteContact } from './phonebook-operations';

const initialItemsState = [];
const initialFilterState = '';

const itemsReducer = createReducer(initialItemsState, builder => {
  builder
    .addCase(deleteContact.fulfilled, (state, { payload }) => {
      state.filter(({ id }) => id !== payload.id);
    })
    .addCase(fetchContacts.fulfilled, (_, { payload }) => payload)
    .addCase(postContact.fulfilled, (state, { payload }) => [...state, payload]);
});

const filterReducer = createReducer(initialFilterState, builder => {
  builder.addCase(actions.changeFilter, (_, { payload }) => payload);
});

const isLoadingReducer = createReducer(false, builder => {
  builder
    .addCase(fetchContacts.pending, () => true)
    .addCase(fetchContacts.fulfilled, () => false)
    .addCase(fetchContacts.rejected, () => false)
    .addCase(postContact.pending, () => true)
    .addCase(postContact.fulfilled, () => false)
    .addCase(postContact.rejected, () => false)
    .addCase(deleteContact.pending, () => true)
    .addCase(deleteContact.fulfilled, () => false)
    .addCase(deleteContact.rejected, () => false);
});

const errorReducer = createReducer(null, builder => {
  builder
    .addCase(fetchContacts.rejected, (_, { payload }) => payload)
    .addCase(fetchContacts.pending, () => null)
    .addCase(postContact.rejected, (_, { payload }) => payload)
    .addCase(postContact.pending, () => null)
    .addCase(deleteContact.rejected, (_, { payload }) => payload)
    .addCase(deleteContact.pending, () => null);
});

export default combineReducers({
  items: itemsReducer,
  filter: filterReducer,
  isLoading: isLoadingReducer,
  error: errorReducer,
});
