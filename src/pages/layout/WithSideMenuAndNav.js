import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { ModalLoader, Nav, SideMenu } from '../../components';

const WithSideMenuAndNav = ({ children }) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

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
        {isLoading && <ModalLoader />}
        {children}
      </div>
    </>
  );
};

export default WithSideMenuAndNav;
