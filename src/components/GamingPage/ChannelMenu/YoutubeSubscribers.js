import React from 'react';
import styled from 'styled-components';

import { ToolTip } from '../../Radix';

const YoutubeSubscribers = ({ userYoutubeData }) => {
  return (
    <StyledYoutubeSubscribers>
      {userYoutubeData.subscribers.length > 0 ? (
        <div className='subs'>
          <div className='icons'>
            {userYoutubeData.subscribers.map(
              ({
                subscriber_id,
                subscriber_display_picture,
                subscriber_name,
              }) => (
                <ToolTip
                  trigger={
                    <a
                      href={`https://www.youtube.com/channel/${subscriber_id}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <img
                        src={subscriber_display_picture}
                        className='user-icon hoverable'
                        alt='subscriber-icon'
                      />
                    </a>
                  }
                  content={subscriber_name}
                  theme='dark'
                />
              ),
            )}
            ...
          </div>
          <div className='total-subscribers'>
            <span>{userYoutubeData.youtube_subscribers_count} </span>
            total subscriber
            {userYoutubeData.youtube_subscribers_count > 1 && 's'}
          </div>
        </div>
      ) : (
        <div className='no-sub'>You don't have any subscribers</div>
      )}
    </StyledYoutubeSubscribers>
  );
};

const StyledYoutubeSubscribers = styled.div`
  .no-sub {
    padding: 0.5rem 1rem;
  }

  .subs {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icons {
      display: flex;
      flex-flow: row wrap;
      align-items: flex-end;
      background-color: var(--primary);
      color: var(--light);
      padding: 0.5rem;
      width: 100%;
      gap: 0.5rem;
      border-bottom-left-radius: 5px;
    }

    .user-icon {
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 50%;
    }

    .total-subscribers {
      font-size: 0.85rem;
      line-height: 1rem;

      span {
        font-weight: 600;
      }
    }
  }
`;

export default YoutubeSubscribers;
