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
        width: window.outerWidth,
        height: window.outerHeight,
      },
    });
  }, [dispatch]);

  return (
    <>
      <Nav />
      <div style={{ position: 'relative' }}>
        <SideMenu />
        {children}
      </div>
    </>
  );
};

export default WithSideMenuAndNav;
