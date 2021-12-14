import axios from "axios";

export const updateUserAuthInfo = (email, accessToken) => async (dispatch) => {
  const usersData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${email}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
  });

  dispatch({
    type: 'UPDATE_USER_AUTH_INFO',
    payload: { ...usersData.data, email }
  });
}

