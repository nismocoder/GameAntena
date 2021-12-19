import React from "react";
// components
import { Modal, Loader } from "./";
//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
//Redux
import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";
//utils
import { getPlatformImages } from "../utils";

const Gamedetail = ({ pathId }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  //exit detail
  const exitCallback = () => {
    dispatch({ type: "CLOSE_DETAIL" });
    history.push('/');
  }

  //data
  const { screen, game, isLoading } = useSelector((state) => state.detail);

  return (
    <Route path={'/game'} render={() => (
      <Modal
        controlled={false}
        exitCallback={exitCallback}
      >
        <Detail
          LayoutId={pathId}
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.2, opacity: 0.5 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <Stats>
            <div className="rating">
              <motion.h3 LayoutId={`title ${pathId}`}>{game.name}</motion.h3>
              <p>Rating: {game.rating}</p>
            </div>
            <Info>
              <h3>Platforms</h3>
              <Platforms>
                {game.platforms.map((data) => (
                  <img
                    alt='platform-icon'
                    key={data.platform.id}
                    src={getPlatformImages(data.platform.name)}
                  ></img>
                ))}
              </Platforms>
            </Info>
          </Stats>
          <Media>
            <motion.img
              LayoutId={`image ${pathId}`}
              src={game.background_image}
              alt={game.background_image}
            />
          </Media>
          {isLoading && <Loader />}
          <Description>
            <p>{game.description_raw}</p>
          </Description>
          <div className="gallery">
            {screen.results.map((screen) => (
              <img src={screen.image} key={screen.id} alt={screen.image} />
            ))}
          </div>
        </Detail>
      </Modal>
    )}
    />

  );
};


const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: lightgrey;
  position: absolute;
  z-index: 10;
  left: 10%;
  color: black;
  img {
    width: 100%;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled(motion.div)`
  text-align: center;
`;

const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  img {
    margin-left: 3rem;
  }
`;

const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
  }
`;

const Description = styled(motion.div)`
  margin: 5rem 0rem;
`;

export default Gamedetail;
