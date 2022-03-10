import React from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';
import { motion } from 'framer-motion';

import { TwitchStream, YoutubeStream } from '.';
import { AdjustToSideMenu } from '../../pages/layout';

import { getGameSectionUrl } from '../../utils/basedOnPath';

const GamingStreams = ({ gaming_streams = [], error }) => {
  const history = useHistory();
  const pathname = history.location.pathname;

  const elementRef = React.createRef();

  const getTwitchStreams = (streams = []) => {
    return streams.map(
      ({ id, title, thumbnail_url, user_name, viewer_count }) => (
        <TwitchStream
          key={id}
          title={title}
          thumbnail={thumbnail_url}
          user_name={user_name}
          viewer_count={viewer_count}
        />
      ),
    );
  };

  const getYoutubeStreams = (streams = []) => {
    return streams.map(
      ({ id, title, thumbnail_url, channel_name, viewer_count }) => (
        <YoutubeStream
          video_id={id}
          key={id}
          title={title}
          thumbnail={thumbnail_url}
          channel_name={channel_name}
          viewer_count={viewer_count}
        />
      ),
    );
  };

  return (
    <AdjustToSideMenu ref={elementRef}>
      <AdjustToSideMenuContent>
        {error ? (
          <h2 className='error'>{error}</h2>
        ) : (
          gaming_streams.map((data = [], i) => (
            <React.Fragment key={i}>
              <StreamList>
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
              </StreamList>
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
          ))
        )}
      </AdjustToSideMenuContent>
    </AdjustToSideMenu>
  );
};

const AdjustToSideMenuContent = styled(motion.div)`
  .error {
    text-align: center;
    padding: 3rem 1rem;
    font-family: var(--font-3);
    letter-spacing: 0.2rem;
    word-spacing: 1rem;
    color: var(--danger);
  }

  a {
    display: block;
  }

  a.link {
    width: fit-content;
  }

  a:hover {
    text-decoration: underline;
  }

  .section-title {
    font-family: var(--font-3);
    letter-spacing: 3px;
    text-align: left;
    color: var(--shade-2);
    padding: 0rem 0rem 1.5rem 1.5rem;
  }

  .show-more {
    text-decoration: underline;
    margin: 0 auto;
    padding: 1rem;
    color: var(--shade-2);
  }
`;

const StreamList = styled.div`
  padding: 3rem 0 1rem 0;

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

export default GamingStreams;
