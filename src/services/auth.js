import axios from "axios";
import {
  emailConfirmURL,
  loginUserURL,
  registerUserURL
} from "../utils/apiUrls";
import { persistToken } from "../utils/auth";

export const loginUser = async (credentials) => {
  try {
    const { data: loginResponse } = await axios.post(
      loginUserURL(),
      credentials
    );

    const { access_token: accessToken } = loginResponse;

    persistToken(accessToken);
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (credentials) => {
  try {
    await axios.post(registerUserURL(), credentials);
  } catch (error) {
    throw error;
  }
};

export const emailConfirm = async (token = "") => {
  const { data } = await axios.post(emailConfirmURL(), {
    token
  });

  return data;
};
