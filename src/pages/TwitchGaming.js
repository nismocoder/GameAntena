import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import { Loader, PopupMessage } from '../components';
import { GamingStreams, ChannelMenu } from '../components/GamingPage';
import { WithSideMenuAndNav } from './layout';

import { getTwitchTopGamingStreams } from '../services/streams/twitchStreams';

const TwitchGaming = () => {
  document.title = 'Browse Twitch top gaming streams';

  const { data, isLoading, error } = useQuery(
    'top-twitch-gaming-streams',
    getTwitchTopGamingStreams,
    {
      refetchOnWindowFocus: false,
    },
  );

  const getErrorMessage = error?.response
    ? error.response.data.message
    : error?.message;

  return (
    <WithSideMenuAndNav>
      <PopupMessage>
        By using Game-Antena's service you agree to our{' '}
        <Link to='/privacy-policy'>Privacy policy</Link> and its{' '}
        <Link to='/terms-and-conditions'>Terms</Link>. Game-Antena also uses
        Youtube API Services to bring you gaming related experiences from
        YouTube
      </PopupMessage>
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

export default TwitchGaming;
