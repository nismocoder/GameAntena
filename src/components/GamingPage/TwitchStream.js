import React from 'react';
import { numberFormatter, setTwitchThumbnailUrlSize } from '../../utils';
import StyledStream from './styles/StyledStream';

const TwitchStream = ({
  title = '',
  thumbnail = '',
  username = '',
  viewerCount = 0,
}) => {
  return (
    <StyledStream className='hoverable'>
      <a
        href={`https://www.twitch.tv/${username}`}
        target='_blank'
        rel='noreferrer'
      >
        <div className='thumbnail'>
          <img
            src={setTwitchThumbnailUrlSize(thumbnail, {
              width: 350,
              height: 150,
            })}
            alt='stream-thumbnail'
          />
          <div className='live'>Live</div>
          <div className='viewer-count'>
            {numberFormatter(viewerCount)} viewers
          </div>
        </div>

        <div className='info'>
          <p className='title'>{title}</p>
          <p className='username'>{username}</p>
        </div>
      </a>
    </StyledStream>
  );
};

export default TwitchStream;
