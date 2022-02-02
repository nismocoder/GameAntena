import { configureStore } from '@reduxjs/toolkit';
import { authReducer, gamesReducer, uiReducer } from './reducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    games: gamesReducer,
  },
});

export default store;
