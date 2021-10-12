import { combineReducers } from "redux";
import gamesReducer from "./gamesReducer";
import detailReducer from "./detailReducer";

const rootreducer = combineReducers({
  games: gamesReducer,
  detail: detailReducer,
});

export default rootreducer;
