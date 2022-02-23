import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import { faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons';
import {
  faChevronLeft,
  faHome,
  faSignOutAlt,
  faGamepad,
  faAngleDown,
  faAngleRight,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { logoutUser } from '../actions/authAction';

import ModalLoader from './ModalLoader';
import { Collapsible } from './Radix';

import { ToolTip } from './Radix';

const SideMenu = () => {
  const history = useHistory();
  const pathname = history.location.pathname;

  const dispatch = useDispatch();

  const ui = useSelector((state) => state.ui);
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);

  const [showSubLinks, setShowSubLinks] = React.useState(true);

  const hideSideMenu = () => {
    dispatch({ type: 'HIDE_SIDE_MENU' });
  };

  const showSideMenu = () => {
    dispatch({ type: 'SHOW_SIDE_MENU' });
  };

  const handleLogout = () => {
    dispatch(logoutUser());

    localStorage.removeItem('email');
    localStorage.removeItem('accessToken');
  };

  return (
    <>
      {isLoading && <ModalLoader />}
      <AnimatePresence>
        {!ui.showSideMenu && (
          <StyledMenuDrawer
            onMouseEnter={showSideMenu}
            initial={{ translateX: '-59px' }}
            animate={{ translateX: '0px' }}
            exit={{ translateX: '-59px' }}
            transition={{ duration: 0.3 }}
          >
            <div className='icons'>
              <FontAwesomeIcon
                className={`${pathname === '/' ? 'active' : ''}`}
                icon={faHome}
              />
              <FontAwesomeIcon
                className={`${pathname === '/twitch-gaming' ? 'active' : ''}`}
                icon={faTwitch}
              />
              <FontAwesomeIcon
                className={`${pathname === '/youtube-gaming' ? 'active' : ''}`}
                icon={faYoutube}
              />
            </div>
            <div className='logout-icon'>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </div>
          </StyledMenuDrawer>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ui.showSideMenu && (
          <StyledSideMenu
            initial={{ translateX: '-283px' }}
            animate={{ translateX: '0px' }}
            exit={{ translateX: '-283px' }}
            transition={{ duration: 0.4 }}
          >
            <div onClick={hideSideMenu} className='hide-icon hoverable'>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <MenuLinks
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.0 }}
              transition={{ duration: 0.4 }}
            >
              <div className='main-links'>
                <Link to='/'>
                  <ToolTip
                    trigger={
                      <li className={`${pathname === '/' ? 'active' : ''}`}>
                        Browse games
                        <FontAwesomeIcon className='icon' icon={faGamepad} />
                      </li>
                    }
                    content={<p>Games from RAWG.IO</p>}
                  />
                </Link>
                <Link to='/twitch-gaming'>
                  <ToolTip
                    trigger={
                      <li
                        className={`${
                          pathname === '/twitch-gaming' ? 'active' : ''
                        }`}
                      >
                        Twitch Gaming
                        <FontAwesomeIcon className='icon' icon={faTwitch} />
                      </li>
                    }
                    content={<p>Twitch Gaming Streams</p>}
                  />
                </Link>
                <Link to='/youtube-gaming'>
                  <ToolTip
                    trigger={
                      <li
                        className={`${
                          pathname === '/youtube-gaming' ? 'active' : ''
                        }`}
                      >
                        Youtube Gaming
                        <FontAwesomeIcon className='icon' icon={faYoutube} />
                      </li>
                    }
                    content={<p>Youtube Gaming Streams</p>}
                  />
                </Link>
                {isLoggedIn && (
                  <Link to='/my-profile'>
                    <li
                      className={`${
                        pathname === '/my-profile' ? 'active' : ''
                      }`}
                    >
                      My Profile
                      <FontAwesomeIcon className='icon' icon={faUser} />
                    </li>
                  </Link>
                )}
              </div>

              <SubLinks className='sub-links'>
                <Collapsible
                  open={showSubLinks}
                  trigger={
                    <li
                      className='collapsible-trigger'
                      onClick={() => setShowSubLinks((state) => !state)}
                    >
                      More{' '}
                      <FontAwesomeIcon
                        className='icon'
                        icon={showSubLinks ? faAngleDown : faAngleRight}
                      />
                    </li>
                  }
                  content={
                    <div className='collapsible-content'>
                      <li>About Us</li>
                      <Link to='/privacy-policy'>
                        <li>Privacy Policy</li>
                      </Link>

                      <Link to='terms-and-conditions'>
                        <li>Terms and Conditions</li>
                      </Link>
                    </div>
                  }
                />
              </SubLinks>

              {isLoggedIn ? (
                <li className='logout' onClick={handleLogout}>
                  Logout
                  <FontAwesomeIcon className='icon' icon={faSignOutAlt} />
                </li>
              ) : (
                <div className='auth'>
                  <Link to='/login'>
                    <button className='login rounded'>Login</button>
                  </Link>
                  <Link to='/register'>
                    <button className='register rounded outline-light'>
                      Register
                    </button>
                  </Link>
                </div>
              )}
            </MenuLinks>
            <div className='copyright'>
              <p>Copyright &copy; 2021 Game-Antena</p>
              All rights reserved
            </div>
          </StyledSideMenu>
        )}
      </AnimatePresence>
    </>
  );
};

const SideMenuElement = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: var(--primary);
  box-shadow: var(--box-shadow);
  color: var(--light);
`;

const StyledSideMenu = styled(SideMenuElement)`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  list-style: none;
  z-index: 4;
  padding-top: 3rem;

  .hide-icon {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5rem;
    background-color: var(--light);
    color: var(--primary);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .copyright {
    bottom: 0;
    border-top: 1px solid var(--primary-light);
    font-size: 0.85rem;
    padding: 1rem;
    color: var(--primary-light);

    p {
      font-weight: 600;
    }
  }
`;

const MenuLinks = styled(motion.div)`
  display: flex;
  flex-flow: column;
  overflow-y: auto;
  justify-content: space-between;
  height: 100%;
  gap: 1rem;
  padding-bottom: 1rem;

  ::-webkit-scrollbar-track {
    background: var(--primary);
  }

  ::-webkit-scrollbar {
    width: 0.6rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 50rem;
    background-color: var(--primary-light);
    border: 1px solid #000;
  }

  li {
    width: 100%;
    padding: 1rem 7rem 1rem 1rem;
    cursor: pointer;

    .icon {
      margin-left: 0.5rem;
    }
  }

  li:hover {
    color: var(--light);
    filter: brightness(80%);
  }

  li.active {
    color: var(--light);
    background-color: var(--shade-4);
  }

  li.active:hover {
    filter: brightness(100%);
  }

  .auth {
    padding: 1rem 0;
    display: flex;
    justify-content: space-around;

    button {
      padding: 0.5rem 1.5rem;
      font-weight: 600;
    }
  }

  @media (min-width: 769px) {
    .auth {
      display: none;
    }
  }
`;

const SubLinks = styled.div`
  font-size: 0.9rem;
  color: var(--light-2);

  li {
    cursor: pointer;

    .icon {
      margin-left: 1rem;
    }
  }

  .collapsible-trigger {
    display: flex;
    align-items: center;
  }

  .collapsible-content li {
    padding: 0.5rem 0.65rem 0.5rem 1.5rem;
  }
`;

const StyledMenuDrawer = styled(SideMenuElement)`
  cursor: pointer;
  display: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 1.5rem;
  z-index: 5;
  padding: 3rem 1rem;

  .icons {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 2rem;
  }

  .icons > *.active {
    color: var(--shade-4);
  }

  .logout-icon {
  }

  @media (min-width: 768px) {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
  }
`;

export default SideMenu;
