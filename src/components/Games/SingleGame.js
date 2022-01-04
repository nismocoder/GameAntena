import React from "react";
// styling and animation
import styled from "styled-components";
// REDUX
import { useDispatch } from "react-redux";
import { loadDetail } from "../../actions/detailAction";
import { Link } from "react-router-dom";
import { smallImage } from "../../utils";

const Game = ({ name, released, image, id }) => {
  // LOAD DETAIL HANDLER
  const dispatch = useDispatch();

  const loadDetailHandler = () => {
    dispatch(loadDetail(id));
  };

  return (
    <StyledGame
      onClick={loadDetailHandler}
      className="hoverable"
    >
      <Link to={`/game/${id}`}>
        <p className="title">{name}</p>
        {/* <p>{released}</p> */}
        <img
          src={smallImage(image, 640)}
          alt={name}
        />
      </Link>
    </StyledGame>
  );
};

const StyledGame = styled.div`
  position: relative;
  min-height: 40vh; 
  text-align: left;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.2);

  .title {
    width: 100%;
    bottom: 0;
    color: var(--light);
    position: absolute;
    padding: 5rem 1rem 1.5rem 1rem;
    background-image: linear-gradient(
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.48) 80%
    );
    font-size: 1.1rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default Game;
