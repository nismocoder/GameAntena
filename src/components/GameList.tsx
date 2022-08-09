import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

import { RootState } from "src/redux/store";

import { useGetGames } from "../hooks/queries/gameQueries";
import { gamesActions } from "../redux/games";

import { Games } from ".";
import { AdjustToSideMenu, AdjustToSideMenuLoader } from "../pages/layout";

function GameList() {
  const dispatch = useDispatch();

  const { searchGames, isLoading } = useSelector(
    (state: RootState) => state.games
  );

  const { games, gamesLoading, gamesError } = useGetGames();

  React.useEffect(() => {
    if (gamesLoading) {
      dispatch(gamesActions.LOADING_SEARCH_GAMES());
      return;
    }

    dispatch(gamesActions.LOADING_SEARCH_GAMES_FINISHED());
  }, [dispatch, gamesLoading]);

  const elementRef = React.createRef();

  return (
    <AdjustToSideMenu ref={elementRef}>
      {isLoading ? (
        <AdjustToSideMenuLoader />
      ) : (
        <Content>
          {gamesError ? (
            <h2 className="error">{gamesError?.message}</h2>
          ) : (
            <>
              {searchGames.length > 0 && (
                <Section className="searched">
                  <h4 className="section-title">Searched Games</h4>
                  <Games games={searchGames} />
                </Section>
              )}
              <Section className="upcoming">
                <h4 className="section-title">UPCOMING GAMES</h4>
                <Games games={games?.upcoming} />
              </Section>
              <Section className="popular">
                <h4 className="section-title">POPULAR GAMES</h4>
                <Games games={games?.popular} />
              </Section>
              <Section className="new">
                <h4 className="section-title">NEW GAMES</h4>
                <Games games={games?.newGames} />
              </Section>
              <h4 className="rawg-api">API from RAWG.IO</h4>
            </>
          )}
        </Content>
      )}
    </AdjustToSideMenu>
  );
}

const Content = styled.div`
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
