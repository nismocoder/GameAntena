const initState = {
  searchedGames: [],
  isLoading: true,
};

export const gamesReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOADING_GAMES': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'LOADING_GAMES_FINISHED': {
      return {
        ...state,
        isLoading: false,
      };
    }

    case 'FETCH_SEARCHED': {
      return {
        ...state,
        searchedGames: action.payload.searchedGames,
      };
    }

    case 'CLEAR_SEARCHED': {
      return {
        ...state,
        searchedGames: [],
      };
    }

    default:
      return { ...state };
  }
};
