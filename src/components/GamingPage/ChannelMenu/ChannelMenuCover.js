import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChannelMenuCover = ({
  authForwardUrl,
  backgroundColor,
  platformName,
  pathname,
}) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const hideChannelMenu = () => {
    dispatch({ type: 'HIDE_CHANNEL_MENU' });
  };

  return isLoggedIn ? (
    <StyledChannelMenuCover>
      <a href={authForwardUrl}>
        <button
          style={{
            backgroundColor,
          }}
          className='hoverable'
        >
          Link your {platformName} account
        </button>
      </a>
      <FontAwesomeIcon
        onClick={hideChannelMenu}
        className='close-icon hoverable'
        icon={faTimes}
      />
    </StyledChannelMenuCover>
  ) : (
    <StyledChannelMenuCover>
      <Link to={`login?p=${pathname}`}>
        <button
          style={{
            backgroundColor,
          }}
          className='hoverable'
        >
          Link your {platformName} account
        </button>
      </Link>
      <FontAwesomeIcon
        onClick={hideChannelMenu}
        className='close-icon hoverable'
        icon={faTimes}
      />
    </StyledChannelMenuCover>
  );
};

const StyledChannelMenuCover = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--dark-faded);
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
