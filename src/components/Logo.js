import React from 'react';

import styled from 'styled-components';

import { motion } from 'framer-motion';

import logo from '../img/logo/ga-logo.svg';

const Logo = ({ onClick = () => {}, showText = true }) => {
  return (
    <StyledLogo
      className='hoverable'
      onClick={onClick}
      // initial={{ scale: 0.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.2, opacity: 0.5 }}
      transition={{ duration: 1 }}
    >
      <img src={logo} alt='logo' />
      {showText && <h1 className='logo-text'>Game-Antena</h1>}
    </StyledLogo>
  );
};

const StyledLogo = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.2rem;

  img {
    height: 1.75rem;
    width: 1.75rem;
  }

  .logo-text {
    font-family: var(--font-3);
    letter-spacing: 1px;
    font-size: 0.75rem;
    font-weight: 500;
    margin-top: 0.15rem;
  }
`;

export default Logo;
