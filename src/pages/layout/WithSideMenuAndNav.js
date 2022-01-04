import React from 'react';

import { Nav, SideMenu } from '../../components';

const WithSideMenuAndNav = ({ children }) => {
  return (
    <>
      <Nav />
      <div style={{ display: 'flex' }}>
        <SideMenu />
        {children}
      </div>
    </>
  )
}

export default WithSideMenuAndNav
