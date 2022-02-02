import axios from 'axios';
import { searchGameURL } from '../utils/apiUrls';

export const fetchSearchGames = (game_name) => async (dispatch) => {
  dispatch({ type: 'LOADING_GAMES' });

  const searchGames = await axios.get(searchGameURL(game_name));

  dispatch({
    type: 'FETCH_SEARCHED',
    payload: {
      searchedGames: searchGames.data.results,
    },
  });

  dispatch({ type: 'LOADING_GAMES_FINISHED' });
};
