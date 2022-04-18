import { twitchAuthForwardUrl, youtubeAuthForwardUrl } from '.';

export const getPlatformName = (pathname = '/') => {
  if (pathname === '/twitch-gaming') return 'Twitch';
  if (pathname === '/youtube-gaming') return '';
};

export const getAuthForwardUrl = (pathname = '/', email) => {
  if (pathname === '/twitch-gaming')
    return twitchAuthForwardUrl({
      clientId: process.env.REACT_APP_TWITCH_CLIENT_ID,
      authRedirectUri: `${process.env.REACT_APP_BACKEND_URL}/twitch/auth`,
      scope: ['user:read:email', 'channel:read:subscriptions'],
      email,
    });

  if (pathname === '/youtube-gaming')
    return youtubeAuthForwardUrl({
      clientId: process.env.REACT_APP_YOUTUBE_CLIENT_ID,
      authRedirectUri: `${process.env.REACT_APP_BACKEND_URL}/youtube/auth`,
      scope: ['https://www.googleapis.com/auth/youtube.readonly'],
      email,
    });
};

export const getGameSectionUrl = (pathname = '/', game = '') => {
  if (pathname === '/twitch-gaming')
    return `https://www.twitch.tv/directory/game/${game}`;

  if (pathname === '/youtube-gaming')
    return `https://www.youtube.com/results?search_query=${game}&sp=CAMSBBABQAE%253D`;
};

export const getChannelMenuBackground = (pathname = '/') => {
  if (pathname === '/twitch-gaming') return 'var(--twitch-purple)';
  if (pathname === '/youtube-gaming') return 'var(--youtube-red)';
};

export const getSearchPlaceholder = (path) => {
  if (path === '/' || path === '/my-profile' || path.includes('/games/'))
    return 'Search a game..';
  if (path === '/twitch-gaming') return 'Search Twitch stream..';
  if (path === '/youtube-gaming') return 'Search YouTube stream..';
};
