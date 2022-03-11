import axios from 'axios';
import {
  searchTwitchStreamsURL,
  searchYoutubeStreamsURL,
} from '../utils/apiUrls';

export const fetchSearchedTwitchStreams = (query) => async (dispatch) => {
  dispatch({ type: 'LOADING_SEARCH_STREAMS' });

  const { data } = await axios.get(searchTwitchStreamsURL(query));

  dispatch({
    type: 'FETCH_SEARCHED_TWITCH_STREAMS',
    payload: { query: data.query, streams: data.streams },
  });

  dispatch({ type: 'LOADING_SEARCH_STREAMS_FINISHED' });
};

export const fetchSearchedYoutubeStreams = (query) => async (dispatch) => {
  dispatch({ type: 'LOADING_SEARCH_STREAMS' });

  const { data } = await axios.get(searchYoutubeStreamsURL(query));

  dispatch({
    type: 'FETCH_SEARCHED_YOUTUBE_STREAMS',
    payload: { query: data.query, streams: data.streams },
  });

  dispatch({ type: 'LOADING_SEARCH_STREAMS_FINISHED' });
};
