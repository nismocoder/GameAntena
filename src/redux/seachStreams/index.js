import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  twitch: {
    searchQuery: "",
    searchResult: {
      channels: [],
      streams: []
    }
  },
  youtube: {
    searchQuery: "",
    searchResult: {
      channels: [],
      streams: []
    }
  },
  isLoading: false
};

const searchStreams = createSlice({
  name: "searchStreams",
  initialState,
  reducers: {
    LOADING_SEARCH_RESULT: (state) => {
      state.isLoading = true;
    },
    LOADING_SEARCH_RESULT_FINISHED: (state) => {
      state.isLoading = false;
    },
    FETCH_TWITCH_SEARCH_RESULT: (state, action) => {
      const { query, searchResult } = action.payload;

      state.twitch.searchQuery = query;
      state.twitch.searchResult = searchResult;
    },
    REMOVE_TWITCH_SEARCH_RESULT: (state, action) => {
      const toBeRemoved = action.payload;

      state.twitch.searchResult[toBeRemoved] =
        initialState.twitch.searchResult[toBeRemoved];
    },
    FETCH_YOUTUBE_SEARCH_RESULT: (state, action) => {
      const { query, searchResult } = action.payload;

      state.youtube.searchQuery = query;
      state.youtube.searchResult = searchResult;
    },
    REMOVE_YOUTUBE_SEARCH_RESULT: (state, action) => {
      const toBeRemoved = action.payload;

      state.youtube.searchResult[toBeRemoved] =
        initialState.youtube.searchResult[toBeRemoved];
    }
  }
});

export const searchStreamsActions = searchStreams.actions;
export const searchStreamsReducer = searchStreams.reducer;
