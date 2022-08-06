import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchGames: [],
  isLoading: true
};

const games = createSlice({
  name: "games",
  initialState,
  reducers: {
    LOADING_SEARCH_GAMES: (state) => {
      state.isLoading = true;
    },
    LOADING_SEARCH_GAMES_FINISHED: (state) => {
      state.isLoading = false;
    },
    FETCH_SEARCH_GAMES: (state, action) => {
      const searchGames = action.payload;

      state.searchGames = searchGames;
    },
    REMOVE_SEARCH_GAMES: (state) => {
      state.searchGames = [];
    }
  }
});

export const gamesReducer = games.reducer;
export const gamesActions = games.actions;
