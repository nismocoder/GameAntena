import React from 'react';

import styled from 'styled-components';

import Stream from './Stream';

import { useSelector } from 'react-redux';

import { motion } from 'framer-motion';



const GamingStreams = ({ gaming_streams = [], error }) => {
  const { showSideMenu, screen } = useSelector((state) => state.ui);

  const getGamingStreamsVariant = (screenWidth) => {
    const variants = {
      desktop: {
        open: { translateX: '283px' },
        closed: { translateX: '59px' },
      },
      mobile: {
        open: { translateX: '283px' },
        closed: { translateX: '0px' },
      }
    }

    if (screenWidth > 768) {
      return variants.desktop
    }
    return variants.mobile
  }

  return (
    <StyledGamingStreams
      variants={getGamingStreamsVariant(screen.width)}
      animate={showSideMenu ? "open" : "closed"}
      transition={{ duration: 0.4 }}
    >
      {error ? (
        <h2 className="error">
          {error}
        </h2>
      )
        : (
          gaming_streams.map((data = [], i) => (
            <>
              <StreamList key={i}>
                <a
                  href={`https://www.twitch.tv/directory/game/${data.game}`}
                  target='_blank'
                  rel="noreferrer"
                  className='link'
                >
                  <h4 className='section-title'>{data.game}</h4>
                </a>

                <Streams>
                  {data.streams.map(({
                    id,
                    title,
                    thumbnail_url,
                    user_name,
                    viewer_count,
                    type
                  }) => (
                    <Stream
                      key={id}
                      title={title}
                      thumbnail={thumbnail_url}
                      user_name={user_name}
                      viewer_count={viewer_count}
                      type={type}
                    />
                  ))}
                </Streams>
              </StreamList>
              <a
                href={`https://www.twitch.tv/directory/game/${data.game}`}
                target='_blank'
                rel="noreferrer"
                className='show-more link'
              >
                Show more of this
              </a>
              <hr />
            </>
          ))
        )
      }
    </StyledGamingStreams>
  )
}

const StyledGamingStreams = styled(motion.div)`
  overflow-y: scroll;
  height: calc(100vh - 56px);
  width: 100vw;

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


  /* DESKTOP */
  @media(min-width: 768px) {
    width: 95.65vw;
    height: calc(100vh - 77px);
  }
`;

const StreamList = styled.div`
  padding: 3rem 0 1rem 0;

  @media(min-width: 768px) {
    padding: 3rem 1rem 1rem 1rem;
  }
`;

const Streams = styled.div`
  display: grid;
  gap: 1rem;
  
  @media(min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  } 
`;

export default GamingStreams
