import { configureStore } from '@reduxjs/toolkit';
// import { persistStore } from 'redux-persist';

export const store = configureStore({
  reducer: {
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});