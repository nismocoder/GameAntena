// export const resizeImage = (imageUrl, size) => {
//   return imageUrl.match(/media\/(screenshots|games)/)
//     ? imageUrl.replace("/media/", `/media/resize/${size}/-/`)
//     : imageUrl;
// };

export const smallImage = (imagePath, size) => {
  if (imagePath) {
    const image = imagePath.match(/media\/screenshots/)
      ? imagePath.replace(
          "media/screenshots",
          `media/resize/${size}/-/screenshots`
        )
      : imagePath.replace("/media/games/", `/media/resize/${size}/-/games/`);
    return image;
  }
  return imagePath;
};
