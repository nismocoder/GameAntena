import * as React from "react";
import styled from "styled-components";

import { ToolTip } from "../../Radix";

function TwitchSubscribers({ userTwitchData }) {
  return (
    <StyledTwitchSubscribers>
      {!userTwitchData.twitch_channel_qualified ? (
        <div className="no-sub">
          Your channel isn&apos;t qualified to have subscribers
        </div>
      ) : (
        <ChannelSubscribers userTwitchData={userTwitchData} />
      )}
    </StyledTwitchSubscribers>
  );
}

function ChannelSubscribers({ userTwitchData }) {
  return userTwitchData.subscribers.length > 0 ? (
    <div className="subs">
      <div className="icons">
        {userTwitchData.subscribers.map(
          ({
            subscriber_display_picture: subscriberDisplayPicture,
            subscriber_name: subscriberName
          }) => (
            <ToolTip
              trigger={
                <a
                  href={`https://www.twitch.tv/${subscriberName}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={subscriberDisplayPicture}
                    className="user-icon hoverable"
                    alt="subscriber-icon"
                  />
                </a>
              }
              content={subscriberName}
              theme="dark"
            />
          )
        )}
        ...
      </div>
      <div className="total-subscribers">
        <span>{userTwitchData.twitch_subscribers_count} </span>
        total subscribers
      </div>
    </div>
  ) : (
    <div className="no-sub">You don&apos;t have any subscribers</div>
  );
}

const StyledTwitchSubscribers = styled.div`
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

export default TwitchSubscribers;
