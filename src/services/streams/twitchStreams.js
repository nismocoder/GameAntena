import axios from "axios";

import {
  searchTwitchURL,
  topTwitchGamingStreamsURL
} from "../../utils/apiUrls";

export const getTwitchTopGamingStreams = async () => {
  const { data } = await axios.get(topTwitchGamingStreamsURL());
  return data;
};

export const getSearchTwitch = async (query) => {
  const { data } = await axios.get(searchTwitchURL(query));

  return data;
};
