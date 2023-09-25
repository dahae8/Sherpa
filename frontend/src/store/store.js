import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import userReducer from '../slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);