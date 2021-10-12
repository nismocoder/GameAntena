import React, { useEffect } from "react";
import GameDetail from "../components/GameDetail";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
// components
import Game from "../components/Game";
// styling and animation
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
// import { upcomingGamesURL } from "../API";
import { useLocation } from "react-router-dom";
// import { usehistory } from "react-router-dom";

const key = "23c3d5a5e3f14be399ecc29f152009c1"; // YOUR KEY GOES HERE
const key_url = `key=${key}`;
// const history = useHistory();

const Home = () => {
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
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  // get that data back
  const { popular, newGames, upcoming, searched } = useSelector(
    (state) => state.games
  );
  // console.log(games);
  return (
    <GameList>
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence>
          {pathId && <GameDetail pathId={pathId} />}
        </AnimatePresence>
        {searched.length ? (
          <div className="searched">
            <h2>Searched Games</h2>
            <Games>
              {searched.map((game) => (
                <Game
                  name={game.name}
                  released={game.released}
                  id={game.id}
                  image={game.background_image}
                  key={game.id}
                />
              ))}
            </Games>
          </div>
        ) : (
          ""
        )}
        <h2>UPCOMING GAMES</h2>
        <Games>
          {upcoming.map((game) => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
            />
          ))}
        </Games>
        <h2>POPULAR GAMES</h2>
        <Games>
          {popular.map((game) => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
            />
          ))}
        </Games>
        <h2>NEW GAMES</h2>
        <Games>
          {newGames.map((game) => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
            />
          ))}
          <h4>API from RAWG.IO</h4>
        </Games>
      </AnimateSharedLayout>
    </GameList>
  );
};

const GameList = styled(motion.div)`
  padding: 0rem 2rem 5rem 2rem;
  h2 {
    padding: 6rem 0rem;
  }
`;

const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
  h4 {
    font-weight: bold;
    font-size: 1.3rem;
    color: darkred;
    padding: 1.1rem 4rem;
  }
`;

export default Home;
