import axios from "axios";
import {
  userDataURL,
  userTwitchVideosURL,
  userTwitchSubscribersURL
} from "../API";

export const loginUser = (email, accessToken) => async (dispatch) => {
  await dispatch({ type: 'LOGIN_SUCCESS', payload: { email, accessToken } });
}

export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: "LOADING_AUTH",
  });

  setTimeout(() => dispatch({ type: "LOGOUT" }), 500);
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

  const userTwitchSubscribers = await axios.get(userTwitchSubscribersURL(userId), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
  });

  //TODO: ADD A STYLE FOR TWITCH USER SUBSCRIBERS
  console.log(userTwitchSubscribers);

  await dispatch({
    type: 'UPDATE_USER_AUTH_INFO',
    payload: {
      ...userData.data,
      twitch_videos: userTwitchVideos.data,
      subscribers: userTwitchSubscribers.data,
      accessToken
    }
  });
}

