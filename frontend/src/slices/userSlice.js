import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const initialState = {
  token: sessionStorage.getItem('accessToken'),
  name: '',
  email: '',
  productSmall: 27,
  productMedium: 6,
  productLarge: 2,
  isLogin: false,
  isLoginError: false,
  userInfo: null,
  isValidToken: false
};

const persistConfig = {
  key: 'user',
  storage: storageSession,
  whitelist: ['token', 'email', 'name', 'productSmall', 'productMedium', 'productLarge', 'isLogin']
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setProductSmall(state, action) {
      state.productSmall = action.payload;
    },
    setProductMedium(state, action) {
      state.productMedium = action.payload;
    },
    setProductLarge(state, action) {
      state.productLarge = action.payload;
    },
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },
    setIsLoginError(state, action) {
      state.isLoginError = action.payload;
    },
    setIsValidToken(state, action) {
      state.isValidToken = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    logoutUser(state) {
      return initialState;
    }
  }
});

export const {
  setToken,
  setEmail,
  setName,
  setProductSmall,
  setProductMedium,
  setProductLarge,
  setIsLogin,
  setIsLoginError,
  setIsValidToken,
  setUserInfo,
  logoutUser
} = userSlice.actions;

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);
export default persistedReducer;
