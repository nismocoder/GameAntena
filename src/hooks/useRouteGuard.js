import React from 'react';

import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';

const useRouteGuard = ({ redirectTo = '/' }) => {
  const history = useHistory();

  const { isLoggedIn } = useSelector(state => state.auth);

  React.useEffect(() => {
    if (isLoggedIn) history.push(redirectTo);
  }, [history, isLoggedIn, redirectTo]);
}

export default useRouteGuard
