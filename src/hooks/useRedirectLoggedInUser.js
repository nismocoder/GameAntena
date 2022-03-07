import React from 'react';

import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';

const useRedirectLoggedInUser = (to = '/') => {
  const history = useHistory();

  const { isLoggedIn } = useSelector((state) => state.auth);

  React.useEffect(() => {
    let isMounted = true;

    if (isLoggedIn && isMounted) history.push(to);

    return () => {
      isMounted = false;
    };
  }, [history, isLoggedIn, to]);
};

export default useRedirectLoggedInUser;
