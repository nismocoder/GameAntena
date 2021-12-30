import React from 'react';

import { useSelector } from "react-redux";

import styled from "styled-components";

import { GameDetail, Games, Loader } from ".";

import { useLocation } from "react-router-dom";

import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";


const GameList = () => {
  const location = useLocation();

  const pathId = location.pathname.split("/")[2];

  // get that data back
  const games = useSelector((state) => state.games);
  const { showSideMenu } = useSelector((state) => state.ui);

  return (
    games.isLoading ? (
      <div style={{ width: '100vw', height: '100vh', flex: 1 }}>
        <Loader style={{ transform: 'scale(2)' }} />
      </div>
    ) : (
      <StyledGameList
        layout
        className={`${showSideMenu ? 'scrollable' : ''}`
        }
      >
        <AnimatePresence>
          <GameDetail pathId={pathId} />
        </AnimatePresence>
        {
          games.searched.length > 0 && (
            <Section className="searched">
              <h3 className="section-title">Searched Games</h3>
              <Games games={games.searched} />
            </Section>
          )
        }
        <Section className="upcoming">
          <h3 className="section-title">UPCOMING GAMES</h3>
          <Games games={games.upcoming} />
        </Section>

        <Section className="popular">
          <h3 className="section-title">POPULAR GAMES</h3>
          <Games games={games.popular} />
        </Section>

        <Section className="new">
          <h3 className="section-title">NEW GAMES</h3>
          <Games games={games.newGames} />
        </Section>
        <h4 className="rawg-api">API from RAWG.IO</h4>
      </StyledGameList >
    )
  )
}

const StyledGameList = styled(motion.div)`
  flex: 1;
  overflow-y: scroll;
  height: 100vh;

  .searched {
    .section-title {color: var(--shade-4)}
  } 

  .upcoming {
    .section-title {color: var(--shade-1)}
  } 

  .popular {
    .section-title {color: var(--shade-2)}
  } 

  .new {
    .section-title {color: var(--shade-3)}
  } 

  .rawg-api {
    font-size: 1.3rem;
    color: darkred;
    padding: 2rem 0;
    text-align: center;
  }
`;

const Section = styled(motion.div)`
  padding: 3rem 0rem;
  
  .section-title {
    font-family: var(--font-3);
    letter-spacing: 3px;
    text-align: left;
    color: var(--primary);
    padding: 0rem 2rem 1.5rem 1.5rem;
  }

  @media(min-width: 768px) {
    padding: 3rem 1rem;
  }
`;

export default GameList
