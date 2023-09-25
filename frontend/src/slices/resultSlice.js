import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const initialState = {
  ages: [],
  male: null,
  female: null,
  gender: null,
  age: null,
  mediaLabels: [],
  subMediaLabels: [],
  priceLabels: [],
  mainDatas: [],
  subDatas: [],
  prices: [],
  recommendedMedia: null,
};

const persistConfig = {
  key: "result",
  storage: storageSession,
  whitelist: [
    "ages",
    "male",
    "female",
    "gender",
    "age",
    "mediaLabels",
    "subMediaLabels",
    "priceLabels",
    "mainDatas",
    "subDatas",
    "prices",
    "recommendedMedia",
  ],
};

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setAges(state, action) {
      state.ages = action.payload;
    },
    setMale(state, action) {
      state.male = action.payload;
    },
    setFemale(state, action) {
      state.female = action.payload;
    },
    setGender(state, action) {
      state.gender = action.payload;
    },
    setAge(state, action) {
      state.age = action.payload;
    },
    setMediaLabels(state, action) {
      state.mediaLabels = action.payload;
    },
    setSubMediaLabels(state, action) {
      state.subMediaLabels = action.payload;
    },
    setPriceLabels(state, action) {
      state.priceLabels = action.payload;
    },
    setMainDatas(state, action) {
      state.mainDatas = action.payload;
    },
    setSubDatas(state, action) {
      state.subDatas = action.payload;
    },
    setPrices(state, action) {
      state.prices = action.payload;
    },
    setRecommendedMedia(state, action) {
      state.recommendedMedia = action.payload;
    },
  },
});

export const {
  setAges,
  setMale,
  setFemale,
  setGender,
  setAge,
  setMediaLabels,
  setSubMediaLabels,
  setPriceLabels,
  setMainDatas,
  setSubDatas,
  setPrices,
  setRecommendedMedia,
} = resultSlice.actions;

const persistedReducer = persistReducer(persistConfig, resultSlice.reducer);
export default persistedReducer;
