import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { faUserAlt, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  getAuthForwardUrl,
  getChannelMenuBackground
} from "../../../utils/basedOnPath";

import TwitchSubscribers from "./TwitchSubscribers";
import YoutubeSubscribers from "./YoutubeSubscribers";
import TwitchChannelInfo from "./TwitchChannelInfo";
import YoutubeChannelInfo from "./YoutubeChannelInfo";
import ChannelMenuCover from "./ChannelMenuCover";

import { useGetUserTwitchData } from "../../../hooks/queries/twitchQueries";
import { useGetUserYoutubeData } from "../../../hooks/queries/youtubeQueries";
import { uiActions } from "../../../redux/ui";
import { getAuthInfo } from "../../../utils/auth";
import { useGetUserData } from "../../../hooks/queries/userQueries";
import { useUnlinkPlatformAccount } from "../../../hooks/mutations/userMutations";

function ChannelMenu() {
  const dispatch = useDispatch();

  const location = useLocation();
  const { pathname } = location;

  const ui = useSelector((state) => state.ui);

  const { accessToken } = getAuthInfo();

  const { userData: user } = useGetUserData(accessToken);

  const { userTwitchData } = useGetUserTwitchData(accessToken, pathname);
  const { userYoutubeData } = useGetUserYoutubeData(accessToken, pathname);

  const { mutatePlatformAccount } = useUnlinkPlatformAccount(accessToken);

  const showChannelMenu = () => {
    dispatch(uiActions.SHOW_CHANNEL_MENU());
  };

  const hideChannelMenu = () => {
    dispatch(uiActions.HIDE_CHANNEL_MENU());
  };

  const handleUnlink = () => {
    if (pathname === "/twitch-gaming") return mutatePlatformAccount("twitch");
    if (pathname === "/youtube-gaming") return mutatePlatformAccount("youtube");

    throw new Error("pathname must be either of the two ['twitch', 'yotube']");
  };

  return (
    <>
      <AnimatePresence>
        {!ui.showChannelMenu && (
          <StyledChannelMenuDrawer
            style={{ backgroundColor: getChannelMenuBackground(pathname) }}
            onClick={showChannelMenu}
            onMouseEnter={showChannelMenu}
            initial={{ right: "-30%" }}
            animate={{ right: "0%" }}
            exit={{ right: "-30%" }}
            transition={{ duration: 0.3 }}
            data-testid="channel-menu-drawer"
          >
            <div className="channel-icon">
              <FontAwesomeIcon className="person" icon={faUserAlt} />
              <FontAwesomeIcon className="video" icon={faVideo} />
            </div>
          </StyledChannelMenuDrawer>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ui.showChannelMenu && (
          <StyledChannelMenu
            initial={{ right: "-100%" }}
            animate={{ right: "0%" }}
            exit={{ right: "-100%" }}
            transition={{ duration: 0.4 }}
            data-testid="channel-menu"
          >
            {/* Show ChannelMenuCover until userTwitchData or userYoutubeData is undefined */}
            {pathname === "/twitch-gaming" &&
              !userTwitchData.twitch_user_id && (
                <ChannelMenuCover
                  authForwardUrl={getAuthForwardUrl(pathname, user?.email)}
                  backgroundColor={getChannelMenuBackground(pathname)}
                  platformName="Twitch"
                  pathname={pathname}
                />
              )}

            {pathname === "/youtube-gaming" &&
              !userYoutubeData.youtube_user_id && (
                <ChannelMenuCover
                  authForwardUrl={getAuthForwardUrl(pathname, user?.email)}
                  backgroundColor={getChannelMenuBackground(pathname)}
                  platformName="YouTube"
                  pathname={pathname}
                />
              )}

            <Subscribers className="subscribers">
              {pathname === "/twitch-gaming" && (
                <TwitchSubscribers userTwitchData={userTwitchData} />
              )}
              {pathname === "/youtube-gaming" && (
                <YoutubeSubscribers userYoutubeData={userYoutubeData} />
              )}
            </Subscribers>

            <MainContent>
              {pathname === "/twitch-gaming" && (
                <TwitchChannelInfo userTwitchData={userTwitchData} />
              )}
              {pathname === "/youtube-gaming" && (
                <YoutubeChannelInfo userYoutubeData={userYoutubeData} />
              )}
              <div className="buttons">
                <button
                  type="button"
                  onClick={handleUnlink}
                  className="unlink hoverable"
                >
                  Unlink
                </button>
                <button
                  type="button"
                  onClick={hideChannelMenu}
                  className="hoverable hide"
                  data-testid="hide-button"
                >
                  Hide
                </button>
              </div>
            </MainContent>
          </StyledChannelMenu>
        )}
      </AnimatePresence>
    </>
  );
}

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
