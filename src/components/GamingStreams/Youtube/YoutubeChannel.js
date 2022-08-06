import * as React from "react";
import { numberFormatter } from "../../../utils";
import StyledChannel from "../styles/StyledChannel";

function YoutubeChannel({
  channelId = "",
  channelName = "",
  thumbnail = "",
  subscribersAreHidden = false,
  totalSubscribers = 0
}) {
  return (
    <StyledChannel className="hoverable">
      <a
        href={`https://youtube.com/channel/${channelId}`}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="thumbnail"
          src={thumbnail}
          width={80}
          height={80}
          alt={`${channelName}'s thumbnail`}
        />
        <div className="info">
          <p className="channel-name">{channelName}</p>
          <p className="subscribers">
            {subscribersAreHidden ? (
              "subs hidden"
            ) : (
              <>
                {numberFormatter(totalSubscribers)}{" "}
                {totalSubscribers > 1 ? "subscribers" : "subscriber"}
              </>
            )}
          </p>
        </div>
      </a>
    </StyledChannel>
  );
}

export default YoutubeChannel;
