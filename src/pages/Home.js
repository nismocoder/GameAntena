import React, { useEffect } from "react";
import GameDetail from "../components/GameDetail";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
// components
import { Games } from "../components/";
// styling and animation
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
// import { upcomingGamesURL } from "../API";
import { useLocation, useHistory } from "react-router-dom";
// utils
import { getLocalStorageItem } from "../utils";
import { updateUserAuthInfo } from "../actions/authAction";

// import { usehistory } from "react-router-dom";

const key = "23c3d5a5e3f14be399ecc29f152009c1"; // YOUR KEY GOES HERE
const key_url = `key=${key}`;
// const history = useHistory();

const Home = () => {
  const history = useHistory();
  // useEffect(() => {
  //   if (history.location.pathname === "/") {
  //     return (document.body.style.overflow = "auto");
  //   }
  // }, [pathId]);
  //get the current location
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  // Fetch Games
  const dispatch = useDispatch();

  // get that data back
  const games = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(loadGames());
    if (typeof window !== "undefined") {
      let accessToken = getLocalStorageItem("accessToken");
      let userId = getLocalStorageItem("userId");

      if (userId && accessToken) {
        dispatch(updateUserAuthInfo(userId, accessToken));
      }
    }
  }, [dispatch]);

  return (
    <GameList>
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence>
          <GameDetail pathId={pathId} />
        </AnimatePresence>
        {games.searched.length > 0 && (
          <Section className="searched">
            <h3 className="section-title">Searched Games</h3>
            <Games games={games.searched} />
          </Section>
        )}
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
      </AnimateSharedLayout>
    </GameList>
  );
};

const GameList = styled(motion.div)`
  .searched {
    background-color: var(--shade-4-fade);
    .section-title {color: var(--shade-4)}
  } 

  .upcoming {
    background-color: var(--shade-1-fade);
    .section-title {color: var(--shade-1)}
  } 

  .popular {
    background-color: var(--shade-2-fade);
    .section-title {color: var(--shade-2)}
  } 

  .new {
    background-color: var(--shade-3-fade);
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


export default Home;
