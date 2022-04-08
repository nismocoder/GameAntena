import React from 'react';
import { useQuery } from 'react-query';

import { Loader } from '../components';
import { GamingStreams, ChannelMenu } from '../components/GamingPage';
import { getYoutubeTopGamingStreams } from '../services/streams/youtubeStreams';

import { WithSideMenuAndNav } from './layout';

const YoutubeGaming = () => {
  document.title = 'Browse YouTube top gaming streams';

  const { data, isLoading, error } = useQuery(
    'top-youtube-gaming-streams',
    getYoutubeTopGamingStreams,
    {
      refetchOnWindowFocus: false,
    },
  );

  const getErrorMessage = error?.response
    ? error.response.data.message
    : error?.message;

  return (
    <WithSideMenuAndNav>
      <ChannelMenu />
      {isLoading ? (
        <div style={{ width: '100vw', height: '100vh', flex: 1 }}>
          <Loader style={{ transform: 'scale(2)' }} />
        </div>
      ) : (
        <GamingStreams gaming_streams={data} error={getErrorMessage} />
      )}
    </WithSideMenuAndNav>
  );
};

export default YoutubeGaming;
