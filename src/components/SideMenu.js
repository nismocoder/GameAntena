import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { motion, AnimatePresence } from 'framer-motion';

import styled from 'styled-components';

import { faChevronLeft, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SideMenu = () => {
  const dispatch = useDispatch();
  const [screen, setScreen] = useState({ width: 0, height: 0 });

  const ui = useSelector((state) => state.ui);

  const hideSideMenu = () => {
    dispatch({ type: "HIDE_SIDE_MENU" });
  }

  const showSideMenu = () => {
    dispatch({ type: "SHOW_SIDE_MENU" });
  }

  useEffect(() => {
    setScreen(() => {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    })
  }, []);

  return (
    <>
      <AnimatePresence>
        {!ui.showSideMenu && (
          <StyledMenuDrawer
            layout
            onMouseEnter={showSideMenu}
            initial={{ width: '0%' }}
            animate={{ width: '5%' }}
            exit={{ width: '0%' }}
            transition={{ duration: 0.15 }}
          >
            <div className="show-icon icon">
              <FontAwesomeIcon icon={faHome} />
            </div>
          </StyledMenuDrawer>
        )
        }
      </AnimatePresence >

      <AnimatePresence>
        {ui.showSideMenu && (
          <StyledSideMenu
            layout
            initial={{ width: '0%' }}
            animate={{ width: `${screen.width > 768 ? '20%' : '80%'}` }}
            exit={{ width: '0%' }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div
              onClick={hideSideMenu}
              className="hide-icon hoverable"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <MenuLinks
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.0 }}
              transition={{ duration: 0.4 }}
            >
              <li className='active'>Browse games</li>
              <li>Browse games</li>
              <li>Browse games</li>
              <li>Browse games</li>
            </MenuLinks>
          </StyledSideMenu>
        )
        }
      </AnimatePresence >
    </>
  )
}

const MenuLinks = styled(motion.div)`
  li {
    width: 100%;
    padding: 0.5rem 1rem;
  }

  li:hover {
    color: var(--light);
    background-color: var(--shade-4);
  }

  li.active {
    color: var(--light);
    background-color: var(--shade-4);
  }
`;

const StyledMenu = styled(motion.div)`
  margin-right: auto;
  height: 100vh;
  background-color: var(--primary);
  position: relative;
  box-shadow: var(--box-shadow);
  color: var(--light);
  padding-top: 2rem;
`;

const StyledSideMenu = styled(StyledMenu)`
  padding-top: 5rem;
  list-style: none;
  font-size: 1.1rem;

  
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

`;

const StyledMenuDrawer = styled(StyledMenu)`
  cursor: pointer;
  display: none;

  .icon {
    font-size: 1.5rem;
  }

  @media(min-width: 768px) {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
`;

export default SideMenu
