import React from "react";
// styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
// REDUX
import { useDispatch } from "react-redux";
import { loadDetail } from "../actions/detailAction";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { smallImage } from "../utils/";

const Game = ({ name, released, image, id }) => {
  const stringPathId = id.toString();
  //Fix scrolling
  const history = useHistory();
  if (history.location.pathname === "/") {
    document.body.style.overflow = "auto";
  } else {
    document.body.style.overflow = "hidden";
  }
  // LOAD DETAIL HANDLER
  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    document.body.style.overflow = "hidden";
    dispatch(loadDetail(id));
  };
  return (
    <StyledGame LayoutId={stringPathId} onClick={loadDetailHandler}>
      <Link to={`/game/${id}`}>
        <motion.h3 LayoutId={`title ${stringPathId}`}>{name}</motion.h3>
        <p>{released}</p>
        <motion.img
          LayoutId={`image $ stringPathId`}
          src={smallImage(image, 640)}
          alt={name}
        />
      </Link>
    </StyledGame>
  );
};

const StyledGame = styled(motion.div)`
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
  text-align: center;
  border-radius: 1rem;
  min-height: 30vh;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.2);
`;

export default Game;
