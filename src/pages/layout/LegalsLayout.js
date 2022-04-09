import React from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ScrollUp } from '../../components';
import { useScrollableBody } from '../../hooks';

const LegalsLayout = ({ children }) => {
  const history = useHistory();

  useScrollableBody();

  return (
    <StyledPage>
      <div className='back-icon'>
        <FontAwesomeIcon
          className='hoverable'
          icon={faChevronCircleLeft}
          onClick={() => history.goBack()}
        />
      </div>

      <div className='content'>{children}</div>
      <ScrollUp />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  .back-icon {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0.3rem 1rem;
    font-size: 2rem;
    background: white;
    color: var(--primary-light);
    border-bottom: 1px solid var(--primary);
  }

  .content {
    padding-top: 4rem;
    width: 85vw;
    max-width: 65rem;
    margin: 0 auto;
  }

  h1 {
    margin: 1rem 0;
  }

  h2 {
    color: var(--primary);
    margin-bottom: 0.5rem;
  }

  a {
    text-decoration: underline;
    color: var(--shade-2);
  }

  p {
    color: var(--primary);
  }

  ul,
  ol {
    list-style-position: inside;
  }

  ul > li,
  ol > li {
    margin: 0.5rem 0;
  }

  .content > * {
    margin-bottom: 1.5rem;
  }
`;

export default LegalsLayout;
