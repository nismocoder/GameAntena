import axios from 'axios';
import { userDataURL } from '../utils/apiUrls';

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: 'LOADING_AUTH',
  });

  setTimeout(() => dispatch({ type: 'LOGOUT' }), 500);

  localStorage.removeItem('userId');
  localStorage.removeItem('accessToken');
};

export const updateUserInfo = (userId, accessToken) => async (dispatch) => {
  dispatch({ type: 'LOADING_AUTH' });

  const userData = await axios.get(userDataURL(userId), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  await dispatch({
    type: 'UPDATE_USER_INFO',
    payload: userData.data,
  });

  dispatch({ type: 'LOADING_AUTH_FINISHED' });
};

export const updateAuthInfo = (isLoggedIn, accessToken) => async (dispatch) => {
  dispatch({ type: 'LOADING_AUTH' });

  await dispatch({
    type: 'UPDATE_AUTH_INFO',
    payload: { isLoggedIn, accessToken },
  });

  dispatch({ type: 'LOADING_AUTH_FINISHED' });
};
