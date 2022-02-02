import { lastYear, currentDate, nextYear } from './dates';

// URLS
const base_url = 'https://api.rawg.io/api';
const backend_url = process.env.REACT_APP_BACKEND_URL;

// API KEY
const key = `${process.env.REACT_APP_GAME_API}`; // YOUR KEY GOES HERE

const popular_games = `games?key=${key}&dates${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const upcoming_games = `games?key=${key}&dates=${currentDate},${nextYear}&ordering=-added&page_size=10`;
const new_games = `games?key=${key}&dates=${lastYear},${currentDate}&ordering=-released&page_size=10`;

// GAME CATEGORIES
export const popularGamesURL = () => `${base_url}/${popular_games}`;
export const upcomingGamesURL = () => `${base_url}/${upcoming_games}`;
export const newGamesURL = () => `${base_url}/${new_games}`;

// GAME DETAILS
export const gameDetailsURL = (game_id) =>
  `${base_url}/games/${game_id}.json?&key=${key}`;

export const gameScreenshotURL = (game_id) =>
  `${base_url}/games/${game_id}/screenshots?&.json?&key=${key}`;

// SEARCHED GAMES
export const searchGameURL = (game_name) =>
  `${base_url}/games?search=${game_name}&page_size=9&key=${key}`;

// BACKEND - Users
export const userDataURL = (userId) => `${backend_url}/users/${userId}`;

export const userTwitchDataURL = (userId) =>
  `${backend_url}/users/twitch-data/${userId}`;

export const userTwitchVideosURL = (userId) =>
  `${backend_url}/users/twitch-videos/${userId}`;

export const userTwitchSubscribersURL = (userId) =>
  `${backend_url}/users/twitch-subscribers/${userId}`;

export const unlinkTwitchAccountURL = (userId) =>
  `${backend_url}/users/unlink-twitch/${userId}`;

// BACKEND - Streams
export const topTwitchGamingStreamsURL = () =>
  `${backend_url}/twitch/gaming-streams`;

export const topYoutubeGamingStreamsURL = () =>
  `${backend_url}/youtube/gaming-streams`;
