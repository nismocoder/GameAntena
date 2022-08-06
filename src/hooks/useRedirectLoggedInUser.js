import * as React from "react";
import { useNavigate } from "react-router-dom";
import { getAuthInfo } from "../utils/auth";

const useRedirectLoggedInUser = (to = "/") => {
  const navigate = useNavigate();

  const { isLoggedIn } = getAuthInfo();

  React.useEffect(() => {
    if (isLoggedIn) navigate(to);
  }, [navigate, isLoggedIn, to]);
};

export default useRedirectLoggedInUser;
