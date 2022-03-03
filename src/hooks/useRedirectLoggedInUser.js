import React from 'react';

import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';

const useRedirectLoggedInUser = (to = '/') => {
  const history = useHistory();

  const { isLoggedIn } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (isLoggedIn) history.push(to);
  }, [history, isLoggedIn, to]);
};

export default useRedirectLoggedInUser;
