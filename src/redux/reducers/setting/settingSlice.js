import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullSidebar: true,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    closeSidebar: (state) => {
      state.fullSidebar = false;
    },
    openSidebar: (state) => {
      state.fullSidebar = true;
    },
  },
});

export const { closeSidebar, openSidebar } = settingSlice.actions;
export default settingSlice;
