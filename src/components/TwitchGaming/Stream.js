import React from 'react';

import styled from 'styled-components';

const Stream = ({
  title = '',
  thumbnail = '',
  user_name = '',
  viewer_count = 0,
  type = '',
}) => {
  const replaceThumbnailStringWithSize = (string, { width, height }) => {
    const widthReplaced = string.replace("{width}", width);

    return widthReplaced.replace("{height}", height);
  }
  return (
    <StyledStream className='hoverable'>
      <a
        href={`https://www.twitch.tv/${user_name}`}
        target='_blank'
        rel="noreferrer"
      >
        <img
          src={replaceThumbnailStringWithSize(
            thumbnail,
            { width: 450, height: 250 }
          )}
          alt='stream-thumbnail'
        />
        <div className="info">
          <p className='title'>{title}</p>
          <p className="user_name">{user_name}</p>
        </div>
      </a>
    </StyledStream>

  )
}

const StyledStream = styled.div`
  width: 97.5vw;

  a {
    display: block; 
  }

  img {
    width: 100%;
    aspect-ratio: 16 / 9;
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

  @media(min-width: 768px) {
    width: auto;
    
    .info {
      padding: 0.5rem 0;
    }
  }
`;

export default Stream
