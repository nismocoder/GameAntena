export const getLastSegmentURL = (url = '') => {
  return url.split('/').pop();
};
