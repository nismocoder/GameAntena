import axios from 'axios';
import {
  userTwitchDataURL,
  userTwitchSubscribersURL,
} from '../../utils/apiUrls';

const fetchUserTwitchData = async (userId, accessToken) => {
  const { data } = await axios.get(userTwitchDataURL(userId), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

const fetchUserTwitchSubscribers = async (userId, accessToken) => {
  const { data } = await axios.get(userTwitchSubscribersURL(userId), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const getUserTwitchData = async (userId, accessToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      const twitchData = {
        ...(await fetchUserTwitchData(userId, accessToken)),
        subscribers: await fetchUserTwitchSubscribers(userId, accessToken),
      };

      resolve(twitchData);
    } catch (error) {
      reject(error);
    }
  });
};
