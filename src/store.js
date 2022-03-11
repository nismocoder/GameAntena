import { configureStore } from '@reduxjs/toolkit';
import {
  authReducer,
  gamesReducer,
  uiReducer,
  socialsDataReducer,
  streamsReducer,
} from './reducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    games: gamesReducer,
    socialsData: socialsDataReducer,
    streams: streamsReducer,
  },
});

export default store;
