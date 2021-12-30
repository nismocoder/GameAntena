const initState = {
  popular: [],
  newGames: [],
  upcoming: [],
  searched: [],
  isLoading: false,
};

export const gamesReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOADING_GAMES":
      return {
        ...state,
        isLoading: true,
      }

    case "FETCH_GAMES":
      return {
        ...state,
        popular: action.payload.popular,
        upcoming: action.payload.upcoming,
        newGames: action.payload.newGames,
        isLoading: false,
      };
    case "FETCH_SEARCHED":
      return {
        ...state,
        searched: action.payload.searched,
        isLoading: false,
      };
    case "CLEAR_SEARCHED":
      return {
        ...state,
        searched: [],
        isLoading: false,
      };
    default:
      return { ...state };
  }
};