import axios from 'axios';

import { gameDetailsURL, gameScreenshotURL } from '../../utils/apiUrls';

const fetchGameDetails = async (game_id) => {
  const { data } = await axios.get(gameDetailsURL(game_id));
  return data;
};

const fetchGameScreenshots = async (game_id) => {
  const { data } = await axios.get(gameScreenshotURL(game_id));
  return data.results;
};

export const getGameDetails = async (game_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const details = {
        ...(await fetchGameDetails(game_id)),
        screens: await fetchGameScreenshots(game_id),
      };

      resolve(details);
    } catch (error) {
      reject(error);
    }
  });
};
