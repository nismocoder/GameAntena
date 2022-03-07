import React from 'react';
import { useHistory, Route } from 'react-router-dom';
import { useQuery } from 'react-query';

// components
import { Modal, Loader } from '.';

//styling and animation
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { getLastSegmentURL, getPlatformImages } from '../utils';

import { getGameDetails } from '../services/games/gameDetailsAPI';

const Gamedetails = () => {
  const history = useHistory();
  const pathname = history.location.pathname;

  const exitModal = () => {
    history.push('/');
  };

  const gameId = getLastSegmentURL(pathname);

  const { data: details, isLoading } = useQuery(
    `${gameId}-details`,
    () => getGameDetails(gameId),
    {
      enabled: !!gameId,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <Route
      path={'/game'}
      render={() => (
        <Modal controlled={false} clickOutsideCallback={exitModal}>
          <Detail
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.2, opacity: 0.5 }}
            transition={{ duration: 0.7, type: 'spring' }}
          >
            {isLoading ? (
              <Loader style={{ transform: 'scale(1.5)' }} />
            ) : (
              <>
                <Stats>
                  <div>
                    <motion.h3 className='title'>{details.name}</motion.h3>
                    <p className='rating'>Rating: {details.rating}</p>
                  </div>
                  <div>
                    <h3>Platforms</h3>
                    <Platforms>
                      {details.platforms.map((data) => (
                        <img
                          alt='platform-icon'
                          key={data.platform.id}
                          src={getPlatformImages(data.platform.name)}
                        ></img>
                      ))}
                    </Platforms>
                  </div>
                </Stats>
                <Media>
                  <motion.img
                    src={details.background_image}
                    alt={details.background_image}
                  />
                </Media>

                <Description>
                  <p>{details.description_raw}</p>
                </Description>
                <div className='gallery'>
                  {details.screens.map((screen) => (
                    <img
                      src={screen.image}
                      key={screen.id}
                      alt={screen.image}
                    />
                  ))}
                </div>
              </>
            )}
          </Detail>
        </Modal>
      )}
    />
  );
};

const Detail = styled(motion.div)`
  width: 85%;
  border-radius: 1rem;
  padding: 5vw;
  background: lightgrey;
  position: absolute;
  color: black;
  img {
    width: 100%;
  }

  @media (max-width: 360px) {
    font-size: 0.8rem;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-flow: row wrap;
  gap: 4rem;

  .title {
    font-size: 1.5em;
    font-family: var(--font-1);
    margin-bottom: 0.5rem;
  }

  .rating {
    font-size: 1.2em;
  }
`;

const Platforms = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  img {
    width: 40px;
  }

  @media (max-width: 360px) {
    img {
      width: 30px;
    }
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
  letter-spacing: 0.5px;
  font-size: 1.2em;
`;

export default Gamedetails;
