import React from 'react';

import { useDispatch } from 'react-redux';

import { Nav, SideMenu } from '../../components';

const WithSideMenuAndNav = ({ children }) => {
  const dispatch = useDispatch();

  // Set screen after first render
  React.useEffect(() => {
    dispatch({
      type: 'SET_SCREEN',
      payload: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  }, [dispatch]);

  return (
    <>
      <Nav />
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <SideMenu />
        {children}
      </div>
    </>
  );
};

export default WithSideMenuAndNav;
