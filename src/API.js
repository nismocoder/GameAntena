//Base url
const base_url = "https://api.rawg.io/api/";

const backend_url = process.env.REACT_APP_BACKEND_URL;

//Getting the date
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
};

//Getting the date
const getCurrentDay = () => {
  const day = new Date().getDate();
  if (day < 10) {
    return `0${day}`;
  } else {
    return day;
  }
};

//current day/month/year
const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;
console.log(currentDate);

// Key things
const key = `${process.env.REACT_APP_GAME_API}`; // YOUR KEY GOES HERE
const key_url = `key=${key}`;

//popular games

// const popular_games =
//   "games?dates=${lastYear},${currentDate}&ordering=-rating&page_size=10";
const popular_games = `games?key=${key}&dates${lastYear},${currentDate}&ordering=-rating&page_size=10`;

const upcoming_games = `games?key=${key}&dates=${currentDate},${nextYear}&ordering=-added&page_size=10`;

const new_games = `games?key=${key}&dates=${lastYear},${currentDate}&ordering=-released&page_size=10`;

export const popularGamesURL = () => `${base_url}${popular_games}`;
export const upcomingGamesURL = () => `${base_url}${upcoming_games}`;
export const newGamesURL = () => `${base_url}${new_games}`;

// GAME DETAILS

// export const gameDetailsURL = (game_id) => `${base_url}games/${game_id}`;
// export const gameScreenshotURL = (game_id) => `${base_url}games/${game_id}/screenshots`;

export const gameDetailsURL = (game_id) =>
  `${base_url}games/${game_id}.json?&key=${key}`;

// export const gameDetailsURL = (game_id) =>
//   `${base_url}games/${game_id}?key=${key}`;

export const gameScreenshotURL = (game_id) =>
  `${base_url}games/${game_id}/screenshots?&.json?&key=${key}`;

// export const gameScreenshotURL = (game_id) =>
//   `${base_url}games/${game_id}/screenshots?key=${key}`;

//Searched game
export const searchGameURL = (game_name) =>
  `${base_url}games?search=${game_name}&page_size=9&key=${key}`;

export const userDataURL = (userId) =>
  `${backend_url}/users/${userId}`;

export const userTwitchVideosURL = (userId) =>
  `${backend_url}/users/twitch-videos/${userId}`;

export const userTwitchSubscribersURL = (userId) =>
  `${backend_url}/users/twitch-subscribers/${userId}`;

export const unlinkTwitchAccountURL = (userId) =>
  `${backend_url}/users/unlink-twitch/${userId}`;

export const topGamingStreamsURL = () =>
  `${backend_url}/twitch/gaming-streams`