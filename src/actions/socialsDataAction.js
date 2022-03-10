import axios from 'axios';
import { userTwitchDataURL, userYoutubeDataURL } from '../utils/apiUrls';

export const updateUserTwitchData =
  (userId, accessToken) => async (dispatch) => {
    dispatch({ type: 'LOADING_SOCIALS_DATA' });

    try {
      const twitchData = await axios.get(userTwitchDataURL(userId), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch({ type: 'UPDATE_USER_TWITCH_DATA', payload: twitchData.data });
    } catch (error) {
      dispatch({ type: 'NO_TWITCH_DATA' });
    }

    dispatch({ type: 'LOADING_SOCIALS_DATA_FINISHED' });
  };

export const updateUserYoutubeData =
  (userId, accessToken) => async (dispatch) => {
    dispatch({ type: 'LOADING_SOCIALS_DATA' });

    try {
      const youtubeData = await axios.get(userYoutubeDataURL(userId), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch({ type: 'UPDATE_USER_YOUTUBE_DATA', payload: youtubeData.data });
    } catch (error) {
      dispatch({ type: 'NO_YOUTUBE_DATA' });
    }

    dispatch({ type: 'LOADING_SOCIALS_DATA_FINISHED' });
  };
