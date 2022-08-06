import * as React from "react";
import { useLocation } from "react-router-dom";

import styled from "styled-components";
import { motion } from "framer-motion";

import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import { getGameSectionUrl } from "../../utils/basedOnPath";
import { AdjustToSideMenu, AdjustToSideMenuLoader } from "../../pages/layout";
import { YoutubeStream, TwitchChannel, YoutubeChannel, TwitchStream } from ".";
import { searchStreamsActions } from "../../redux/seachStreams";

function GamingStreams({ gamingStreams = [], isLoading = false, error }) {
  const location = useLocation();
  const { pathname } = location;

  const dispatch = useDispatch();

  const {
    twitch,
    youtube,
    isLoading: searchLoading
  } = useSelector((state) => state.searchStreams);

  const elementRef = React.createRef();

  const getTwitchStreams = (streams = []) => {
    return streams.map(
      ({
        id,
        title,
        thumbnail_url: thumbnailUrl,
        user_name: userName,
        viewer_count: viewerCount
      }) => (
        <TwitchStream
          key={id}
          title={title}
          thumbnail={thumbnailUrl}
          username={userName}
          viewerCount={viewerCount}
        />
      )
    );
  };

  const getYoutubeStreams = (streams = []) => {
    return streams.map(
      ({
        id,
        title,
        thumbnail_url: thumbnailUrl,
        channel_name: channelName,
        viewer_count: viewerCount
      }) => (
        <YoutubeStream
          key={id}
          streamId={id}
          title={title}
          thumbnail={thumbnailUrl}
          channelName={channelName}
          viewerCount={viewerCount}
        />
      )
    );
  };

  const getTwitchChannels = (channels = []) => {
    return channels.map(
      ({
        id,
        user_name: userName,
        thumbnail_url: thumbnailUrl,
        total_followers: totalFollowers
      }) => (
        <TwitchChannel
          key={id}
          username={userName}
          thumbnail={thumbnailUrl}
          totalFollowers={totalFollowers}
        />
      )
    );
  };

  const getYoutubeChannels = (channels = []) => {
    return channels.map(
      ({
        id,
        channel_name: channelName,
        thumbnail_url: thumbnailUrl,
        total_subscribers: totalSubscribers,
        hidden_subscribers: hiddenSubscribers
      }) => (
        <YoutubeChannel
          key={id}
          channelId={id}
          channelName={channelName}
          thumbnail={thumbnailUrl}
          totalSubscribers={totalSubscribers}
          subscribersAreHidden={hiddenSubscribers}
        />
      )
    );
  };

  const removeTwitchSearchResult = (toBeRemoved = "") => {
    dispatch(searchStreamsActions.REMOVE_TWITCH_SEARCH_RESULT(toBeRemoved));
  };

  const removeYoutubeSearchResult = (toBeRemoved = "") => {
    dispatch(searchStreamsActions.REMOVE_YOUTUBE_SEARCH_RESULT(toBeRemoved));
  };

  return (
    <AdjustToSideMenu ref={elementRef}>
      {isLoading || searchLoading ? (
        <AdjustToSideMenuLoader />
      ) : (
        <Content>
          {error ? (
            <h2 className="error">{error}</h2>
          ) : (
            <>
              <div className="search-results">
                {pathname === "/twitch-gaming" &&
                  twitch.searchResult.streams.length > 0 && (
                    <Section>
                      <h4 className="section-title">
                        Twitch streams related to &quot;{twitch.searchQuery}
                        &quot;
                        <FontAwesomeIcon
                          className="remove-search hoverable"
                          icon={faCircleXmark}
                          onClick={() => removeTwitchSearchResult("streams")}
                        />
                      </h4>

                      <Streams>
                        {getTwitchStreams(twitch.searchResult.streams)}
                      </Streams>
                    </Section>
                  )}

                {pathname === "/twitch-gaming" &&
                  twitch.searchResult.channels.length > 0 && (
                    <Section>
                      <h4 className="section-title">
                        Channels related to &quot;{twitch.searchQuery}&quot;
                        <FontAwesomeIcon
                          className="remove-search hoverable"
                          icon={faCircleXmark}
                          onClick={() => removeTwitchSearchResult("channels")}
                        />
                      </h4>

                      <Channels>
                        {getTwitchChannels(twitch.searchResult.channels)}
                      </Channels>
                    </Section>
                  )}

                {pathname === "/youtube-gaming" &&
                  youtube.searchResult.streams.length > 0 && (
                    <Section>
                      <h4 className="section-title">
                        &quot;{youtube.searchQuery}&quot; related YouTube
                        streams
                        <FontAwesomeIcon
                          className="remove-search hoverable"
                          icon={faCircleXmark}
                          onClick={() => removeYoutubeSearchResult("streams")}
                        />
                      </h4>

                      <Streams>
                        {getYoutubeStreams(youtube.searchResult.streams)}
                      </Streams>
                    </Section>
                  )}

                {pathname === "/youtube-gaming" &&
                  youtube.searchResult.channels.length > 0 && (
                    <Section>
                      <h4 className="section-title">
                        Channels related to &quot;{youtube.searchQuery}&quot;
                        <FontAwesomeIcon
                          className="remove-search hoverable"
                          icon={faCircleXmark}
                          onClick={() => removeYoutubeSearchResult("channels")}
                        />
                      </h4>

                      <Streams>
                        {getYoutubeChannels(youtube.searchResult.channels)}
                      </Streams>
                    </Section>
                  )}
              </div>
              <hr />
              {gamingStreams.length > 0 &&
                gamingStreams.map((section) => (
                  <React.Fragment key={section.game}>
                    <Section>
                      <a
                        href={getGameSectionUrl(pathname, section.game)}
                        target="_blank"
                        rel="noreferrer"
                        className="link"
                      >
                        <h4 className="section-title">{section.game}</h4>
                      </a>
                      <Streams>
                        {pathname === "/twitch-gaming" &&
                          getTwitchStreams(section.streams)}

                        {pathname === "/youtube-gaming" &&
                          getYoutubeStreams(section.streams)}
                      </Streams>
                    </Section>
                    <a
                      href={getGameSectionUrl(pathname, section.game)}
                      target="_blank"
                      rel="noreferrer"
                      className="show-more link"
                    >
                      Show more of this
                    </a>
                    <hr />
                  </React.Fragment>
                ))}
            </>
          )}
        </Content>
      )}
    </AdjustToSideMenu>
  );
}

const Content = styled(motion.div)`
  .section-title {
    display: flex;
    gap: 3rem;
    align-items: center;
    font-family: var(--font-3);
    letter-spacing: 3px;
    text-align: left;
    color: var(--shade-2);
    padding: 0rem 0rem 1.5rem 1.5rem;

    .remove-search {
      font-size: 1.5rem;
    }
  }

  .show-more {
    display: block;
    width: fit-content;
    text-decoration: underline;
    margin: 0 auto;
    padding: 1rem;
    color: var(--shade-2);
  }
`;

const Section = styled.div`
  padding: 3rem 0 1rem 0;

  a {
    display: block;
  }

  a.link {
    width: fit-content;
  }

  a:hover {
    text-decoration: underline;
  }

  @media (min-width: 768px) {
    padding: 3rem 1rem 1rem 1rem;
  }
`;

const Streams = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  }
`;

const Channels = styled.div`
  padding: 0 2rem;
  display: grid;
  gap: 2rem;

  @media (min-width: 425px) {
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }
`;

export default GamingStreams;
