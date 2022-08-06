import { twitchAuthForwardUrl, youtubeAuthForwardUrl } from ".";

export const getAuthForwardUrl = (pathname = "", email = "") => {
  if (pathname === "/twitch-gaming")
    return twitchAuthForwardUrl({
      clientId: process.env.REACT_APP_TWITCH_CLIENT_ID,
      authRedirectUri: `${process.env.REACT_APP_BACKEND_URL}/twitch/auth`,
      scope: ["user:read:email", "channel:read:subscriptions"],
      email,
      redirectPage: "/twitch-gaming"
    });

  if (pathname === "/youtube-gaming")
    return youtubeAuthForwardUrl({
      clientId: process.env.REACT_APP_YOUTUBE_CLIENT_ID,
      authRedirectUri: `${process.env.REACT_APP_BACKEND_URL}/youtube/auth`,
      scope: ["https://www.googleapis.com/auth/youtube.readonly"],
      email,
      redirectPage: "/youtube-gaming"
    });

  throw new Error(
    "pathname must be either of the two ['/twitch-gaming', '/youtube-gaming']"
  );
};

export const getGameSectionUrl = (pathname = "", game = "") => {
  if (pathname === "/twitch-gaming")
    return `https://www.twitch.tv/directory/game/${game}`;

  if (pathname === "/youtube-gaming")
    return `https://www.youtube.com/results?search_query=${game}&sp=CAMSBBABQAE%253D`;

  if (!game) {
    throw new Error("game must be defined");
  }

  throw new Error(
    "pathname must be either of the two ['/twitch-gaming', '/youtube-gaming']"
  );
};

export const getChannelMenuBackground = (pathname = "") => {
  if (pathname === "/twitch-gaming") return "var(--twitch-purple)";
  if (pathname === "/youtube-gaming") return "var(--youtube-red)";

  throw new Error(
    "pathname must be either of the two ['/twitch-gaming', '/youtube-gaming']"
  );
};

export const getSearchPlaceholder = (path) => {
  if (path === "/" || path === "/my-profile" || path.includes("/games/"))
    return "Search a game..";

  if (path === "/twitch-gaming")
    return "Search a Twitch channel or live stream..";

  if (path === "/youtube-gaming")
    return "Search a YouTube channel or live stream..";

  throw new Error(
    "pathname must be either of the three ['/', '/twitch-gaming', '/youtube-gaming']"
  );
};
