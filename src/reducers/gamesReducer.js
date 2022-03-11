const initState = {
  searchedGames: [],
  isLoading: true,
};

export const gamesReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOADING_SEARCH_GAMES': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'LOADING_SEARCH_GAMES_FINISHED': {
      return {
        ...state,
        isLoading: false,
      };
    }

    case 'FETCH_SEARCHED_GAMES': {
      return {
        ...state,
        searchedGames: action.payload,
      };
    }

    case 'REMOVE_SEARCHED_GAMES': {
      return {
        ...state,
        searchedGames: [],
      };
    }

    default:
      return { ...state };
  }
};
