import { getLocalStorageItem } from '.';

export const getAuthInfo = () => {
  const userId = getLocalStorageItem('userId');
  const accessToken = getLocalStorageItem('accessToken');
  if (userId && accessToken) return { userId, accessToken, isLoggedIn: true };
  return { userId: '', accessToken: '', isLoggedIn: false };
};
