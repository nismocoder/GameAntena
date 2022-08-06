const getLastSegmentURL = (url = "") => {
  return url.split("/").pop();
};

export default getLastSegmentURL;
