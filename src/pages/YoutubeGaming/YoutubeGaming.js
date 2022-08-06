import * as React from "react";

import { Alert, PopupMessage } from "../../components";
import { GamingStreams, ChannelMenu } from "../../components/GamingStreams";
import { getPopupMessage } from "../../constants/messages";
import { useGetYoutubeTopGamingStreams } from "../../hooks/queries/youtubeQueries";

import { WithSideMenuAndNav } from "../layout";

function YoutubeGaming() {
  document.title = "Browse YouTube top gaming streams";

  const { youtubeTopGamingStreams, isLoading, error } =
    useGetYoutubeTopGamingStreams();

  const getErrorMessage = error?.response
    ? error.response.data.message
    : error?.message;

  return (
    <WithSideMenuAndNav>
      <Alert />
      <PopupMessage>{getPopupMessage()}</PopupMessage>
      <ChannelMenu />
      <GamingStreams
        gamingStreams={youtubeTopGamingStreams}
        error={getErrorMessage}
        isLoading={isLoading}
      />
    </WithSideMenuAndNav>
  );
}

export default YoutubeGaming;
