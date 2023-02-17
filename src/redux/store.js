import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./reducers/auth/authSlice";
import settingSlice from "./reducers/setting/settingSlice";

const persistedAuthReducer = persistReducer(
  {
    key: "panel.admin.auth",
    storage,
    whitelist: [
      "user",
      "address",
      "accessToken",
      "referredCode",
      "refreshToken",
      "accessTokenExpire",
      "refreshTokenExpire",
    ],
  },
  authSlice.reducer
);
const persistedSettingReducer = persistReducer(
  {
    key: "panel.admin.setting",
    storage,
  },
  settingSlice.reducer
);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  setting: persistedSettingReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
