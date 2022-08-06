import * as React from "react";

import styled from "styled-components";

import {
  faTimes,
  faTrashAlt,
  faUpload
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSelector } from "react-redux";

import {
  AlertMessage,
  FileUploader,
  Modal,
  ModalLoader,
  ProfilePicturePreview
} from ".";
import { getAuthInfo } from "../utils/auth";
import { useGetUserData } from "../hooks/queries/userQueries";
import {
  useDeleteProfilePicture,
  useUploadProfilePicture
} from "../hooks/mutations/userMutations";

function UploadPictureModal({ show = false, exitModal = () => {} }) {
  const [isUploading, setIsUploading] = React.useState();

  const { alertMessage } = useSelector((state) => state.ui);

  const { accessToken } = getAuthInfo();

  const {
    userData: user,
    userDataLoading,
    userDataError
  } = useGetUserData(accessToken);

  const { mutateUploadProfilePicture, mutateUploadProfilePictureLoading } =
    useUploadProfilePicture(accessToken);

  const { mutateDeleteProfilePicture } = useDeleteProfilePicture(accessToken);

  const uploadProfilePicture = React.useCallback(
    async (image) => {
      const formData = new FormData();
      formData.append("file", image);

      mutateUploadProfilePicture(formData);
    },
    [mutateUploadProfilePicture]
  );

  const removeProfilePicture = async () => {
    mutateDeleteProfilePicture();
  };

  const showImageCropper = () => {
    setIsUploading(true);
  };

  const hideImageCropper = () => {
    setIsUploading(false);
  };

  return userDataLoading ||
    userDataError ||
    mutateUploadProfilePictureLoading ? (
    <ModalLoader />
  ) : (
    <Modal show={show} alignV="center" clickOutsideCallback={exitModal}>
      <ModalContent>
        <FontAwesomeIcon
          onClick={exitModal}
          className="close-icon hoverable"
          icon={faTimes}
        />
        <div className="title">Profile picture</div>
        <ProfilePicturePreview image={user.profilePicture} justPreview />
        <AlertMessage
          message={alertMessage.message}
          status={alertMessage.status}
        />
        <div className="buttons">
          <FileUploader
            isUploading={isUploading}
            showImageCropper={showImageCropper}
            hideImageCropper={hideImageCropper}
            handleUploadedFile={(file) => {
              uploadProfilePicture(file);
            }}
          >
            <button
              type="button"
              className="primary secondary rounded hoverable-bright"
            >
              <FontAwesomeIcon icon={faUpload} /> Upload
            </button>
          </FileUploader>

          <button
            type="button"
            onClick={removeProfilePicture}
            className="outline-danger rounded"
          >
            <FontAwesomeIcon icon={faTrashAlt} /> Remove
          </button>
        </div>
      </ModalContent>
    </Modal>
  );
}

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  padding: 1.5rem 1.5rem 2rem 1.5rem;
  background-color: var(--light);
  border-radius: 10px;
  width: 80%;
  max-width: 30rem;
  gap: 2rem;

  .close-icon {
    font-size: 1.2rem;
    align-self: flex-end;
  }

  .title {
    padding-left: 0.5rem;
    font-size: 1.5rem;
    align-self: center;
  }

  .buttons {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 2rem;
    font-size: 1.2rem;

    button {
      padding: 0.2rem 1.5rem;
    }
  }

  @media (min-width: 420px) {
    .title {
      align-self: flex-start;
    }
  }
`;

export default UploadPictureModal;
