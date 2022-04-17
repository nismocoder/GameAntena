import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthInfo } from './utils';

const ProtectedRoute = ({ children, to = '/login' }) => {
  const { isLoggedIn } = getAuthInfo();
  if (!isLoggedIn) return <Navigate to={to} replace />;

  return children;
};

export default ProtectedRoute;
