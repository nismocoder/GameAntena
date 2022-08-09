import { configureStore } from "@reduxjs/toolkit";
import { gamesReducer, uiReducer, searchStreamsReducer } from "./reducers";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    games: gamesReducer,
    searchStreams: searchStreamsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
