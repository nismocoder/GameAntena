import React from 'react';
import { WithSideMenuAndNav, AdjustToSideMenu } from './layout';

const MyProfile = () => {
  return (
    <WithSideMenuAndNav>
      <AdjustToSideMenu>
        <h2>My Profile</h2>
      </AdjustToSideMenu>
    </WithSideMenuAndNav>
  );
};

export default MyProfile;
