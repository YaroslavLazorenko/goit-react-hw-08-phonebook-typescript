import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import authReducer from './auth/auth-slice';
import contactsReducer from './phonebook/phonebook-reducer';

const isDevelopment = process.env.NODE_ENV === 'development';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const middleware = getDefaultMiddleware => [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger,
];

export const store = configureStore({
  reducer: { auth: persistReducer(authPersistConfig, authReducer), contacts: contactsReducer },
  middleware,
  devTools: isDevelopment,
});

export const persistor = persistStore(store);
