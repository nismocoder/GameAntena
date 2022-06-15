import { getSearchTwitch } from '../services/streams/twitchStreams';
import { getSearchYoutube } from '../services/streams/youtubeStreams';

export const fetchSearchTwitch = (query) => async (dispatch) => {
  dispatch({ type: 'LOADING_SEARCH_RESULT' });

  const searchTwitch = await getSearchTwitch(query);

  dispatch({
    type: 'FETCH_TWITCH_SEARCH_RESULT',
    payload: {
      query: searchTwitch.query,
      searchResult: searchTwitch.result,
    },
  });

  dispatch({ type: 'LOADING_SEARCH_RESULT_FINISHED' });
};

export const fetchSearchYoutube = (query) => async (dispatch) => {
  dispatch({ type: 'LOADING_SEARCH_RESULT' });

  const searchYoutube = await getSearchYoutube(query);

  dispatch({
    type: 'FETCH_YOUTUBE_SEARCH_RESULT',
    payload: {
      query: searchYoutube.query,
      searchResult: searchYoutube.result,
    },
  });

  dispatch({ type: 'LOADING_SEARCH_RESULT_FINISHED' });
};
