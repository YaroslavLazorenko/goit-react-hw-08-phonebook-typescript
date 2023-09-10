import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

export const getContactsItems = (state: RootState) => state.contacts.items;

export const getContactsFilter = (state: RootState) => state.contacts.filter;

export const getLoadingStatus = (state: RootState) => state.contacts.isLoading;

export const getError = (state: RootState) => state.contacts.error;

export const getFilteredContactsItems = createSelector(
  [getContactsItems, getContactsFilter],
  (contacts, filter) =>
    contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase())),
);
