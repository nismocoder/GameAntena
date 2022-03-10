import React from 'react';

import styled from 'styled-components';

import {
  faTimes,
  faTrashAlt,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  AlertMessage,
  FileUploader,
  Modal,
  ModalLoader,
  ProfilePicturePreview,
} from '.';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateUserInfo } from '../actions/authAction';
import { setAlertMessage } from '../actions/uiAction';

const UploadPictureModal = ({ show = false, exitModal = () => {} }) => {
  const dispatch = useDispatch();

  const { alertMessage } = useSelector((state) => state.ui);
  const { user, accessToken, isLoading } = useSelector((state) => state.auth);

  const uploadProfilePicture = React.useCallback(
    async (image) => {
      try {
        const formData = new FormData();
        formData.append('file', image);

        dispatch({ type: 'LOADING_AUTH' });

        const uploadedImage = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/users/upload-profile-picture/${user.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (uploadedImage.status === 201) {
          dispatch(
            setAlertMessage({
              status: 'success',
              message: 'Profile picture updated!',
            }),
          );
        }

        dispatch(updateUserInfo(user.id, accessToken));
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 422)
          dispatch(
            setAlertMessage({
              status: 'danger',
              message: `Please upload a valid image`,
            }),
          );

        dispatch(
          setAlertMessage({
            status: 'danger',
            message: `Can't update profile picture right now`,
          }),
        );
      } finally {
        dispatch({ type: 'LOADING_AUTH_FINISHED' });
      }
    },
    [accessToken, dispatch, user.id],
  );

  const removeProfilePicture = async () => {
    try {
      dispatch({ type: 'LOADING_AUTH' });

      const result = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/users/delete-profile-picture/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (result.status === 200)
        dispatch(
          setAlertMessage({
            status: 'danger',
            message: `Profile picture removed!`,
          }),
        );

      dispatch(updateUserInfo(user.id, accessToken));
    } catch (error) {
      if (error.response.status === 422)
        dispatch(
          setAlertMessage({
            status: 'danger',
            message: `Upload a profile picture first!`,
          }),
        );
    } finally {
      dispatch({ type: 'LOADING_AUTH_FINISHED' });
    }
  };

  return isLoading ? (
    <ModalLoader />
  ) : (
    <Modal show={show} alignV='center' clickOutsideCallback={exitModal}>
      <ModalContent>
        <FontAwesomeIcon
          onClick={exitModal}
          className='close-icon hoverable'
          icon={faTimes}
        />
        <div className='title'>Profile picture</div>
        <ProfilePicturePreview image={user.profilePicture} justPreview={true} />
        <AlertMessage
          message={alertMessage.message}
          status={alertMessage.status}
          removeAfter={7}
        />
        <div className='buttons'>
          <FileUploader
            handleUploadedFile={(file) => {
              uploadProfilePicture(file);
            }}
          >
            <button className='primary secondary rounded hoverable-bright'>
              <FontAwesomeIcon icon={faUpload} /> Upload
            </button>
          </FileUploader>

          <button
            onClick={removeProfilePicture}
            className='outline-danger rounded'
          >
            <FontAwesomeIcon icon={faTrashAlt} /> Remove
          </button>
        </div>
      </ModalContent>
    </Modal>
  );
};

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
