import * as React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import styled from "styled-components";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { uiActions } from "../../../redux/ui";
import { getAuthInfo } from "../../../utils/auth";

function ChannelMenuCover({
  authForwardUrl,
  backgroundColor,
  platformName,
  pathname
}) {
  const { isLoggedIn } = getAuthInfo();
  const dispatch = useDispatch();

  const hideChannelMenu = () => {
    dispatch(uiActions.HIDE_CHANNEL_MENU());
  };

  return isLoggedIn ? (
    <StyledChannelMenuCover>
      <a href={authForwardUrl}>
        <button
          type="button"
          style={{
            backgroundColor
          }}
          className="hoverable"
        >
          Link your {platformName} account
        </button>
      </a>
      <FontAwesomeIcon
        onClick={hideChannelMenu}
        className="close-icon hoverable"
        icon={faTimes}
        data-testid="close-icon"
      />
    </StyledChannelMenuCover>
  ) : (
    <StyledChannelMenuCover>
      <Link to={`/login?p=${pathname}`}>
        <button
          type="button"
          style={{
            backgroundColor
          }}
          className="hoverable"
        >
          Link your {platformName} account
        </button>
      </Link>
      <FontAwesomeIcon
        onClick={hideChannelMenu}
        className="close-icon hoverable"
        icon={faTimes}
        data-testid="close-icon"
      />
    </StyledChannelMenuCover>
  );
}

const StyledChannelMenuCover = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--dark-fade);
  border-bottom-left-radius: 5px;

  button {
    padding: 0.8rem;
    box-shadow: var(--box-shadow);
    border: none;
  }

  .close-icon {
    position: absolute;
    bottom: 5%;
    left: 5%;
    color: var(--light);
    font-size: 1.2rem;
  }
`;
export default ChannelMenuCover;
