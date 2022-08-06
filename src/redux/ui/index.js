import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSideMenu: false,
  showChannelMenu: true,
  alertMessage: { message: "", status: "" },
  screenSize: { width: 0, height: 0 }
};

const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    SHOW_SIDE_MENU: (state) => {
      state.showSideMenu = true;
    },
    HIDE_SIDE_MENU: (state) => {
      state.showSideMenu = false;
    },
    SHOW_CHANNEL_MENU: (state) => {
      state.showChannelMenu = true;
    },
    HIDE_CHANNEL_MENU: (state) => {
      state.showChannelMenu = false;
    },
    SET_SCREEN_SIZE: (state, action) => {
      const screenSize = action.payload;

      state.screenSize = screenSize;
    },
    SET_ALERT_MESSAGE: (state, action) => {
      const { message, status } = action.payload;

      state.alertMessage = { message, status };
    }
  }
});

export const uiActions = ui.actions;
export const uiReducer = ui.reducer;
