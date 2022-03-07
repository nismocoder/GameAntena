import React from 'react';

import { createPortal } from 'react-dom';

import styled from 'styled-components';

import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ScrollUp = ({ element, elementScrollY = 0 }) => {
  const [windowScrollY, setWindowScrollY] = React.useState(0);

  const scrollElementToTop = React.useCallback(() => {
    element.scrollTo({ top: 0, behavior: 'smooth' });
  }, [element]);

  React.useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  const scrollWindowToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWindowScroll = () => {
    setWindowScrollY(window.scrollY);
  };

  return element
    ? elementScrollY > 1500 &&
        createPortal(
          <StyledScrollUp className='hoverable' onClick={scrollElementToTop}>
            <FontAwesomeIcon icon={faArrowUp} />
          </StyledScrollUp>,
          document.getElementById('scrollup_root'),
        )
    : windowScrollY > 1500 &&
        createPortal(
          <StyledScrollUp className='hoverable' onClick={scrollWindowToTop}>
            <FontAwesomeIcon icon={faArrowUp} />
          </StyledScrollUp>,
          document.getElementById('scrollup_root'),
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
