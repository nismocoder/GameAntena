import axios from "axios";
import { userDataURL, userTwitchVideosURL } from "../API";

export const loginUser = (email, accessToken) => async (dispatch) => {
  await dispatch({ type: 'LOGIN_SUCCESS', payload: { email, accessToken } });
}

export const logoutUser = () => async (dispatch) => {
  await dispatch({ type: "LOGOUT" });
}

export const updateUserAuthInfo = (userId, accessToken) => async (dispatch) => {
  const userData = await axios.get(userDataURL(userId), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
  });

  const userTwitchVideos = await axios.get(userTwitchVideosURL(userId), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
  });

  await dispatch({
    type: 'UPDATE_USER_AUTH_INFO',
    payload: { ...userData.data, twitch_videos: userTwitchVideos.data, accessToken }
  });
}

