import axios from 'axios';

import { gameDetailsURL, gameScreenshotURL } from '../../utils/apiUrls';

const fetchGameDetails = async (game_id, signal) => {
  const { data } = await axios.get(gameDetailsURL(game_id), { signal });
  return data;
};

const fetchGameScreenshots = async (game_id, signal) => {
  const { data } = await axios.get(gameScreenshotURL(game_id), { signal });
  return data.results;
};

export const getGameDetails = async (game_id, signal) => {
  return new Promise(async (resolve, reject) => {
    try {
      const details = {
        ...(await fetchGameDetails(game_id, signal)),
        screens: await fetchGameScreenshots(game_id, signal),
      };

      resolve(details);
    } catch (error) {
      reject(error);
    }
  });
};
