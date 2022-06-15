import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ProfilePicturePreview } from '.';
import Logo from './Logo';
import Search from './Search/Search';

const Nav = ({
  showBars = true,
  showNavLogoText = true,
  showNavSearch = true,
  showAuthOnMobile = false,
}) => {
  const dispatch = useDispatch();

  const location = useLocation();
  const pathname = location.pathname;

  const [showSearch, setShowSearch] = useState(false);
  const [textInput, setTextInput] = React.useState('');

  const ui = useSelector((state) => state.ui);
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const clearSearched = () => {
    setTextInput('');
    if (pathname === '/' || pathname === '/my-profile')
      dispatch({ type: 'REMOVE_SEARCHED_GAMES' });

    if (pathname === '/twitch-gaming')
      dispatch({ type: 'REMOVE_SEARCHED_TWITCH_STREAMS' });

    if (pathname === '/youtube-gaming')
      dispatch({ type: 'REMOVE_SEARCHED_YOUTUBE_STREAMS' });
  };

  const toggleSideMenu = () => {
    if (!ui.showSideMenu) return dispatch({ type: 'SHOW_SIDE_MENU' });
    return dispatch({ type: 'HIDE_SIDE_MENU' });
  };

  return (
    <StyledNav>
      {showBars && (
        <div className='mobile bars hoverable'>
          <FontAwesomeIcon
            onClick={toggleSideMenu}
            icon={ui.showSideMenu ? faTimes : faBars}
          />
        </div>
      )}

      {!showSearch && (
        <Link to='/'>
          <Logo onClick={clearSearched} showText={showNavLogoText} />
        </Link>
      )}

      {showNavSearch && (
        <Search
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          textInput={textInput}
          setTextInput={setTextInput}
          pathname={pathname}
        />
      )}

      <StyledAuthDesktop className={showAuthOnMobile ? '' : 'desktop'}>
        {!isLoggedIn ? (
          <>
            <Link to='/login'>
              <button className='rounded hoverable'>Login</button>
            </Link>
            <Link to='/register'>
              <button className='outline-light rounded hoverable'>
                Register
              </button>
            </Link>
          </>
        ) : (
          <Link to='/my-profile' className='hoverable'>
            <button className='my-profile'>
              {user.displayName || 'My Profile'}
              {user.profilePicture ? (
                <ProfilePicturePreview
                  image={user.profilePicture}
                  justPreview={true}
                  sizeInRem={1.2}
                />
              ) : (
                <FontAwesomeIcon className='icon' icon={faUser} />
              )}
            </button>
          </Link>
        )}
      </StyledAuthDesktop>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  text-align: center;
  background-color: var(--primary);
  color: var(--light-1);
  z-index: 4;

  .desktop {
    display: none;
  }

  /* desktop */
  @media (min-width: 769px) {
    > * {
      flex: 1;
    }

    padding: 1rem 1rem;

    .mobile {
      display: none;
    }

    .desktop {
      display: flex;
    }
  }
`;

const StyledAuthDesktop = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;

  .icon {
    margin-left: 0.5rem;
  }

  button {
    padding: 0.3rem 1.5rem;
    font-weight: 600;
  }

  .my-profile {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--primary);
    border: 2px solid var(--light);
  }
`;

export default Nav;
