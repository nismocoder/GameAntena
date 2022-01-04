import React from "react";

import { GameList } from '../components';

import WithSideMenuAndNav from "./layout/WithSideMenuAndNav";

const Home = () => {

  return (
    <WithSideMenuAndNav>
      <GameList />
    </WithSideMenuAndNav>
  );
};

export default Home;
