import axios from "axios";
import {
  newGamesURL,
  popularGamesURL,
  upcomingGamesURL,
  searchGamesURL
} from "../../utils/apiUrls";
import { GameQuery } from "./interfaces";

interface GamesResponse {
  results: GameQuery[];
}

export const fetchPopularGames = async () => {
  const { data } = await axios.get<GamesResponse>(popularGamesURL());

  return data.results;
};

export const fetchNewGames = async () => {
  const { data } = await axios.get<GamesResponse>(newGamesURL());
  return data.results;
};

export const fetchUpcomingGames = async () => {
  const { data } = await axios.get<GamesResponse>(upcomingGamesURL());
  return data.results;
};

export const getGames = async () => {
  try {
    const getAllGames = async () => {
      return {
        popular: await fetchPopularGames(),
        newGames: await fetchNewGames(),
        upcoming: await fetchUpcomingGames()
      };
    };

    return await getAllGames();
  } catch (error) {
    throw error;
  }
};

export const getSearchGames = async (gameName = "") => {
  if (!gameName) {
    throw new Error("gameName is required to search for games");
  }
  const { data } = await axios.get(searchGamesURL(gameName));

  return data.results;
};
