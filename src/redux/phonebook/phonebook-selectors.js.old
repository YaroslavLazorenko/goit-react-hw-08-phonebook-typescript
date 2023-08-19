import { createSelector } from '@reduxjs/toolkit';

export const getContactsItems = state => state.contacts.items;

export const getContactsFilter = state => state.contacts.filter;

export const getLoadingStatus = state => state.contacts.isLoading;

export const getError = state => state.contacts.error;

export const getFilteredContactsItems = createSelector(
  [getContactsItems, getContactsFilter],
  (contacts, filter) =>
    contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase())),
);
