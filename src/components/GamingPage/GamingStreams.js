import React from 'react';
import { useLocation } from 'react-router-dom';

import styled from 'styled-components';
import { motion } from 'framer-motion';

import { TwitchStream, YoutubeStream, TwitchChannel, YoutubeChannel } from '.';
import { AdjustToSideMenu } from '../../pages/layout';

import { getGameSectionUrl } from '../../utils/basedOnPath';
import { useSelector } from 'react-redux';

const GamingStreams = ({ gaming_streams = [], error }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const { twitch, youtube, isLoading } = useSelector((state) => state.streams);

  const elementRef = React.createRef();

  const getTwitchStreams = (streams = []) => {
    return streams.map(
      ({ id, title, thumbnail_url, user_name, viewer_count }) => (
        <TwitchStream
          key={id}
          title={title}
          thumbnail={thumbnail_url}
          username={user_name}
          viewerCount={viewer_count}
        />
      ),
    );
  };

  const getTwitchChannels = (channels = []) => {
    return channels.map(({ id, user_name, thumbnail_url, total_followers }) => (
      <TwitchChannel
        key={id}
        username={user_name}
        thumbnail={thumbnail_url}
        totalFollowers={total_followers}
      />
    ));
  };

  const getYoutubeChannels = (channels = []) => {
    return channels.map(
      ({
        id,
        channel_name,
        thumbnail_url,
        total_subscribers,
        hidden_subscribers,
      }) => (
        <YoutubeChannel
          key={id}
          channelId={id}
          channelName={channel_name}
          thumbnail={thumbnail_url}
          totalSubscribers={total_subscribers}
          subscribersAreHidden={hidden_subscribers}
        />
      ),
    );
  };

  const getYoutubeStreams = (streams = []) => {
    return streams.map(
      ({ id, title, thumbnail_url, channel_name, viewer_count }) => (
        <YoutubeStream
          key={id}
          streamId={id}
          title={title}
          thumbnail={thumbnail_url}
          channelName={channel_name}
          viewerCount={viewer_count}
        />
      ),
    );
  };

  return (
    <AdjustToSideMenu ref={elementRef} isLoading={isLoading}>
      <Content>
        {error ? (
          <h2 className='error'>{error}</h2>
        ) : (
          <>
            <div className='search-results'>
              {pathname === '/twitch-gaming' &&
                twitch.searchResult.streams.length > 0 && (
                  <Section>
                    <h4 className='section-title'>
                      "{twitch.searchQuery}" related Twitch streams
                    </h4>

                    <Streams>
                      {getTwitchStreams(twitch.searchResult.streams)}
                    </Streams>
                  </Section>
                )}

              {pathname === '/twitch-gaming' &&
                twitch.searchResult.channels.length > 0 && (
                  <Section>
                    <h4 className='section-title'>
                      Channels related to "{twitch.searchQuery}"
                    </h4>

                    <Channels>
                      {getTwitchChannels(twitch.searchResult.channels)}
                    </Channels>
                  </Section>
                )}

              {pathname === '/youtube-gaming' &&
                youtube.searchResult.streams.length > 0 && (
                  <Section>
                    <h4 className='section-title'>
                      "{youtube.searchQuery}" related YouTube streams
                    </h4>

                    <Streams>
                      {getYoutubeStreams(youtube.searchResult.streams)}
                    </Streams>
                  </Section>
                )}

              {pathname === '/youtube-gaming' &&
                youtube.searchResult.channels.length > 0 && (
                  <Section>
                    <h4 className='section-title'>
                      Channels related to "{youtube.searchQuery}"
                    </h4>

                    <Streams>
                      {getYoutubeChannels(youtube.searchResult.channels)}
                    </Streams>
                  </Section>
                )}
            </div>
            <hr />
            {gaming_streams.length > 0 &&
              gaming_streams.map((data, i) => (
                <React.Fragment key={i}>
                  <Section>
                    <a
                      href={getGameSectionUrl(pathname, data.game)}
                      target='_blank'
                      rel='noreferrer'
                      className='link'
                    >
                      <h4 className='section-title'>{data.game}</h4>
                    </a>

                    <Streams>
                      {pathname === '/twitch-gaming' &&
                        getTwitchStreams(data.streams)}

                      {pathname === '/youtube-gaming' &&
                        getYoutubeStreams(data.streams)}
                    </Streams>
                  </Section>
                  <a
                    href={getGameSectionUrl(pathname, data.game)}
                    target='_blank'
                    rel='noreferrer'
                    className='show-more link'
                  >
                    Show more of this
                  </a>
                  <hr />
                </React.Fragment>
              ))}
          </>
        )}
      </Content>
    </AdjustToSideMenu>
  );
};

const Content = styled(motion.div)`
  .section-title {
    font-family: var(--font-3);
    letter-spacing: 3px;
    text-align: left;
    color: var(--shade-2);
    padding: 0rem 0rem 1.5rem 1.5rem;
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
