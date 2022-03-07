import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { faCameraRetro, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { UploadPictureModal } from '.';

const ProfilePicturePreview = ({ justPreview = false, sizeInRem = 10 }) => {
  const [showUploadModal, setShowUploadModal] = React.useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleShowUploadModal = () => {
    setShowUploadModal(true);
  };

  const handleHideUploadModal = () => {
    setShowUploadModal(false);
  };

  return justPreview ? (
    <StyledProfilePicturePreview
      style={{
        width: `${sizeInRem}rem`,
        height: `${sizeInRem}rem`,
      }}
    >
      {user.profilePicture ? (
        <img src={`${user.profilePicture}`} alt='user-dp' />
      ) : (
        <div className='default-picture'>
          <FontAwesomeIcon className='user' icon={faUser} />
        </div>
      )}
    </StyledProfilePicturePreview>
  ) : (
    <StyledProfilePicturePreview
      style={{
        width: `${sizeInRem}rem`,
        height: `${sizeInRem}rem`,
      }}
    >
      {user.profilePicture ? (
        <img src={`${user.profilePicture}`} alt='user-dp' />
      ) : (
        <div className='default-picture'>
          <FontAwesomeIcon className='user' icon={faUser} />
        </div>
      )}
      <div onClick={handleShowUploadModal} className='overlay hoverable'>
        <FontAwesomeIcon className='camera-icon' icon={faCameraRetro} />
      </div>

      <UploadPictureModal
        show={showUploadModal}
        exitModal={handleHideUploadModal}
      />
    </StyledProfilePicturePreview>
  );
};

const StyledProfilePicturePreview = styled.div`
  position: relative;

  .default-picture {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 5rem;
    background-color: var(--shade-4);
    color: var(--light);
    border-radius: 50%;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    clip-path: circle(50% at 50% 50%);
    -webkit-mask-image: linear-gradient(to top, red 50%, black 100%);
    mask-image: linear-gradient(to top, red 50%, black 50%);*/
  }

  .overlay {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    border-radius: 50%;
    background: var(--dark-faded-1);
    clip-path: inset(64% 0 0 0 round 0);
    -webkit-tap-highlight-color: transparent;

    .camera-icon {
      position: absolute;
      top: 80%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
      color: var(--light);
    }
  }
`;

export default ProfilePicturePreview;