import { AxiosError } from "axios";
import { useQuery } from "react-query";

import { getGames } from "../../services/games/gamesAPI";

import { GameQuery } from "../../services/games/interfaces";

interface GamesResponse {
  popular: GameQuery[];
  newGames: GameQuery[];
  upcoming: GameQuery[];
}

export const useGetGames = () => {
  const {
    data: games,
    isLoading: gamesLoading,
    error: gamesError
  } = useQuery<GamesResponse, AxiosError>("games", getGames);

  return { games, gamesLoading, gamesError };
};

export const useGetGameDetails = () => {};
