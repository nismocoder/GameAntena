import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

const useRedirectLoggedInUser = (to = '/') => {
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);

  React.useEffect(() => {
    let isMounted = true;

    if (isLoggedIn && isMounted) navigate(to);

    return () => {
      isMounted = false;
    };
  }, [navigate, isLoggedIn, to]);
};

export default useRedirectLoggedInUser;
