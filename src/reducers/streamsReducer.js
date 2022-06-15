import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  twitch: {
    searchQuery: '',
    searchResult: {
      channels: [],
      streams: [],
    },
  },
  youtube: {
    searchQuery: '',
    searchResult: {
      channels: [],
      streams: [],
    },
  },
  isLoading: false,
};

export const streamsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('LOADING_SEARCH_RESULT', (state, action) => {
      state.isLoading = true;
    })
    .addCase('LOADING_SEARCH_RESULT_FINISHED', (state, action) => {
      state.isLoading = false;
    })
    .addCase('FETCH_TWITCH_SEARCH_RESULT', (state, action) => {
      const { query, searchResult } = action.payload;

      state.twitch.searchQuery = query;
      state.twitch.searchResult = searchResult;
    })
    .addCase('REMOVE_TWITCH_SEARCH_RESULT', (state, action) => {
      state.twitch.searchQuery = initialState.twitch.searchQuery;
      state.twitch.searchResult = initialState.twitch.searchResult;
    })
    .addCase('FETCH_YOUTUBE_SEARCH_RESULT', (state, action) => {
      const { query, searchResult } = action.payload;

      state.youtube.searchQuery = query;
      state.youtube.searchResult = searchResult;
    })
    .addCase('REMOVE_YOUTUBE_SEARCH_RESULT', (state, action) => {
      state.youtube.searchQuery = initialState.youtube.searchQuery;
      state.youtube.searchResult = initialState.youtube.searchResult;
    });
});
