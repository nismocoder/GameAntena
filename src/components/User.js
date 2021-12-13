import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLocalStorageItem, twitchAuthForwardUrl } from '../utils';

const User = ({ details }) => {
  const { email, isLoggedIn, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const authenticateUser = async () => {
    const base = process.env.REACT_APP_BACKEND_URL;

    try {
      const result = await fetch(`${base}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: 'admin@sample.com',
          password: 'admin123',
        }),
      });

      const { error, access_token, email } = await result.json();

      if (error) return alert(error.message);

      dispatch({ type: 'LOGIN_SUCCESS', payload: { email, accessToken } });
      setLocalStorageItem('email', email, 30);
      setLocalStorageItem('accessToken', access_token, 30);

    } catch (error) {
      console.log(error);
    }
  }

  const logoutUser = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("email");
    localStorage.removeItem("accessToken");
  }

  return (
    <div className='user'>
      {isLoggedIn ? (
        <>
          <h4>User email: {email}</h4>
          <a href={twitchAuthForwardUrl({
            clientId: process.env.REACT_APP_TWITCH_CLIENT_ID,
            authRedirectUri: `${process.env.REACT_APP_BACKEND_URL}/login`,
            scope: ['user:read:email']
          })}>
            Link your twitch acc.
          </a>
          <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <button onClick={authenticateUser}>Login</button>
      )
      }
    </div>
  )
}

export default User
