import React from 'react';

import { Nav, SideMenu } from '../../components';

const WithSideMenuAndNav = ({ children }) => {
  return (
    <>
      <Nav />
      <div style={{ display: 'flex', position: 'relative' }}>
        <SideMenu />
        {children}
      </div>
    </>
  )
}

export default WithSideMenuAndNav
