import { getLocalStorageItem, setLocalStorageItem } from ".";

export const getAuthInfo = () => {
  const accessToken = getLocalStorageItem("accessToken") || "";

  return { accessToken, isLoggedIn: !!accessToken };
};

export const persistToken = (accessToken) => {
  setLocalStorageItem({
    key: "accessToken",
    value: accessToken,
    expiredInMinutes: 30
  });
};

export const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};
