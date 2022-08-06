import axios from "axios";
import { configWithToken } from "../../utils";
import {
  unlinkTwitchAccountURL,
  userTwitchDataURL,
  userTwitchSubscribersURL
} from "../../utils/apiUrls";

const fetchUserTwitchData = async (accessToken) => {
  const { data } = await axios.get(
    userTwitchDataURL(),
    configWithToken(accessToken)
  );
  return data;
};

const fetchUserTwitchSubscribers = async (accessToken) => {
  const { data } = await axios.get(
    userTwitchSubscribersURL(),
    configWithToken(accessToken)
  );
  return data;
};

export const getUserTwitchData = async (accessToken) => {
  return new Promise((resolve, reject) => {
    try {
      const getTwitchData = async () => {
        return {
          ...(await fetchUserTwitchData(accessToken)),
          subscribers: await fetchUserTwitchSubscribers(accessToken)
        };
      };

      resolve(getTwitchData());
    } catch (error) {
      reject(error);
    }
  });
};

export const unlinkTwitchAccount = async (accessToken) => {
  await axios.get(unlinkTwitchAccountURL(), configWithToken(accessToken));
};
