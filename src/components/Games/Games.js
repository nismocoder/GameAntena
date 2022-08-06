import * as React from "react";

import styled from "styled-components";
import SingleGame from "./SingleGame";

function Games({ games = [] }) {
  return (
    <StyledGames>
      {games.map((game) => (
        <SingleGame
          name={game.name}
          id={game.id}
          image={game.background_image}
          key={game.id}
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
