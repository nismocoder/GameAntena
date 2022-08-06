import axios from "axios";
import { configWithToken } from "../../utils";
import {
  unlinkYoutubeAccountURL,
  userYoutubeDataURL,
  userYoutubeSubscribersURL
} from "../../utils/apiUrls";

const fetchUserYoutubeData = async (accessToken) => {
  const { data } = await axios.get(
    userYoutubeDataURL(),
    configWithToken(accessToken)
  );
  return data;
};

const fetchUserYoutubeSubscribers = async (accessToken) => {
  const { data } = await axios.get(
    userYoutubeSubscribersURL(),
    configWithToken(accessToken)
  );
  return data;
};

export const getUserYoutubeData = async (accessToken) => {
  return new Promise((resolve, reject) => {
    try {
      const getYoutubeData = async () => {
        return {
          ...(await fetchUserYoutubeData(accessToken)),
          subscribers: await fetchUserYoutubeSubscribers(accessToken)
        };
      };

      resolve(getYoutubeData());
    } catch (error) {
      reject(error);
    }
  });
};

export const unlinkYoutubeAccount = async (accessToken) => {
  await axios.get(unlinkYoutubeAccountURL(), configWithToken(accessToken));
};
