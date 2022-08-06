import * as React from "react";

import { Alert, PopupMessage } from "../../components";
import { GamingStreams, ChannelMenu } from "../../components/GamingStreams";
import { WithSideMenuAndNav } from "../layout";

import { useGetTwitchTopGamingStreams } from "../../hooks/queries/twitchQueries";
import { getPopupMessage } from "../../constants/messages";

function TwitchGaming() {
  document.title = "Browse Twitch top gaming streams";

  const { twitchTopGamingStreams, isLoading, error } =
    useGetTwitchTopGamingStreams();

  const errorMessage = error?.response
    ? error.response.data.message
    : error?.message;

  return (
    <WithSideMenuAndNav>
      <Alert />
      <PopupMessage>{getPopupMessage()}</PopupMessage>
      <ChannelMenu />
      <GamingStreams
        gamingStreams={twitchTopGamingStreams}
        error={errorMessage}
        isLoading={isLoading}
      />
    </WithSideMenuAndNav>
  );
}

export default TwitchGaming;
