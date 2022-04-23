import React from 'react';

import styled from 'styled-components';

import { motion } from 'framer-motion';

import { Loader, ScrollUp } from '../../components';

import { useSelector } from 'react-redux';

import { useGetRefElementScrollY } from '../../hooks';

const getComponentVariant = (screenWidth) => {
  const variants = {
    desktop: {
      open: { translateX: '284px' },
      closed: { translateX: '51px' },
    },
    mobile: {
      open: { translateX: '284px' },
      closed: { translateX: '0px' },
    },
  };

  if (screenWidth > 768) {
    return variants.desktop;
  }
  return variants.mobile;
};

const AdjustToSideMenu = React.forwardRef(({ children, isLoading }, ref) => {
  const { showSideMenu, screen } = useSelector((state) => state.ui);

  const { scrollY, element } = useGetRefElementScrollY(ref);

  return (
    <StyledAdjustToSideMenu
      ref={ref}
      variants={getComponentVariant(screen.width)}
      animate={showSideMenu ? 'open' : 'closed'}
      transition={{ duration: 0.4 }}
    >
      {isLoading ? (
        <div className='loader'>
          <Loader style={{ transform: 'scale(2)' }} />
        </div>
      ) : (
        <>
          {children}
          <ScrollUp element={element} elementScrollY={scrollY} />
        </>
      )}
    </StyledAdjustToSideMenu>
  );
});

const StyledAdjustToSideMenu = styled(motion.div)`
  overflow-y: auto;
  height: calc(100vh - 56px);
  width: 100vw;

  .loader {
    flex: 1;
    width: 100%;
    height: calc(100vh - 56px);
  }

  .error {
    text-align: center;
    padding: 3rem 1rem;
    font-family: var(--font-3);
    letter-spacing: 0.2rem;
    word-spacing: 1rem;
    color: var(--danger);
  }

  /* DESKTOP */
  @media (min-width: 768px) {
    width: 96.23vw;
    height: calc(100vh - 77px);

    .loader {
      height: calc(100vh - 77px);
    }
  }
`;

export default AdjustToSideMenu;
