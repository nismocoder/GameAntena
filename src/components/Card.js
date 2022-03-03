import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = ({ icons = [], description, buttonText, redirectTo = '/' }) => {
  return (
    <StyledCard className='card'>
      {icons.length > 1 ? (
        <div className='icons'>
          {icons.map((icon, index) => (
            <>
              <FontAwesomeIcon icon={icon} />
              {index !== icons.length - 1 && '|'}
            </>
          ))}
        </div>
      ) : (
        <FontAwesomeIcon className='icon' icon={icons[0]} />
      )}

      <div className='description'>{description}</div>
      <Link to={redirectTo}>
        <button className='light'>{buttonText}</button>
      </Link>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 3rem;
  border-radius: 20px;
  border: 2px solid var(--primary);
  transition: 0.3s ease-out;
  transition-property: color, background-color;
  cursor: pointer;

  .icon {
    font-size: 2rem;
  }

  .icons {
    font-size: 1.7rem;
  }

  .description {
    font-size: 0.9rem;
    text-align: center;
  }

  button {
    padding: 0.5rem 1rem;
  }
`;

export default Card;
