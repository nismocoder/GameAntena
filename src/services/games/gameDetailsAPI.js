import axios from "axios";

import { gameDetailsURL, gameScreenshotURL } from "../../utils/apiUrls";

const fetchGameDetails = async (gameId) => {
  const { data } = await axios.get(gameDetailsURL(gameId));
  return data;
};

const fetchGameScreenshots = async (gameId) => {
  const { data } = await axios.get(gameScreenshotURL(gameId));
  return data.results;
};

const getGameDetails = async (gameId) => {
  return new Promise((resolve, reject) => {
    try {
      const getDetails = async () => {
        return {
          ...(await fetchGameDetails(gameId)),
          screens: await fetchGameScreenshots(gameId)
        };
      };

      resolve(getDetails());
    } catch (error) {
      reject(error);
    }
  });
};

export default getGameDetails;
