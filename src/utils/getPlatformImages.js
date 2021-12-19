//Icons_images
import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";


export const getPlatformImages = (platform) => {
  return (
    {
      "PlayStation 4": playstation,
      "PlayStation 5": playstation,
      "Xbox Series S/X": xbox,
      "Xbox S": xbox,
      "Xbox One": xbox,
      "Nintendo Switch": nintendo,
      PC: steam,
      iOS: apple,
    }[platform] || gamepad
  );
};