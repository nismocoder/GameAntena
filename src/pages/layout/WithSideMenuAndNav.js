import React from 'react';

import { useSelector } from 'react-redux';

import { Nav, SideMenu } from '../../components';

const WithSideMenuAndNav = ({ children }) => {
  const { screen } = useSelector((state) => state.ui);

  return (
    <>
      <Nav />
      <div style={{ display: 'flex', position: 'relative' }}>
        <SideMenu screen={screen} />
        {children}
      </div>
    </>
  )
}

export default WithSideMenuAndNav
