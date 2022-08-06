import { searchStreamsActions } from ".";
import { getSearchTwitch } from "../../services/streams/twitchStreams";
import { getSearchYoutube } from "../../services/streams/youtubeStreams";

export const fetchSearchTwitch = (query) => async (dispatch) => {
  dispatch(searchStreamsActions.LOADING_SEARCH_RESULT());

  const searchTwitch = await getSearchTwitch(query);

  dispatch(
    searchStreamsActions.FETCH_TWITCH_SEARCH_RESULT({
      query: searchTwitch.query,
      searchResult: searchTwitch.result
    })
  );

  dispatch(searchStreamsActions.LOADING_SEARCH_RESULT_FINISHED());
};

export const fetchSearchYoutube = (query) => async (dispatch) => {
  dispatch(searchStreamsActions.LOADING_SEARCH_RESULT());

  const searchYoutube = await getSearchYoutube(query);

  dispatch(
    searchStreamsActions.FETCH_YOUTUBE_SEARCH_RESULT({
      query: searchYoutube.query,
      searchResult: searchYoutube.result
    })
  );

  dispatch(searchStreamsActions.LOADING_SEARCH_RESULT_FINISHED());
};
