import React, { useState } from 'react';

import { motion } from 'framer-motion';

import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchGames } from '../actions/gamesAction';

import {
  faBars,
  faSearch,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link, useHistory } from 'react-router-dom';

import styled from 'styled-components';

import Logo from './Logo';
import { getSearchPlaceholder } from '../utils/basedOnPath';

const Nav = ({
  showBars = true,
  showNavLogoText = true,
  showNavSearch = true,
  showAuthOnMobile = false,
}) => {
  const dispatch = useDispatch();

  const history = useHistory();
  const pathname = history.location.pathname;

  const [showSearch, setShowSearch] = useState(false);
  const [textInput, setTextInput] = useState('');

  const ui = useSelector((state) => state.ui);
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const inputHandler = (e) => {
    setTextInput(e.target.value);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (textInput) dispatch(fetchSearchGames(textInput));
  };

  const clearSearched = () => {
    setTextInput('');
    dispatch({ type: 'CLEAR_SEARCHED' });
  };

  const closeSearch = () => {
    setTextInput('');
    setShowSearch(false);
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
        <>
          <div className='mobile search'>
            {!showSearch ? (
              <FontAwesomeIcon
                icon={faSearch}
                onClick={() => setShowSearch(true)}
              />
            ) : (
              <StyledSearchMobile
                onSubmit={submitSearch}
                initial={{ width: '0%', opacity: 0 }}
                animate={{ width: '90%', opacity: 1 }}
                exit={{ width: '0%', opacity: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <FontAwesomeIcon
                  className='close-icon'
                  icon={faTimes}
                  onClick={closeSearch}
                />
                <input
                  placeholder={getSearchPlaceholder(pathname)}
                  value={textInput}
                  onChange={inputHandler}
                  type='text'
                />
              </StyledSearchMobile>
            )}
          </div>
          <StyledSearchDesktop onSubmit={submitSearch} className='desktop'>
            <input
              placeholder={getSearchPlaceholder(pathname)}
              value={textInput}
              onChange={inputHandler}
              type='text'
            />
            <FontAwesomeIcon
              className='search-icon hoverable'
              icon={faSearch}
              onClick={submitSearch}
            />
          </StyledSearchDesktop>
        </>
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
              <FontAwesomeIcon className='icon' icon={faUser} />
            </button>
          </Link>
        )}
      </StyledAuthDesktop>
    </StyledNav>
  );
};

const StyledNav = styled(motion.nav)`
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

const StyledSearchDesktop = styled(motion.form)`
  position: relative;

  .search-icon {
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translateY(-50%);
    color: var(--light);
    z-index: 5;
    background-color: var(--shade-2);
    height: 99%;
    width: 2.8rem;
    padding: 0.6rem;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  input {
    width: 100%;
    font-size: 1.2rem;
    border: 1px solid var(--primary);
    background-color: var(--light);
    padding: 0.5rem 1rem;
    border-radius: 5px;
  }
`;

const StyledSearchMobile = styled(motion.form)`
  width: 90%;
  text-align: left;
  margin-left: auto;
  position: relative;
  border-radius: 50rem;
  background-color: var(--light);
  padding: 0.3rem 1rem;

  .close-icon {
    position: absolute;
    right: 2%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: var(--primary-light);
    font-size: 1.5rem;
  }

  input {
    width: 85%;
    font-size: 1.2rem;
    border: none;
    outline: none;
    background: none;
  }
`;

const StyledAuthDesktop = styled(motion.div)`
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
    background-color: var(--primary);
    border: 2px solid var(--light);
  }
`;

export default Nav;
