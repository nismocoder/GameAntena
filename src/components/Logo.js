import React from 'react';

import styled from 'styled-components';

import { motion } from 'framer-motion';

import logo from "../img/logo/antena_logo1.svg";

const Logo = ({ onClick = () => { } }) => {
  return (
    <StyledLogo
      className="hoverable"
      onClick={onClick}
      // initial={{ scale: 0.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.2, opacity: 0.5 }}
      transition={{ duration: 1 }}
    >
      <img src={logo} alt="logo" />
      <h1 className="logo-text">Game-Antena</h1>
    </StyledLogo>
  )
}

const StyledLogo = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.1rem;

  img {
    height: 1.5rem;
    width: 1.5rem;
  }

  .logo-text {
    font-family: var(--font-3);
    letter-spacing: 1px;
    font-size: 0.8rem;
    font-weight: 500;
    margin-top: 0.15rem;
  }
`;

export default Logo
