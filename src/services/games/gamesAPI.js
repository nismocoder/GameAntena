import axios from "axios";
import {
  newGamesURL,
  popularGamesURL,
  upcomingGamesURL,
  searchGamesURL
} from "../../utils/apiUrls";

const fetchPopularGames = async () => {
  const { data } = await axios.get(popularGamesURL());
  return data.results;
};

const fetchNewGames = async () => {
  const { data } = await axios.get(newGamesURL());
  return data.results;
};

const fetchUpcomingGames = async () => {
  const { data } = await axios.get(upcomingGamesURL());
  return data.results;
};

export const getGames = async () => {
  return new Promise((resolve, reject) => {
    try {
      const getAllGames = async () => {
        return {
          popular: await fetchPopularGames(),
          newGames: await fetchNewGames(),
          upcoming: await fetchUpcomingGames()
        };
      };

      resolve(getAllGames());
    } catch (error) {
      reject(error);
    }
  });
};

export const getSearchGames = async (gameName = "") => {
  if (!gameName) {
    throw new Error("gameName is required to search for games");
  }
  const { data } = await axios.get(searchGamesURL(gameName));

  return data.results;
};
