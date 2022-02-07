import React from 'react';
import styled from 'styled-components';

const TwitchChannelInfo = ({ userTwitchData }) => {
  return (
    <StyledChannelInfo>
      <div className='channel'>
        <img src={userTwitchData.twitch_display_picture} alt='channel-icon' />
        <a
          href={`https://www.twitch.tv/${userTwitchData.twitch_display_name}`}
          target='_blank'
          rel='noreferrer'
        >
          {userTwitchData.twitch_display_name || 'SomeTwitchChannel'}
        </a>
      </div>
      <div className='followers'>
        {userTwitchData.twitch_followers_count > 1
          ? `${userTwitchData.twitch_followers_count} followers`
          : `${userTwitchData.twitch_followers_count} follower`}
      </div>
    </StyledChannelInfo>
  );
};

const StyledChannelInfo = styled.div`
  .channel {
    margin-bottom: 0.5rem;

    img {
      width: 2rem;
      border-radius: 50%;
    }

    a {
      font-weight: 600;
      letter-spacing: 0.5px;
      color: var(--shade-2);
      text-decoration: underline;
    }
  }

  .followers {
    font-size: 0.9rem;
    color: var(--primary-light);
  }
`;

export default TwitchChannelInfo;
