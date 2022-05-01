import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: '',
    email: '',
    role: '',
    displayName: '',
    profilePicture: '',
    isEmailConfirmed: false,
  },
  isLoggedIn: false,
  accessToken: '',
  isLoading: false,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('LOADING_AUTH', (state, action) => {
      state.isLoading = true;
    })
    .addCase('LOADING_AUTH_FINISHED', (state, action) => {
      state.isLoading = false;
    })
    .addCase('LOGOUT', (state, action) => {
      return initialState;
    })
    .addCase('UPDATE_USER_INFO', (state, action) => {
      const userData = action.payload;

      state.user = userData;
    })
    .addCase('UPDATE_AUTH_INFO', (state, action) => {
      const { isLoggedIn, accessToken } = action.payload;

      state.isLoggedIn = isLoggedIn;
      state.accessToken = accessToken;
    });
});
