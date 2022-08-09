import * as React from "react";
import { GameQuery } from "src/services/games/interfaces";

import styled from "styled-components";
import SingleGame from "./SingleGame";

interface GamesProps {
  games: GameQuery[] | undefined;
}

function Games({ games = [] }: GamesProps) {
  return (
    <StyledGames>
      {games.map(({ id, name, background_image: backgroundImage }) => (
        <SingleGame
          key={id}
          name={name}
          id={String(id)}
          image={backgroundImage}
        />
      ))}
    </StyledGames>
  );
}

const StyledGames = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  }
`;

export default Games;
