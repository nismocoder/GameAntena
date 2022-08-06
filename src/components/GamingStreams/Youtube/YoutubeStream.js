import * as React from "react";
import { numberFormatter } from "../../../utils";
import StyledStream from "../styles/StyledStream";

function YoutubeStream({
  streamId = "",
  title = "",
  thumbnail = "",
  channelName = "",
  viewerCount = 0
}) {
  return (
    <StyledStream className="hoverable">
      <a
        href={`https://youtube.com/watch?v=${streamId}`}
        target="_blank"
        rel="noreferrer"
      >
        <div className="thumbnail">
          <img src={thumbnail} alt="stream-thumbnail" />
          <div className="live">Live</div>
          <div className="viewer-count">
            {numberFormatter(viewerCount)} viewers
          </div>
        </div>

        <div className="info">
          <p className="title">{title}</p>
          <p className="channel-name">{channelName}</p>
        </div>
      </a>
    </StyledStream>
  );
}

export default YoutubeStream;
