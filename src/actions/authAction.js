import axios from "axios";
import {
  userDataURL,
  userTwitchDataURL,
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

export const unlinkUserTwitchData = () => async (dispatch) => {
  dispatch({ type: "UNLINK_USER_TWITCH_DATA" })
}

export const updateUserAuthInfo = (userId, accessToken) => async (dispatch) => {
  const userData = await axios.get(userDataURL(userId), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
  });
  await dispatch({
    type: 'UPDATE_USER_AUTH_INFO',
    payload: {
      ...userData.data,
      accessToken
    }
  });

  await dispatch(updateUserTwitchData(userId, accessToken));
}

const updateUserTwitchData = (userId, accessToken) => async (dispatch) => {
  const userTwitchData = await axios.get(userTwitchDataURL(userId), {
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


  await dispatch({
    type: 'UPDATE_USER_TWITCH_DATA',
    payload: { ...userTwitchData.data, twitch_subscribers: userTwitchSubscribers.data },
  });

  // const userTwitchVideos = await axios.get(userTwitchVideosURL(userId), {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${accessToken}`
  //   },
  // });


}
