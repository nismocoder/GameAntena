import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import styled from 'styled-components';

import { GameDetails, Games, Loader } from '.';
import { AdjustToSideMenu } from '../pages/layout';

import { getGames } from '../services/games/gamesAPI';

const GameList = () => {
  const dispatch = useDispatch();
  const { searchedGames, isLoading } = useSelector((state) => state.games);

  const { data: games, isLoading: loadingGames } = useQuery('games', getGames);

  React.useEffect(() => {
    if (loadingGames) return dispatch({ type: 'LOADING_SEARCH_GAMES' });
    return dispatch({ type: 'LOADING_SEARCH_GAMES_FINISHED' });
  }, [dispatch, loadingGames]);

  const elementRef = React.createRef();

  return isLoading ? (
    <div style={{ width: '100vw', height: '100vh', flex: 1 }}>
      <Loader style={{ transform: 'scale(2)' }} />
    </div>
  ) : (
    <AdjustToSideMenu ref={elementRef}>
      <AdjustToSideMenuContent>
        <GameDetails />
        {searchedGames.length > 0 && (
          <Section className='searched'>
            <h4 className='section-title'>Searched Games</h4>
            <Games games={searchedGames} />
          </Section>
        )}
        <Section className='upcoming'>
          <h4 className='section-title'>UPCOMING GAMES</h4>
          <Games games={games.upcoming} />
        </Section>
        <Section className='popular'>
          <h4 className='section-title'>POPULAR GAMES</h4>
          <Games games={games.popular} />
        </Section>
        <Section className='new'>
          <h4 className='section-title'>NEW GAMES</h4>
          <Games games={games.newGames} />
        </Section>
        <h4 className='rawg-api'>API from RAWG.IO</h4>
      </AdjustToSideMenuContent>
    </AdjustToSideMenu>
  );
};

const AdjustToSideMenuContent = styled.div`
  .searched {
    .section-title {
      color: var(--shade-4);
    }
  }

  .upcoming {
    .section-title {
      color: var(--shade-1);
    }
  }

  .popular {
    .section-title {
      color: var(--shade-2);
    }
  }

  .new {
    .section-title {
      color: var(--shade-3);
    }
  }

  .rawg-api {
    font-size: 1.3rem;
    color: darkred;
    padding: 2rem 0;
    text-align: center;
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

  @media (min-width: 768px) {
    padding: 3rem 1rem;
  }
`;

export default GameList;
