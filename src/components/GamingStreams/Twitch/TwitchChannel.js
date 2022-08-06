import * as React from "react";
import { numberFormatter } from "../../../utils";
import StyledChannel from "../styles/StyledChannel";

function TwitchChannel({ thumbnail = "", username = "", totalFollowers = 0 }) {
  return (
    <StyledChannel className="hoverable">
      <a
        href={`https://twitch.tv/${username}`}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="thumbnail"
          src={thumbnail}
          width={80}
          height={80}
          alt={`${username}'s thumbnail`}
        />
        <div className="info">
          <p className="channel-name">{username}</p>
          <p className="followers">
            {numberFormatter(totalFollowers)}{" "}
            {totalFollowers > 1 ? "followers" : "follower"}
          </p>
        </div>
      </a>
    </StyledChannel>
  );
}

export default TwitchChannel;
