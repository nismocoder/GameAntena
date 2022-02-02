import axios from 'axios';

import { topTwitchGamingStreamsURL } from '../../utils/apiUrls';

export const getTwitchTopGamingStreams = async () => {
  const { data } = await axios.get(topTwitchGamingStreamsURL());
  return data;
};
