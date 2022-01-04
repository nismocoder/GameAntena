import React from 'react';

import { useSelector } from "react-redux";

import styled from "styled-components";

import { GameDetail, Games, Loader } from ".";

const GameList = () => {
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
        className={`${showSideMenu ? 'scrollable' : ''}`}
      >
        <GameDetail />
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

const StyledGameList = styled.div`
  flex: 1;
  overflow-y: scroll;
  height: calc(100vh - 56px);

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

  @media(min-width: 768px) {
    height: calc(100vh - 77px);
  }
`;

const Section = styled.div`
  padding: 3rem 0rem;
  
  .section-title {
    font-family: var(--font-3);
    letter-spacing: 3px;
    text-align: left;
    color: var(--primary);
    padding: 0rem 0rem 1.5rem 1.5rem;
  }

  @media(min-width: 768px) {
    padding: 3rem 1rem;
  }
`;

export default GameList
