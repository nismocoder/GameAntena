import axios from "axios";
import { gameDetailsURL, gameScreenshotURL } from "../API";
import detailReducer from "../reducers/detailReducer";

// Key things
const key = "23c3d5a5e3f14be399ecc29f152009c1";
const key_url = `key=${key}`;
const base_url = "https://api.rawg.io/api/";

export const loadDetail = (id) => async (dispatch) => {
  dispatch({
    type: "LOADING_DETAIL",
  });

  const detailData = await axios.get(gameDetailsURL(id));
  const screenShotData = await axios.get(gameScreenshotURL(id));
  dispatch({
    type: "GET_DETAIL",
    payload: {
      game: detailData.data,
      screen: screenShotData.data,
    },
  });
};

