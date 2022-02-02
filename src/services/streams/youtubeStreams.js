import axios from 'axios';

import { topYoutubeGamingStreamsURL } from '../../utils/apiUrls';

export const getYoutubeTopGamingStreams = async () => {
  const { data } = await axios.get(topYoutubeGamingStreamsURL());
  return data;
};
