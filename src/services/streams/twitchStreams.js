import axios from 'axios';

import { searchTwitchURL } from '../../utils/apiUrls';

import { topTwitchGamingStreamsURL } from '../../utils/apiUrls';

export const getTwitchTopGamingStreams = async () => {
  const { data } = await axios.get(topTwitchGamingStreamsURL());
  return data;
};

export const getSearchTwitch = async (query) => {
  const { data } = await axios.get(searchTwitchURL(query));

  return data;
};
