import axios from 'axios';
import { searchGameURL } from '../utils/apiUrls';

export const fetchedSearchGames = (game_name) => async (dispatch) => {
  dispatch({ type: 'LOADING_SEARCH_GAMES' });

  const searchGames = await axios.get(searchGameURL(game_name));

  dispatch({
    type: 'FETCH_SEARCHED_GAMES',
    payload: searchGames.data.results,
  });

  dispatch({ type: 'LOADING_SEARCH_GAMES_FINISHED' });
};
