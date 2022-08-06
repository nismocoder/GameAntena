import axios from "axios";
import { configWithToken } from "../../utils";
import {
  deleteProfilePictureURL,
  deleteUserAccountURL,
  uploadProfilePictureURL,
  userDataURL,
  userUpdateInfoURL
} from "../../utils/apiUrls";

export const getUserData = async (accessToken = "") => {
  const { data: userData } = await axios.get(
    userDataURL(),
    configWithToken(accessToken)
  );

  return userData;
};

export const updateUserData = (updateFields, accessToken = "") => {
  return axios.put(
    userUpdateInfoURL(),
    updateFields,
    configWithToken(accessToken)
  );
};

export const deleteUserAccount = (accessToken = "") => {
  return axios.delete(deleteUserAccountURL(), configWithToken(accessToken));
};

export const uploadProfilePicture = (formData, accessToken = "") => {
  return axios.post(
    uploadProfilePictureURL(),
    formData,
    configWithToken(accessToken)
  );
};

export const deleteProfilePicture = (accessToken) => {
  return axios.delete(deleteProfilePictureURL(), configWithToken(accessToken));
};
