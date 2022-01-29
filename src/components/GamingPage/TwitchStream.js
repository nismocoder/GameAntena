import React from 'react';

import styled from 'styled-components';
import { kNUmberFormatter } from '../../utils';

const TwitchStream = ({
  title = '',
  thumbnail = '',
  user_name = '',
  viewer_count = 0,
}) => {
  const replaceThumbnailStringWithSize = (string, { width, height }) => {
    const widthReplaced = string.replace('{width}', width);

    return widthReplaced.replace('{height}', height);
  };
  return (
    <StyledStream className='hoverable'>
      <a
        href={`https://www.twitch.tv/${user_name}`}
        target='_blank'
        rel='noreferrer'
      >
        <div className='thumbnail'>
          <img
            src={replaceThumbnailStringWithSize(thumbnail, {
              width: 350,
              height: 150,
            })}
            alt='stream-thumbnail'
          />
          <div className='live'>Live</div>
          <div className='viewer-count'>
            {kNUmberFormatter(viewer_count)} viewers
          </div>
        </div>

        <div className='info'>
          <p className='title'>{title}</p>
          <p className='user_name'>{user_name}</p>
        </div>
      </a>
    </StyledStream>
  );
};

const StyledStream = styled.div`
  overflow: hidden;

  .thumbnail {
    position: relative;
    width: 100%;

    img {
      width: 100%;
      aspect-ratio: 16 / 9;
    }

    .live {
      position: absolute;
      top: 10%;
      left: 2%;
      transform: translateY(-50%);
      color: var(--light);
      font-size: 0.85rem;
      padding: 0rem 0.4rem;
      background-color: var(--danger);
      border-radius: 5px;
    }

    .viewer-count {
      position: absolute;
      top: 90%;
      left: 2%;
      transform: translateY(-50%);
      color: var(--light);
      font-size: 0.85rem;
      padding: 0rem 0.25rem;
      background-color: var(--dark-faded);
      border-radius: 2px;
    }
  }

  .info {
    padding: 0.5rem 0.5rem;

    .title {
      color: var(--primary);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 1.1rem;
    }

    .user_name {
      font-size: 0.95rem;
    }
  }

  @media (min-width: 768px) {
    .thumbnail {
      width: fit-content;
    }

    .info {
      padding: 0.5rem 0;
    }
  }
`;

export default TwitchStream;
