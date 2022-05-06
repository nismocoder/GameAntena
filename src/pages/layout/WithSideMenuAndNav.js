import React from 'react';

import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import { ModalLoader, Nav, SideMenu } from '../../components';
import { useDebouncedCallback } from 'use-debounce';

const WithSideMenuAndNav = ({ children }) => {
  const dispatch = useDispatch();

  const [screenWidth, setScreenWidth] = React.useState(0);
  const { isLoading } = useSelector((state) => state.auth);

  const updateScreenWidth = useDebouncedCallback(() => {
    setScreenWidth(window.innerWidth);
  }, 100);

  // Set screen after first render
  React.useEffect(() => {
    dispatch({
      type: 'SET_SCREEN',
      payload: {
        width: screenWidth,
        height: window.innerHeight,
      },
    });
  }, [dispatch, screenWidth]);

  React.useLayoutEffect(() => {
    window.addEventListener('resize', updateScreenWidth);

    updateScreenWidth();
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, [updateScreenWidth]);

  return (
    <>
      <Nav />
      <StyledMain>
        <SideMenu />
        {isLoading && <ModalLoader />}
        {children}
      </StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  position: relative;
  overflow: hidden;
`;

export default WithSideMenuAndNav;
