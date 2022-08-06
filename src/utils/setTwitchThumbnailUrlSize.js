const setTwitchThumbnailUrlSize = (thumbnailUrl, { width, height }) => {
  const widthReplaced = thumbnailUrl.replace("{width}", width);

  return widthReplaced.replace("{height}", height);
};

export default setTwitchThumbnailUrlSize;
