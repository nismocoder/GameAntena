import { gamesActions } from ".";
import { getSearchGames } from "../../services/games/gamesAPI";

// eslint-disable-next-line import/prefer-default-export
export const fetchSearchGames = (gameName) => async (dispatch) => {
  dispatch(gamesActions.LOADING_SEARCH_GAMES());

  const searchGames = await getSearchGames(gameName);

  dispatch(gamesActions.FETCH_SEARCH_GAMES(searchGames));

  dispatch(gamesActions.LOADING_SEARCH_GAMES_FINISHED());
};
