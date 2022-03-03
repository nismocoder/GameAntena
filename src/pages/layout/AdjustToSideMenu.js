import React from 'react';

import styled from 'styled-components';

import { motion } from 'framer-motion';

import { ScrollUp } from '../../components';

import { useSelector } from 'react-redux';

import { useGetRefElementScrollY } from '../../hooks';

const getComponentVariant = (screenWidth) => {
  const variants = {
    desktop: {
      open: { translateX: '283px' },
      closed: { translateX: '59px' },
    },
    mobile: {
      open: { translateX: '283px' },
      closed: { translateX: '0px' },
    },
  };

  if (screenWidth > 768) {
    return variants.desktop;
  }
  return variants.mobile;
};

const AdjustToSideMenu = React.forwardRef(({ children }, ref) => {
  const { showSideMenu, screen } = useSelector((state) => state.ui);

  const { scrollY, element } = useGetRefElementScrollY(ref);

  return (
    <StyledAdjustToSideMenu
      ref={ref}
      variants={getComponentVariant(screen.width)}
      animate={showSideMenu ? 'open' : 'closed'}
      transition={{ duration: 0.4 }}
    >
      {children}
      <ScrollUp element={element} elementScrollY={scrollY} />
    </StyledAdjustToSideMenu>
  );
});

const StyledAdjustToSideMenu = styled(motion.div)`
  overflow-y: auto;
  height: calc(100vh - 56px);
  width: 100vw;

  /* DESKTOP */
  @media (min-width: 768px) {
    width: 95.65vw;
    height: calc(100vh - 77px);
  }
`;

export default AdjustToSideMenu;
