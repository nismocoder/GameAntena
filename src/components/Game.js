import React from "react";
// styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
// REDUX
import { useDispatch } from "react-redux";
import { loadDetail } from "../actions/detailAction";
import { Link } from "react-router-dom";
import { smallImage } from "../utils/";

const Game = ({ name, released, image, id }) => {
  const stringPathId = id.toString();

  // LOAD DETAIL HANDLER
  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    document.body.style.overflow = "hidden";
    dispatch(loadDetail(id));
  };
  return (
    <StyledGame LayoutId={stringPathId} onClick={loadDetailHandler}>
      <Link to={`/game/${id}`}>
        <div className="title">
          <motion.h3 LayoutId={`title ${stringPathId}`}>{name}</motion.h3>
        </div>
        {/* <p>{released}</p> */}
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
  position: relative;

  .title {
    width: 100%;
    bottom: 0;
    color: var(--light);
    text-align: left;
    position: absolute;
    padding: 5rem 1rem 1.5rem 1rem;
    background-image: linear-gradient(
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.48) 80%
    )
  }

  img {
    width: 100%;
    height: 50vh;
    object-fit: cover;
  }
  text-align: center;
  min-height: 30vh;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.2);
`;

export default Game;
