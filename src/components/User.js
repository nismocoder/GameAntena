import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAuthInfo } from '../actions/authAction';
import { setLocalStorageItem, twitchAuthForwardUrl } from '../utils';

const User = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);

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

      const { error, message, access_token: accessToken, email } = await result.json();

      if (error) return alert(message);


      dispatch({ type: 'LOGIN_SUCCESS', payload: { email, accessToken } });
      setLocalStorageItem('email', email, 30);
      setLocalStorageItem('accessToken', accessToken, 30);

      dispatch(updateUserAuthInfo(email, accessToken));

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
          <h4>User email: {user.email}</h4>

          <div>
            {user.twitch_user_id && <h4>Twitch ID: {user.twitch_user_id}</h4>}
            {user.twitch_display_name && <h4>Twitch Name: {user.twitch_display_name}</h4>}
            {user.twitch_email && <h4>Twitch Email: {user.twitch_email}</h4>}
            {user.twitch_display_picture && <h4>Twitch Profile Image: <img width={50} src={user.twitch_display_picture} alt="twitch-avatar" /></h4>}

            {!user.twitch_user_id && (
              <a href={twitchAuthForwardUrl({
                clientId: process.env.REACT_APP_TWITCH_CLIENT_ID,
                authRedirectUri: `${process.env.REACT_APP_BACKEND_URL}/login`,
                scope: ['user:read:email'],
                email: user.email
              })}>
                <button>
                  Link your twitch acc.
                </button>
              </a>
            )}

          </div>
          <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <button onClick={authenticateUser}>Login</button>
      )
      }
    </div >
  )
}

export default User
