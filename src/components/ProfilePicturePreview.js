import * as React from "react";
import styled from "styled-components";

import { faCameraRetro, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { UploadPictureModal } from ".";

function ProfilePicturePreview({ image, justPreview = false, sizeInRem = 10 }) {
  const [showUploadModal, setShowUploadModal] = React.useState(false);

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
        height: `${sizeInRem}rem`
      }}
    >
      {image ? (
        <img src={image.url ? image.url : image} alt="user-dp" />
      ) : (
        <div
          className="default-picture"
          style={{
            fontSize: `${sizeInRem / 2}rem`
          }}
        >
          <FontAwesomeIcon className="user" icon={faUser} />
        </div>
      )}
    </StyledProfilePicturePreview>
  ) : (
    <StyledProfilePicturePreview
      style={{
        width: `${sizeInRem}rem`,
        height: `${sizeInRem}rem`
      }}
    >
      {image ? (
        <img src={image.url ? image.url : image} alt="user-dp" />
      ) : (
        <div
          style={{
            width: `${sizeInRem}rem`,
            height: `${sizeInRem}rem`,
            fontSize: `${sizeInRem / 2}rem`
          }}
          className="default-picture"
        >
          <FontAwesomeIcon className="user" icon={faUser} />
        </div>
      )}
      <div
        role="button"
        tabIndex={0}
        aria-hidden="true"
        onClick={handleShowUploadModal}
        className="overlay hoverable"
      >
        <FontAwesomeIcon className="camera-icon" icon={faCameraRetro} />
      </div>

      <UploadPictureModal
        show={showUploadModal}
        exitModal={handleHideUploadModal}
      />
    </StyledProfilePicturePreview>
  );
}

const StyledProfilePicturePreview = styled.div`
  position: relative;

  .default-picture {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
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
    background: var(--dark-fade-1);
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
