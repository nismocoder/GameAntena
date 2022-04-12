import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  showSideMenu: false,
  showChannelMenu: true,
  alertMessage: { message: '', status: '' },
  screen: { width: 0, height: 0 },
};

export const uiReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('SHOW_SIDE_MENU', (state, action) => {
      state.showSideMenu = true;
    })
    .addCase('HIDE_SIDE_MENU', (state, action) => {
      state.showSideMenu = false;
    })
    .addCase('SHOW_CHANNEL_MENU', (state, action) => {
      state.showChannelMenu = true;
    })
    .addCase('HIDE_CHANNEL_MENU', (state, action) => {
      state.showChannelMenu = false;
    })
    .addCase('SET_SCREEN', (state, action) => {
      state.screen = action.payload;
    })
    .addCase('SET_ALERT_MESSAGE', (state, action) => {
      const { message, status } = action.payload;

      state.alertMessage = { message, status };
    });
});
