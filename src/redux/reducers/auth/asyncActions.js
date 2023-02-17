import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiCall from "@/clients/apiCall";

export const updateUserData = createAsyncThunk(
  "user/update-user",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiCall("GET", "/");

      return response.data?.data;
    } catch (error) {
      console.log({ error });

      return rejectWithValue(
        error?.response || "Something went wrong. Try again later!"
      );
    }
  }
);

export const loginHandler = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await ApiCall("POST", "login", { email, password });

      return response?.data?.data;
    } catch (error) {
      console.log({ error });

      return rejectWithValue(
        error?.response || "Something went wrong. Try again later!"
      );
    }
  }
);

export const logoutHandler = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiCall("POST", "logout");

      return response?.data?.data;
    } catch (error) {
      console.log({ error });

      return rejectWithValue(
        error?.response || "Something went wrong. Try again later!"
      );
    }
  }
);
