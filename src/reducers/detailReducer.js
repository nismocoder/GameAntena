const initialState = {
  game: { platforms: [] },
  screen: { results: [] },
  isLoading: true,
};

export const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DETAIL":
      return {
        ...state,
        game: action.payload.game,
        screen: action.payload.screen,
        isLoading: false,
      };
    case "LOADING_DETAIL":
      return {
        ...state,
        isLoading: true,
      };
    case "CLOSE_DETAIL":
      return initialState;
    default:
      return { ...state };
  }
};