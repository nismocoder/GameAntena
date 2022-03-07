import React from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Logo, ModalLoader } from '../../components';

import styled from 'styled-components';
import { useScrollableBody } from '../../hooks';

const PageLayout = ({ children, linkToElement }) => {
  useScrollableBody();

  const { isLoading } = useSelector((state) => state.auth);

  return (
    <StyledPage>
      {isLoading && <ModalLoader />}
      <Link to='/'>
        <Logo />
      </Link>
      <main>
        {children}
        <div className='link-to'>{linkToElement}</div>
      </main>
    </StyledPage>
  );
};

const StyledPage = styled.div`
  height: 100vh;
  min-height: 570px;
  background-color: var(--primary);
  color: var(--light);
  padding: 1rem;

  main {
    width: 100%;
    height: 98.5%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
    padding: 3rem 0;

    h2 {
      text-align: center;
      width: 70%;
      font-family: var(--font-2);
      color: var(--light-2);
    }

    .link-to {
      text-align: center;
      color: var(--light-2);

      a {
        color: var(--light);
        font-weight: 600;
        margin-left: 0.3rem;
        text-decoration: underline;
      }
    }
  }
`;

export default PageLayout;
