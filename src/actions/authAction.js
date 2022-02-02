import axios from 'axios';
import { userDataURL } from '../utils/apiUrls';

export const loginUser = (email, accessToken) => (dispatch) => {
  dispatch({ type: 'LOGIN_SUCCESS', payload: { email, accessToken } });
};

export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: 'LOADING_AUTH',
  });

  setTimeout(() => dispatch({ type: 'LOGOUT' }), 500);
};

export const updateUserAuthInfo = (userId, accessToken) => async (dispatch) => {
  const userData = await axios.get(userDataURL(userId), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  await dispatch({
    type: 'UPDATE_USER_AUTH_INFO',
    payload: {
      ...userData.data,
      accessToken,
    },
  });
};
