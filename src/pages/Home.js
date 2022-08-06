import * as React from "react";
import { Link, Outlet } from "react-router-dom";

import { Alert, GameList, PopupMessage } from "../components";
import WithSideMenuAndNav from "./layout/WithSideMenuAndNav";

function Home() {
  document.title = "Browse upcoming games, popular games, and new games";

  return (
    <WithSideMenuAndNav>
      <Outlet /> {/* Modal router */}
      <Alert />
      <GameList />
      <PopupMessage>
        By using Game-Antena&apos;s service you agree to our{" "}
        <Link to="/privacy-policy">Privacy policy</Link> and its{" "}
        <Link to="/terms-and-conditions">Terms</Link>. Game-Antena also uses
        YouTube API Services to bring you gaming related experiences from
        YouTube
      </PopupMessage>
    </WithSideMenuAndNav>
  );
}

export default Home;
