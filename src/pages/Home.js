import React from 'react';

import { GameList } from '../components';
import WithSideMenuAndNav from './layout/WithSideMenuAndNav';

const Home = () => {
  document.title = 'Browse upcoming games, popular games, and new games';
  return (
    <WithSideMenuAndNav>
      <GameList />
    </WithSideMenuAndNav>
  );
};

export default Home;
