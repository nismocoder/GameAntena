import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import { faUserAlt, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  getAuthForwardUrl,
  getChannelMenuBackground,
} from '../../../utils/basedOnPath';

import TwitchSubscribers from './TwitchSubscribers';
import YoutubeSubscribers from './YoutubeSubscribers';
import TwitchChannelInfo from './TwitchChannelInfo';
import YoutubeChannelInfo from './YoutubeChannelInfo';
import ChannelMenuCover from './ChannelMenuCover';

import {
  unlinkTwitchAccountURL,
  unlinkYoutubeAccountURL,
} from '../../../utils/apiUrls';

import axios from 'axios';

import { getUserTwitchData } from '../../../services/user/twitchData';
import { getUserYoutubeData } from '../../../services/user/youtubeData';

const initialTwitchData = {
  twitch_user_id: '',
  twitch_followers_count: 15420,
  twitch_display_name: 'SomeTwitchChannel',
  twitch_display_picture:
    'https://static-cdn.jtvnw.net/jtv_user_pictures/54c59710-6f7a-44f9-b1a1-75b8a3d38ce7-profile_image-300x300.png',
  subscribers: [],
  twitch_channel_qualified: true,
};

const initialYoutubeData = {
  youtube_user_id: '',
  youtube_display_name: 'My YouTube Channel',
  youtube_display_picture:
    'https://yt3.ggpht.com/XvMwB4gwGxnMUZZIMPNw6eZgebSCJskpko45RfqMT_jKFBgohCUsAB4wc0LYJbaiLA17Aw6pUw=s600-c-k-c0x00ffffff-no-rj-rp-mo',
  subscribers: [],
  youtube_subscribers_count: 69420,
};

const ChannelMenu = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const pathname = location.pathname;

  const ui = useSelector((state) => state.ui);
  const { user, accessToken } = useSelector((state) => state.auth);

  const queryClient = useQueryClient();

  const { data: userTwitchData } = useQuery(
    'user-twitch-data',
    () => getUserTwitchData(user.id, accessToken),
    {
      initialData: initialTwitchData,
      enabled: !!user?.id,
      retry: false,
    },
  );

  const { data: userYoutubeData } = useQuery(
    'user-youtube-data',
    () => getUserYoutubeData(user.id, accessToken),
    {
      initialData: initialYoutubeData,
      enabled: !!user?.id,
      retry: false,
    },
  );

  const showChannelMenu = () => {
    dispatch({ type: 'SHOW_CHANNEL_MENU' });
  };

  const hideChannelMenu = () => {
    dispatch({ type: 'HIDE_CHANNEL_MENU' });
  };

  const unlinkTwitchAccount = async () => {
    await axios.get(unlinkTwitchAccountURL(user.id), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    queryClient.resetQueries('user-twitch-data', { exact: true });
  };

  const unlinkYoutubeAccount = async () => {
    await axios.get(unlinkYoutubeAccountURL(user.id), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    queryClient.resetQueries('user-youtube-data', { exact: true });
  };

  const handleUnlink = () => {
    try {
      if (pathname === '/twitch-gaming') return unlinkTwitchAccount();
      if (pathname === '/youtube-gaming') return unlinkYoutubeAccount();
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        return;
      }
      alert(error);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!ui.showChannelMenu && (
          <StyledChannelMenuDrawer
            style={{ backgroundColor: getChannelMenuBackground(pathname) }}
            onClick={showChannelMenu}
            onMouseEnter={showChannelMenu}
            initial={{ right: '-30%' }}
            animate={{ right: '0%' }}
            exit={{ right: '-30%' }}
            transition={{ duration: 0.3 }}
          >
            <div className='channel-icon'>
              <FontAwesomeIcon className='person' icon={faUserAlt} />
              <FontAwesomeIcon className='video' icon={faVideo} />
            </div>
          </StyledChannelMenuDrawer>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ui.showChannelMenu && (
          <StyledChannelMenu
            initial={{ right: '-100%' }}
            animate={{ right: '0%' }}
            exit={{ right: '-100%' }}
            transition={{ duration: 0.4 }}
          >
            {/* Show ChannelMenuCover until userTwitchData or userYoutubeData is undefined */}
            {pathname === '/twitch-gaming' &&
              !userTwitchData.twitch_user_id && (
                <ChannelMenuCover
                  authForwardUrl={getAuthForwardUrl(pathname, user.email)}
                  backgroundColor={getChannelMenuBackground(pathname)}
                  platformName={'Twitch'}
                  pathname={pathname}
                />
              )}

            {pathname === '/youtube-gaming' &&
              !userYoutubeData.youtube_user_id && (
                <ChannelMenuCover
                  authForwardUrl={getAuthForwardUrl(pathname, user.email)}
                  backgroundColor={getChannelMenuBackground(pathname)}
                  platformName={'YouTube'}
                  pathname={pathname}
                />
              )}

            <Subscribers className='subscribers'>
              {pathname === '/twitch-gaming' && (
                <TwitchSubscribers userTwitchData={userTwitchData} />
              )}
              {pathname === '/youtube-gaming' && (
                <YoutubeSubscribers userYoutubeData={userYoutubeData} />
              )}
            </Subscribers>

            <MainContent>
              {pathname === '/twitch-gaming' && (
                <TwitchChannelInfo userTwitchData={userTwitchData} />
              )}
              {pathname === '/youtube-gaming' && (
                <YoutubeChannelInfo userYoutubeData={userYoutubeData} />
              )}
              <div className='buttons'>
                <button onClick={handleUnlink} className='unlink hoverable'>
                  Unlink
                </button>
                <button onClick={hideChannelMenu} className='hoverable hide'>
                  Hide
                </button>
              </div>
            </MainContent>
          </StyledChannelMenu>
        )}
      </AnimatePresence>
    </>
  );
};

const ChannelMenuElement = styled(motion.div)`
  position: absolute;
  top: 0%;
  right: 0%;
  box-shadow: var(--box-shadow);
  padding: 1rem;
  border-bottom-left-radius: 5px;
`;

const StyledChannelMenuDrawer = styled(ChannelMenuElement)`
  z-index: 3;
  color: var(--light);
  cursor: pointer;

  .channel-icon {
    display: flex;

    .person {
      font-size: 1.2rem;
    }
    .video {
      font-size: 0.8rem;
    }
  }
`;

const StyledChannelMenu = styled(ChannelMenuElement)`
  z-index: 2;
  background-color: var(--light);
  color: var(--primary);
  padding: 0 0 0.5rem 1rem;
`;

const Subscribers = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  background-color: var(--primary);
  color: var(--light);
  padding: 0.2rem 0rem 0.2rem 0.5rem;
  gap: 0.5rem;
  border-bottom-left-radius: 5px;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  gap: 4rem;

  .buttons {
    display: flex;
    flex-flow: column;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 1rem 0.5rem 0;
    gap: 1rem;

    button {
      border: none;
      border-radius: 3px;
      background-color: var(--primary-light);
      color: var(--light);
      font-size: 0.95rem;
      padding: 0.2rem 0.5rem;
    }

    .unlink {
      background-color: var(--light);
      color: var(--danger);
      border: 2px solid var(--danger);
    }
  }
`;

export default ChannelMenu;
