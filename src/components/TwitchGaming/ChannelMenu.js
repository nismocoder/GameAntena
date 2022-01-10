import React from 'react';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import { faTimes, faUserAlt, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { twitchAuthForwardUrl } from '../../utils';
import { unlinkTwitchAccountURL } from '../../API';

import { updateUserAuthInfo } from '../../actions/authAction';

import axios from 'axios';

import { ToolTip } from '../Radix';

const ChannelMenu = () => {
  const dispatch = useDispatch();

  const ui = useSelector((state) => state.ui);
  const { user, isLoggedIn, accessToken } = useSelector((state) => state.auth);

  const showChannelMenu = () => {
    dispatch({ type: "SHOW_CHANNEL_MENU" });
  }

  const hideChannelMenu = () => {
    dispatch({ type: "HIDE_CHANNEL_MENU" });
  }

  const handleUnlink = async () => {
    try {
      await axios.get(unlinkTwitchAccountURL(user.id), {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        return
      }
      alert(error);
    }

    dispatch(updateUserAuthInfo(user.id, accessToken));
  }

  return (
    <>
      <AnimatePresence>
        {!ui.showChannelMenu && (
          <StyledChannelMenuDrawer
            onClick={showChannelMenu}
            onMouseEnter={showChannelMenu}
            initial={{ right: '-30%' }}
            animate={{ right: '0%' }}
            exit={{ right: '-30%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="channel-icon">
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
            {
              !user.twitch_user_id && (
                isLoggedIn ? (
                  <ChannelMenuCover>
                    <a href={twitchAuthForwardUrl({
                      clientId: process.env.REACT_APP_TWITCH_CLIENT_ID,
                      authRedirectUri: `${process.env.REACT_APP_BACKEND_URL}/twitch/auth`,
                      scope: ['user:read:email', 'channel:read:subscriptions'],
                      email: user.email
                    })}>
                      <button className='hoverable'>Link your twitch account</button>
                    </a>
                    <FontAwesomeIcon
                      onClick={hideChannelMenu}
                      className='close-icon hoverable'
                      icon={faTimes}
                    />
                  </ChannelMenuCover>
                ) : (
                  <ChannelMenuCover>
                    <Link to='/login'>
                      <button className='hoverable'>Link your twitch account</button>
                    </Link>
                    <FontAwesomeIcon
                      onClick={hideChannelMenu}
                      className='close-icon hoverable'
                      icon={faTimes}
                    />
                  </ChannelMenuCover>
                )
              )
            }

            <Subscribers className="subscribers">
              {
                !user.twitch_channel_qualified ?
                  (
                    <div style={{ padding: '0.5rem 1rem' }}>
                      Your channel isn't qualified to have subscribers
                    </div>
                  ) : (
                    user.twitch_subscribers.length > 0 ? (
                      <div className='subs'>
                        <div className="icons">
                          {
                            user.twitch_subscribers.map(({
                              subscriber_display_picture,
                              subscriber_name
                            }) => (
                              <ToolTip
                                trigger={
                                  <a
                                    href={`https://www.twitch.tv/${subscriber_name}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <img
                                      src={subscriber_display_picture}
                                      className="user-icon hoverable"
                                      alt="subscriber-icon"
                                    />
                                  </a>
                                }
                                content={subscriber_name}
                                theme='dark'
                              />

                            ))
                          }
                          ...
                        </div>
                        <div className="total-subscribers">
                          <span>{user.twitch_subscribers_count} </span>
                          total subscribers
                        </div>
                      </div>
                    ) : (
                      <div style={{ padding: '0.5rem 1rem' }}>
                        You don't have any subscribers
                      </div>
                    )
                  )
              }
            </Subscribers>
            <main>
              <div className="channel-info">
                <div className="channel">
                  <img src={user.twitch_display_picture} alt='channel-icon' />
                  <a
                    href={`https://www.twitch.tv/${user.twitch_display_name}`}
                    target='_blank'
                    rel="noreferrer"
                  >
                    {user.twitch_display_name || 'SomeTwitchChannel'}
                  </a>
                </div>
                <div className="followers">
                  {user.twitch_followers_count > 1 ? (
                    `${user.twitch_followers_count} followers`
                  ) : (
                    `${user.twitch_followers_count} follower`
                  )
                  }

                </div>
              </div>
              <div className='buttons'>
                <button
                  onClick={handleUnlink}
                  className='unlink hoverable'
                >
                  Unlink
                </button>
                <button
                  onClick={hideChannelMenu}
                  className='hoverable hide'
                >
                  Hide
                </button>
              </div>

            </main>


          </StyledChannelMenu>
        )}
      </AnimatePresence>
    </>
  )
}

const ChannelMenuElement = styled(motion.div)`
  position: absolute;
  top: 0%;
  right: 0%;
  box-shadow: var(--box-shadow);
  padding: 1rem;
  border-bottom-left-radius: 5px;
`;

const StyledChannelMenu = styled(ChannelMenuElement)`
  z-index: 2;
  background-color: var(--light);
  color: var(--primary);
  padding: 0 0 0.5rem 1rem;  

  main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    gap: 4rem;

    .channel-info {

      .channel {
        margin-bottom: 0.5rem;

        img {
          width: 2rem;
          border-radius: 50%;
        }

        a {
          font-weight: 600;
          letter-spacing: 0.5px;
          color: var(--shade-2);
          text-decoration: underline;
        }
      }

      .followers {
        font-size: 0.9rem;
        color: var(--primary-light);
      }
    }

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

    
  }

  
`;

const ChannelMenuCover = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--dark-faded); 
  border-bottom-left-radius: 5px;

  button {
    border: none;
    border-radius: 5px;
    background-color: var(--shade-2); 
    color: var(--light); 
    padding: 0.8rem;
    box-shadow: var(--box-shadow);
  }

  .close-icon {
    position: absolute;
    bottom: 5%;
    left: 5%;
    color: var(--light);
    font-size: 1.2rem;
  }
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

  .subs {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icons {
      display: flex;
      flex-flow: row wrap;
      align-items: flex-end;
      background-color: var(--primary);
      color: var(--light);
      padding: 0.5rem;
      width: 100%;
      gap: 0.5rem;
      border-bottom-left-radius: 5px;
    }

    .user-icon {
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 50%;
    }

    .total-subscribers {
      font-size: 0.85rem;
      line-height: 1rem;

      span {
        font-weight: 600;
      }
    }
  }
  
`;

const StyledChannelMenuDrawer = styled(ChannelMenuElement)`
  z-index: 3;
  background-color: var(--shade-4);
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



export default ChannelMenu
