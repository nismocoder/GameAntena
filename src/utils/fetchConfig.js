// eslint-disable-next-line import/prefer-default-export
export const configWithToken = (accessToken = "") => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };
};
