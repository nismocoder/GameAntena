import {
  newGamesURL,
  popularGamesURL,
  upcomingGamesURL,
  searchGameURL,
} from '../../utils/apiUrls';

import axios from 'axios';

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
  return new Promise(async (resolve, reject) => {
    try {
      const games = {
        popular: await fetchPopularGames(),
        newGames: await fetchNewGames(),
        upcoming: await fetchUpcomingGames(),
      };

      resolve(games);
    } catch (error) {
      reject(error);
    }
  });
};

export const getSearchedGames = async (game_name) => {
  if (!game_name) {
    throw new Error('game_name is required to search for games');
  }
  const { data } = await axios.get(searchGameURL(game_name));
  return data.results;
};
