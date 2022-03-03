import React from 'react';
import styled from 'styled-components';

const Footer = ({ background, textAlign }) => {
  return (
    <StyledFooter style={{ background, textAlign }}>
      <p>Copyright &copy; 2021 Game-Antena</p>
      All rights reserved
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  bottom: 0;
  font-size: 0.85rem;
  padding: 1rem;
  color: var(--primary-light);

  p {
    font-weight: 600;
  }
`;

export default Footer;
