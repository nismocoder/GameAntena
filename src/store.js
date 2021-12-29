import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer, gamesReducer, detailReducer, uiReducer } from "./reducers";

const rootreducer = combineReducers({
  auth: authReducer,
  games: gamesReducer,
  detail: detailReducer,
  ui: uiReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootreducer,
  composeEnhancer(applyMiddleware(thunk)),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
