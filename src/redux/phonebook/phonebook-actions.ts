import { createAction } from '@reduxjs/toolkit';

export const changeFilter = createAction<string>('phonebook/changeFilter');
