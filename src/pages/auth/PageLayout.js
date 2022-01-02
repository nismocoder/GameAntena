import React from 'react';

import { useSelector } from 'react-redux';

import { Logo, ModalLoader } from '../../components';

import styled from 'styled-components';

const PageLayout = ({ children, linkToElement }) => {
  const { isLoading } = useSelector(state => state.auth);

  return (
    <StyledPage>
      {isLoading && <ModalLoader />}
      <Logo />
      <main>
        {children}
        <div className="link-to">
          {linkToElement}
        </div>
      </main>
    </StyledPage>
  )
}

const StyledPage = styled.div`
  height: 100vh;
  background-color: var(--primary);
  color: var(--light);
  padding: 1rem;
  overflow: hidden;

  main {
    width: 100%;
    height: 100%;
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
      color:var(--light-2);

      a {
        color: var(--light);
        font-weight: 600;
        margin-left: 0.3rem;
        text-decoration: underline;
      }
    }  
  }
`;

export default PageLayout
