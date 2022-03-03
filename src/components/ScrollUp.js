import React from 'react';

import { createPortal } from 'react-dom';

import styled from 'styled-components';

import ScrollToTop from 'react-scroll-up';

import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ScrollUp = ({ element, elementScrollY = null }) => {
  const handleElementScroll = (element) => {
    const scrollUpStep = element.scrollTop / 30;

    const scrollUpInteval = setInterval(() => {
      if (element.scrollTop > 0) {
        element.scrollTop = element.scrollTop - scrollUpStep;
      }
    }, 10);

    setTimeout(() => {
      clearInterval(scrollUpInteval);
    }, 500);
  };

  return elementScrollY >= 1500 ? (
    createPortal(
      <StyledScrollUp
        className='hoverable'
        onClick={() => handleElementScroll(element)}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </StyledScrollUp>,
      document.getElementById('scrollup_root'),
    )
  ) : (
    <ScrollToTop showUnder={1500}>
      <StyledScrollUp className='hoverable'>
        <FontAwesomeIcon icon={faArrowUp} />
      </StyledScrollUp>
    </ScrollToTop>
  );
};

const StyledScrollUp = styled.div`
  position: fixed;
  bottom: 5%;
  right: 5%;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background-color: var(--primary);
  color: var(--light);
  border: 2px solid var(--light);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
`;

export default ScrollUp;
