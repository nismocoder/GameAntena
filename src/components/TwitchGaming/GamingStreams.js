import React from 'react';

import { useSelector } from 'react-redux';

import styled from 'styled-components';

import { Loader } from '..';
import Stream from './Stream';

const GamingStreams = ({ gaming_streams = [] }) => {
  const { showSideMenu } = useSelector((state) => state.ui);

  return (
    <StyledGamingStreams
      className={`${showSideMenu ? 'scrollable' : ''}`
      }
    >
      {
        gaming_streams.map((gaming_stream, i) => (
          <StreamList key={i}>
            <h3 className='section-title'>{gaming_stream.game}</h3>
            <Streams>
              {gaming_stream.streams.map(({
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
        ))
      }
    </StyledGamingStreams >
  )
}

const StyledGamingStreams = styled.div`
  flex: 1;
  overflow-y: scroll;
  height: calc(100vh - 56px);

  .section-title {
    font-family: var(--font-3);
    letter-spacing: 3px;
    text-align: left;
    color: var(--shade-2);
    padding: 0rem 0rem 1.5rem 1.5rem;
  }

  @media(min-width: 768px) {
    height: calc(100vh - 77px);
  }
`;

const StreamList = styled.div`
  padding: 3rem 0;

  @media(min-width: 768px) {
    padding: 3rem 1rem;
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
