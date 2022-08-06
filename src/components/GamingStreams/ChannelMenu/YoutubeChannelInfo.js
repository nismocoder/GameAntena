import * as React from "react";
import styled from "styled-components";

function YoutubeChannelInfo({ userYoutubeData }) {
  return (
    <StyledChannelInfo>
      <div className="channel">
        <img src={userYoutubeData.youtube_display_picture} alt="channel-icon" />
        <a
          href={`https://www.youtube.com/channel/${userYoutubeData.youtube_user_id}`}
          target="_blank"
          rel="noreferrer"
        >
          {userYoutubeData.youtube_display_name || "SomeYoutubeChannel"}
        </a>
      </div>
      <div className="subscribers">
        {userYoutubeData.youtube_subscribers_count > 1
          ? `${userYoutubeData.youtube_subscribers_count} subscribers`
          : `${userYoutubeData.youtube_subscribers_count} subscriber`}
      </div>
    </StyledChannelInfo>
  );
}

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

  .subscribers {
    font-size: 0.9rem;
    color: var(--primary-light);
  }
`;

export default YoutubeChannelInfo;
