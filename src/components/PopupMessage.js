import React from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { getLocalStorageItem, setLocalStorageItem } from '../utils';

const PopupMessage = ({ children }) => {
  const [showPopup, setShowPopup] = React.useState(true);

  const hideShowPopup = () => {
    setShowPopup(false);

    setLocalStorageItem('privacy-policy-consent', true);
  };

  React.useEffect(() => {
    if (getLocalStorageItem('privacy-policy-consent')) setShowPopup(false);
  }, [showPopup]);

  return (
    showPopup && (
      <StyledPopupMessage>
        <FontAwesomeIcon
          className='close-icon hoverable'
          icon={faXmark}
          onClick={hideShowPopup}
        />{' '}
        <div className='content'>{children}</div>
      </StyledPopupMessage>
    )
  );
};

const StyledPopupMessage = styled.div`
  position: fixed;
  bottom: 0;
  right: 50%;
  transform: translateX(50%);
  background-color: var(--shade-2);
  padding: 2rem 10vw;
  width: 100vw;
  color: var(--light);
  z-index: 5;

  a {
    text-decoration: underline;
  }

  .close-icon {
    position: absolute;
    right: 5%;
    top: 10%;
    font-size: 1.5rem;
  }

  .content {
    width: 100%;
    max-width: 50rem;
  }

  @media (min-width: 40rem) {
    .close-icon {
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

export default PopupMessage;
