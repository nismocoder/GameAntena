import React from 'react';

import { Loader } from '../components';
import { GamingStreams } from '../components/TwitchGaming';

import { WithSideMenuAndNav } from './layout';

import { useFetch } from '../hooks';
import { topGamingStreamsURL } from '../API';

const TwitchGaming = () => {
  const { data, loading, error } = useFetch(topGamingStreamsURL());

  return (
    <WithSideMenuAndNav>
      {loading ? (
        <div style={{ width: '100vw', height: '100vh', flex: 1 }} >
          <Loader style={{ transform: 'scale(2)' }} />
        </div >
      ) : (
        <GamingStreams gaming_streams={data} />
      )}
    </WithSideMenuAndNav>
  )
}

export default TwitchGaming
