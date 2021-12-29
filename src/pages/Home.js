import React, { useEffect } from "react";
//Redux
import { useDispatch } from "react-redux";
import { loadGames } from "../actions/gamesAction";
// components
import { GameList, SideMenu } from "../components";
// utils
import { getLocalStorageItem } from "../utils";
import { updateUserAuthInfo } from "../actions/authAction";

import { AnimateSharedLayout, motion } from "framer-motion";

import styled from "styled-components";

const Home = () => {

  document.body.style.overflow = "hidden";

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
    <Flex>
      <SideMenu />
      <GameList />
    </Flex>
  );
};

const Flex = styled(motion.div)`
  display: flex !important;
`;




export default Home;
