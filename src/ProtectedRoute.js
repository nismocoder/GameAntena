import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { getAuthInfo } from './utils';

const ProtectedRoute = ({ component: Component, to = '/', ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return getAuthInfo().isLoggedIn ? (
          <Component />
        ) : (
          <Navigate
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
