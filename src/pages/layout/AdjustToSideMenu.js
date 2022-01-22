import React from 'react';

import styled from 'styled-components';

import { motion } from 'framer-motion';

import { useSelector } from 'react-redux';

const getComponentVariant = (screenWidth) => {
  const variants = {
    desktop: {
      open: { translateX: '283px' },
      closed: { translateX: '59px' },
    },
    mobile: {
      open: { translateX: '283px' },
      closed: { translateX: '0px' },
    }
  }

  if (screenWidth > 768) {
    return variants.desktop
  }
  return variants.mobile
}

const AdjustToSideMenu = ({ children }) => {
  const { showSideMenu, screen } = useSelector((state) => state.ui);

  return (
    <StyledAdjustToSideMenu
      variants={getComponentVariant(screen.width)}
      animate={showSideMenu ? "open" : "closed"}
      transition={{ duration: 0.4 }}
    >
      {children}
    </StyledAdjustToSideMenu>
  )
}

const StyledAdjustToSideMenu = styled(motion.div)`
  overflow-y: scroll;
  height: calc(100vh - 56px);
  width: 100vw;

  /* DESKTOP */
  @media(min-width: 768px) {
    width: 95.65vw;
    height: calc(100vh - 77px);
  }
`;


export default AdjustToSideMenu
