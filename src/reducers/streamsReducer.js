const initialState = {
  twitch: {
    searchQuery: '',
    searchedStreams: [],
  },
  youtube: {
    searchQuery: '',
    searchedStreams: [],
  },
  isLoading: false,
};

export const streamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_SEARCH_STREAMS': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'LOADING_SEARCH_STREAMS_FINISHED': {
      return {
        ...state,
        isLoading: false,
      };
    }

    case 'FETCH_SEARCHED_TWITCH_STREAMS': {
      const { query, streams } = action.payload;
      return {
        ...state,
        twitch: { searchQuery: query, searchedStreams: streams },
      };
    }

    case 'REMOVE_SEARCHED_TWITCH_STREAMS': {
      return {
        ...state,
        twitch: { searchQuery: '', searchedStreams: [] },
      };
    }

    case 'FETCH_SEARCHED_YOUTUBE_STREAMS': {
      const { query, streams } = action.payload;

      return {
        ...state,
        youtube: { searchQuery: query, searchedStreams: streams },
      };
    }

    case 'REMOVE_SEARCHED_YOUTUBE_STREAMS': {
      return {
        ...state,
        youtube: { searchQuery: '', searchedStreams: [] },
      };
    }

    default:
      return state;
  }
};
