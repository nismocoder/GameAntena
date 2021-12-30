import React from "react";

import { GameList, SideMenu, Nav } from "../components";

import { motion } from "framer-motion";

import styled from "styled-components";

const Home = () => {

  document.body.style.overflow = "hidden";

  return (
    <>
      <Nav />
      <Flex>
        <SideMenu />
        <GameList />
      </Flex>
    </>
  );
};

const Flex = styled(motion.div)`
  display: flex !important;
`;




export default Home;
