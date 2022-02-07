import axios from 'axios';
import {
  userYoutubeDataURL,
  userYoutubeSubscribersURL,
} from '../../utils/apiUrls';

const fetchUserYoutubeData = async (userId, accessToken) => {
  const { data } = await axios.get(userYoutubeDataURL(userId), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

const fetchUserYoutubeSubscribers = async (userId, accessToken) => {
  const { data } = await axios.get(userYoutubeSubscribersURL(userId), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const getUserYoutubeData = async (userId, accessToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      const youtubeData = {
        ...(await fetchUserYoutubeData(userId, accessToken)),
        subscribers: await fetchUserYoutubeSubscribers(userId, accessToken),
      };

      resolve(youtubeData);
    } catch (error) {
      reject(error);
    }
  });
};
