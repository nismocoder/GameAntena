import React, { useEffect } from "react";
//Redux
import { useDispatch } from "react-redux";
import { loadGames } from "../actions/gamesAction";
// components
import { GameList } from "../components";
// utils
import { getLocalStorageItem } from "../utils";
import { updateUserAuthInfo } from "../actions/authAction";

const Home = () => {

  // Fetch Games
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGames());
    if (typeof window !== "undefined") {
      let accessToken = getLocalStorageItem("accessToken");
      let userId = getLocalStorageItem("userId");

      if (userId && accessToken) {
        dispatch(updateUserAuthInfo(userId, accessToken));
      }
    }
  }, [dispatch]);

  return (
    <>
      <h2>TODO: ADD SIDEBAR</h2>
      <GameList />
    </>
  );
};




export default Home;
