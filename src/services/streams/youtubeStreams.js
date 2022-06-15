import axios from 'axios';

import {
  searchYoutubeURL,
  topYoutubeGamingStreamsURL,
} from '../../utils/apiUrls';

export const getYoutubeTopGamingStreams = async () => {
  const { data } = await axios.get(topYoutubeGamingStreamsURL());
  return data;
};

export const getSearchYoutube = async (query) => {
  const { data } = await axios.get(searchYoutubeURL(query));

  return data;
};
