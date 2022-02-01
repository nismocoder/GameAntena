import { configureStore } from '@reduxjs/toolkit';
import {
  authReducer,
  gamesReducer,
  detailReducer,
  uiReducer,
} from './reducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
    games: gamesReducer,
    detail: detailReducer,
    ui: uiReducer,
  },
});

export default store;
