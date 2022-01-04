import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser, updateUserAuthInfo } from '../actions/authAction';
import { setLocalStorageItem, twitchAuthForwardUrl } from '../utils';
import { unlinkTwitchAccountURL } from '../API';

const User = () => {
  const { user, isLoggedIn, accessToken } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    const base = process.env.REACT_APP_BACKEND_URL;

    const loginCredentials = {
      email: 'admin@sample.com',
      password: 'admin123',
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }

    try {
      const result = await axios.post(
        `${base}/login`,
        loginCredentials,
        config
      );

      const { error, message, access_token: accessToken, email, userId } = result.data;

      if (error) return alert(message);

      dispatch(loginUser(email, accessToken));
      dispatch(updateUserAuthInfo(userId, accessToken));

      setLocalStorageItem('accessToken', accessToken, 30);
      setLocalStorageItem('userId', userId, 30);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        return
      }
      alert(error);
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser());

    localStorage.removeItem("email");
    localStorage.removeItem("accessToken");
  }

  const handleUnlink = async () => {
    try {
      await axios.get(unlinkTwitchAccountURL(user.id), {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        return
      }
      alert(error);
    }

    dispatch(updateUserAuthInfo(user.id, accessToken));
  }

  return (
    <div className='user' style={{ flex: 1 }}>
      {isLoggedIn ? (
        <>
          <h4>User email: {user.email}</h4>

          <div>
            {user.twitch_user_id && <h4>Twitch ID: {user.twitch_user_id}</h4>}
            {user.twitch_display_name && <h4>Twitch Name: {user.twitch_display_name}</h4>}
            {user.twitch_email && <h4>Twitch Email: {user.twitch_email}</h4>}
            {user.twitch_display_picture && <h4>Twitch Profile Image: <img width={50} src={user.twitch_display_picture} alt="twitch-avatar" /></h4>}


            {!user.twitch_user_id ? (
              <a href={twitchAuthForwardUrl({
                clientId: process.env.REACT_APP_TWITCH_CLIENT_ID,
                authRedirectUri: `${process.env.REACT_APP_BACKEND_URL}/twitch/auth`,
                scope: ['user:read:email', 'channel:read:subscriptions'],
                email: user.email
              })}>
                <button>
                  Link your twitch acc.
                </button>
              </a>
            ) : (
              <>
                {user.twitch_videos.length > 0 ? (
                  <div>
                    <h4>Twitch Videos:</h4>
                    {user.twitch_videos.map((video) => {
                      const { twitch_id, title, thumbnail_url, url } = video;
                      return (
                        <a style={{
                          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                          width: '20rem',
                          textAlign: 'center',
                          display: 'block',
                        }} target='_blank' href={url} rel="noreferrer">
                          <div
                            key={twitch_id}
                            className="twitch-video"
                            style={{
                              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                              textAlign: 'center',

                            }}
                          >
                            <h4>Video ID: {twitch_id}</h4>
                            <p>Title: {title}</p>
                            <img style={{ margin: '0 auto' }} src={thumbnail_url} alt="video-thumbnail" width={200} height={200} />
                          </div>
                        </a>
                      )
                    })}
                  </div>
                ) : (
                  <p>You don't have any twitch videos</p>
                )}
                <button onClick={handleUnlink}>
                  Unlink your twitch acc.
                </button>
              </>
            )}

          </div>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )
      }
    </div >
  )
}

export default User
