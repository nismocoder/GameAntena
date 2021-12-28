import React from 'react';

import SingleGame from './SingleGame';

import styled from "styled-components";
import { motion } from "framer-motion";

const Games = ({ games = [] }) => {
  return (
    <StyledGames>
      {
        games.map((game) => (
          <SingleGame
            name={game.name}
            released={game.released}
            id={game.id}
            image={game.background_image}
            key={game.id}
          />
        ))
      }
    </StyledGames>
  )
}

const StyledGames = styled(motion.div)`
  display: grid;
  gap: 1rem;
  

  @media(min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  } 
`;

export default Games
