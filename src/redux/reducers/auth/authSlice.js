import { createSlice } from "@reduxjs/toolkit";
import { loginHandler, updateUserData, logoutHandler } from "./asyncActions";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  accessTokenExpire: null,
  refreshTokenExpire: null,
  notifications: [],
  status: "idle",
  pending: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setNotifications: (state, { payload }) => {
      const newNotif = Array.isArray(payload) ? payload : [payload];

      state.notifications = [...state.notifications, ...newNotif];
    },
    readNotifications: (state, { payload }) => {
      state.notifications = state.notifications.filter((n) => n.id !== payload);
    },
    readAllNotifications: (state) => {
      state.notifications = [];
    },
    logout: (state) => {
      state.status = "idle";
      state.user = null;
      state.accessToken = null;
      state.logoutError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateUserData.pending, (state) => {
        state.status = "user-pending";
      })
      .addCase(updateUserData.fulfilled, (state, { payload }) => {
        state.status = "user-fulfilled";
        state.user = {
          ...payload,
        };
      })
      .addCase(updateUserData.rejected, (state, { payload }) => {
        state.status = "user-rejected";
      })

      .addCase(loginHandler.pending, (state) => {
        state.status = "login-pending";
        state.error = null;
        state.pending = true;
      })
      .addCase(loginHandler.fulfilled, (state, { payload }) => {
        state.status = "login-fulfilled";
        state.pending = false;
        state.accessToken = payload?.accessToken?.token;
        state.accessTokenExpire = payload?.accessToken?.expiresAt;
        state.refreshToken = payload?.refreshToken?.token;
        state.refreshTokenExpire = payload?.refreshToken?.expiresAt;
      })
      .addCase(loginHandler.rejected, (state, { payload }) => {
        state.status = "login-rejected";
        state.pending = false;
        state.error = payload;
        state.user = null;
      })

      .addCase(logoutHandler.pending, (state) => {
        state.status = "logout-pending";
        state.error = null;
      })
      .addCase(logoutHandler.fulfilled, (state, { payload }) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.accessTokenExpire = null;
        state.refreshTokenExpire = null;
        state.notifications = [];
        state.status = "idle";
        state.pending = false;
        state.error = false;
      })
      .addCase(logoutHandler.rejected, (state, { payload }) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.accessTokenExpire = null;
        state.refreshTokenExpire = null;
        state.notifications = [];
        state.status = "idle";
        state.pending = false;
        state.error = false;
      });
  },
});

export const {
  setNotifications,
  readAllNotifications,
  readNotifications,
  logout,
  setReferral,
} = authSlice.actions;

export default authSlice;
