import { configureStore } from '@reduxjs/toolkit';
import {
  authReducer,
  gamesReducer,
  uiReducer,
  socialsDataReducer,
} from './reducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    games: gamesReducer,
    socialsData: socialsDataReducer,
  },
});

export default store;
