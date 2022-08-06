import { lastYear, currentDate, nextYear } from "./dates";

// CONSTANTS
const RAWG_API_URL = "https://api.rawg.io/api";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// API KEYS
const rawgAPIKey = process.env.REACT_APP_GAME_API; // YOUR KEY GOES HERE

// Filters
const popularGames = `games?key=${rawgAPIKey}&dates${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const upcomingGames = `games?key=${rawgAPIKey}&dates=${currentDate},${nextYear}&ordering=-added&page_size=10`;
const newGames = `games?key=${rawgAPIKey}&dates=${lastYear},${currentDate}&ordering=-released&page_size=10`;

// GAME CATEGORIES
export const popularGamesURL = () => `${RAWG_API_URL}/${popularGames}`;
export const upcomingGamesURL = () => `${RAWG_API_URL}/${upcomingGames}`;
export const newGamesURL = () => `${RAWG_API_URL}/${newGames}`;

// GAME DETAILS
export const gameDetailsURL = (gameId) =>
  `${RAWG_API_URL}/games/${gameId}.json?&key=${rawgAPIKey}`;
export const gameScreenshotURL = (gameId) =>
  `${RAWG_API_URL}/games/${gameId}/screenshots?&.json?&key=${rawgAPIKey}`;

// SEARCH GAMES
export const searchGamesURL = (gameName) =>
  `${RAWG_API_URL}/games?search=${gameName}&page_size=12&key=${rawgAPIKey}`;

// BACKEND - Auth
export const loginUserURL = () => `${BACKEND_URL}/login`;
export const registerUserURL = () => `${BACKEND_URL}/register`;
export const emailConfirmURL = () => `${BACKEND_URL}/email/confirm`;

// BACKEND - Users
export const userDataURL = () => `${BACKEND_URL}/users/me`;
export const userUpdateInfoURL = () => `${BACKEND_URL}/users/me/update-info`;
export const uploadProfilePictureURL = () =>
  `${BACKEND_URL}/users/me/upload-profile-picture`;
export const deleteProfilePictureURL = () =>
  `${BACKEND_URL}/users/me/delete-profile-picture`;

export const deleteUserAccountURL = () =>
  `${BACKEND_URL}/users/me/delete-account`;

// BACKEND - User's  Twitch
export const userTwitchDataURL = () => `${BACKEND_URL}/users/me/twitch-data`;
export const userTwitchSubscribersURL = () =>
  `${BACKEND_URL}/users/me/twitch-subscribers`;
export const unlinkTwitchAccountURL = () =>
  `${BACKEND_URL}/users/me/unlink-twitch/`;

// BACKEND - Users's YouTube
export const userYoutubeDataURL = () => `${BACKEND_URL}/users/me/youtube-data`;
export const userYoutubeSubscribersURL = () =>
  `${BACKEND_URL}/users/me/youtube-subscribers`;
export const unlinkYoutubeAccountURL = () =>
  `${BACKEND_URL}/users/me/unlink-youtube`;

// BACKEND - Streams
export const topTwitchGamingStreamsURL = () =>
  `${BACKEND_URL}/twitch/gaming-streams`;
export const topYoutubeGamingStreamsURL = () =>
  `${BACKEND_URL}/youtube/gaming-streams`;

// BACKEND - Search streams
export const searchTwitchURL = (query) =>
  `${BACKEND_URL}/twitch/search?query=${query}`;

export const searchYoutubeURL = (query) =>
  `${BACKEND_URL}/youtube/search?query=${query}`;
