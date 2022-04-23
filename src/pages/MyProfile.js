import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { WithSideMenuAndNav, AdjustToSideMenu } from './layout';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ProfilePicturePreview,
  AlertMessage,
  ModalLoader,
} from '../components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  deleteUserAccount,
  logoutUser,
  updateUserInfo,
} from '../actions/authAction';
import { setAlertMessage } from '../actions/uiAction';
import { twitchAuthForwardUrl, youtubeAuthForwardUrl } from '../utils';
import {
  updateUserTwitchData,
  updateUserYoutubeData,
} from '../actions/socialsDataAction';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { alertMessage } = useSelector((state) => state.ui);
  const { user, accessToken } = useSelector((state) => state.auth);
  const { twitchData, youtubeData, isLoading } = useSelector(
    (state) => state.socialsData,
  );

  const [userInfoField, setUserInfoField] = React.useState({
    name: { value: '', isEditing: false },
    displayPicture: '',
  });
  const [fieldChangeToBeSaved, setFieldChangeToBeSaved] = React.useState(false);

  document.title = user.displayName
    ? `My Profile | ${user.displayName}`
    : 'My Profile';

  const makeFieldEditable = (field) => {
    setUserInfoField((state) => ({
      ...state,
      [field]: { ...state[field], isEditing: true },
    }));
  };

  const disableFieldEdit = (field) => {
    if (field === 'name' && userInfoField.name.value === '')
      return setUserInfoField((state) => ({
        ...state,
        name: { value: user.displayName, isEditing: false },
      }));

    setUserInfoField((state) => ({
      ...state,
      [field]: { ...state[field], isEditing: false },
    }));
  };

  const blurFieldOnEnter = (event) => {
    if (event.which === 13) event.target.blur();
  };

  const handleFieldEdit = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    setUserInfoField((state) => ({
      ...state,
      [field]: { ...state[field], value },
    }));
  };

  const resetFields = () => {
    setUserInfoField((state) => ({
      ...state,
      name: { ...state.name, value: user.displayName },
      displayPicture: user.profilePicture,
    }));
  };

  const saveInfoFields = async () => {
    if (fieldChangeToBeSaved)
      try {
        let updateFields = {
          displayName: userInfoField.name.value,
          profilePicture: userInfoField.displayPicture
            ? {
                url: userInfoField.displayPicture,
              }
            : null,
        };

        dispatch({ type: 'LOADING_AUTH' });

        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/users/update-info/${user.id}`,
          updateFields,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        dispatch(updateUserInfo(user.id, accessToken));

        dispatch(
          setAlertMessage({
            status: 'success',
            message: 'Profile info updated!',
          }),
        );
      } catch (error) {
        dispatch(
          setAlertMessage({
            status: 'danger',
            message: `Can't update profile info right now`,
          }),
        );
      } finally {
        dispatch({ type: 'LOADING_AUTH_FINISHED' });
      }
  };

  const deleteAccount = async () => {
    if (
      window.confirm(
        "You sure you want to delete your account? This can't be undone",
      )
    ) {
      dispatch(logoutUser(navigate));
      dispatch(deleteUserAccount(user.id, accessToken));
      dispatch(
        setAlertMessage({
          status: 'danger',
          message: 'Account has been deleted',
        }),
      );
    }
  };

  const useTwitchInfo = () => {
    setUserInfoField((state) => ({
      ...state,
      name: { ...state.name, value: twitchData.displayName },
      displayPicture: twitchData.displayPicture,
    }));
  };

  const useYoutubeInfo = () => {
    setUserInfoField((state) => ({
      ...state,
      name: { ...state.name, value: youtubeData.displayName },
      displayPicture: youtubeData.displayPicture,
    }));
  };

  React.useEffect(() => {
    setUserInfoField((state) => ({
      ...state,
      name: { ...state.name, value: user.displayName },
      displayPicture: user.profilePicture,
    }));
  }, [user.displayName, user.profilePicture]);

  React.useEffect(() => {
    if (user.id && accessToken) {
      dispatch(updateUserTwitchData(user.id, accessToken));
      dispatch(updateUserYoutubeData(user.id, accessToken));
    }
  }, [accessToken, dispatch, user.id]);

  React.useEffect(() => {
    if (userInfoField.name.value !== user.displayName)
      return setFieldChangeToBeSaved(true);

    if (userInfoField.displayPicture !== user.profilePicture)
      return setFieldChangeToBeSaved(true);

    setFieldChangeToBeSaved(false);
  }, [
    user.displayName,
    user.profilePicture,
    userInfoField.displayPicture,
    userInfoField.name.value,
  ]);

  return (
    <WithSideMenuAndNav>
      <AdjustToSideMenu>
        <Content>
          {isLoading && <ModalLoader />}
          {!user.isEmailConfirmed && (
            <div className='confirm-email'>
              Please confirm your email address. Go click the link we sent to
              your email
            </div>
          )}
          <ProfilePicturePreview image={userInfoField.displayPicture} />
          <PersonalInfo>
            <h3 className='title'>Personal Info:</h3>
            <InfoFields>
              <div className='field'>
                <label>Name</label>
                {userInfoField.name.isEditing ? (
                  <input
                    autoFocus
                    name='name'
                    onChange={handleFieldEdit}
                    onBlur={() => disableFieldEdit('name')}
                    onKeyPress={blurFieldOnEnter}
                    value={userInfoField.name.value}
                  />
                ) : (
                  <p>{userInfoField.name.value || ''}</p>
                )}

                <div
                  onClick={() => makeFieldEditable('name')}
                  className={`edit-icon hoverable ${
                    userInfoField.name.isEditing ? 'active' : ''
                  }`}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </div>
              </div>
              <div className='field'>
                <label>Email</label>
                <p
                  style={{
                    color: `${
                      !user.isEmailConfirmed
                        ? 'var(--danger)'
                        : 'var(--primary-light)'
                    }`,
                  }}
                >
                  {user.email || ''}
                </p>
              </div>
            </InfoFields>
          </PersonalInfo>
          <AlertMessage
            message={alertMessage.message}
            status={alertMessage.status}
          />
          <Buttons>
            <button className='outline-dark' onClick={resetFields}>
              Cancel
            </button>
            <button
              className={`secondary ${
                fieldChangeToBeSaved ? 'hovered' : 'disabled'
              }`}
              onClick={saveInfoFields}
            >
              Save
            </button>
          </Buttons>
          <SyncInfoNav>
            {twitchData?.id ? (
              <button className='hoverable-bright' onClick={useTwitchInfo}>
                Use my Twitch info
              </button>
            ) : (
              <a
                href={twitchAuthForwardUrl({
                  clientId: process.env.REACT_APP_TWITCH_CLIENT_ID,
                  authRedirectUri: `${process.env.REACT_APP_BACKEND_URL}/twitch/auth`,
                  scope: ['user:read:email', 'channel:read:subscriptions'],
                  email: user.email,
                })}
              >
                <button className='hoverable-bright'>Use my Twitch info</button>
              </a>
            )}
            {youtubeData?.id ? (
              <button
                className='danger hoverable-bright'
                onClick={useYoutubeInfo}
              >
                Use my YouTube info
              </button>
            ) : (
              <a
                href={youtubeAuthForwardUrl({
                  clientId: process.env.REACT_APP_YOUTUBE_CLIENT_ID,
                  authRedirectUri: `${process.env.REACT_APP_BACKEND_URL}/youtube/auth`,
                  scope: ['https://www.googleapis.com/auth/youtube.readonly'],
                  email: user.email,
                })}
              >
                <button className='danger hoverable-bright'>
                  Use my YouTube info
                </button>
              </a>
            )}
          </SyncInfoNav>
          <button
            onClick={deleteAccount}
            className='outline-danger delete-account'
          >
            Delete Account
          </button>
        </Content>
      </AdjustToSideMenu>
    </WithSideMenuAndNav>
  );
};

const Content = styled.div`
  padding: 3rem 1rem 12rem 1rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 3rem;
  position: relative;
  height: 100%;
  overflow-y: auto;

  .alert-message {
    margin: -2rem 0;
  }

  .confirm-email {
    padding: 0.3rem 1rem;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: var(--danger-fade);
    color: var(--danger);
    font-weight: 400;
    position: fixed;
    top: 0;
    z-index: 4;
  }

  .delete-account {
    padding: 0.5rem 1rem;
  }

  @media (min-width: 768px) {
    padding-bottom: 8rem;
  }
`;

const SyncInfoNav = styled.div`
  position: fixed;
  bottom: 0;
  background-color: var(--primary);
  left: 0;
  right: 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  row-gap: 1.5rem;
  column-gap: 4rem;
  padding: 1.5rem 0;

  a,
  button {
    width: 100%;
    max-width: 15rem;
  }

  button {
    padding: 0.5rem 0;
    font-size: 0.9rem;
  }

  @media (min-width: 768px) {
    flex-flow: row;
  }
`;

const PersonalInfo = styled.div`
  border: 1px solid var(--primary-light);
  border-radius: 10px;
  padding: 1rem;
  width: 100%;
  max-width: 40rem;

  .title {
    font-weight: 400;
    color: var(--primary);
    margin-bottom: 1rem;
  }
`;

const InfoFields = styled.div`
  color: var(--primary-light);

  .field {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1px solid var(--primary-light);
    border-top: 1px solid var(--primary-light);
    padding: 0.5rem 0;

    label {
      flex-basis: 20%;
    }

    p,
    input {
      flex: 1 0 100%;
      color: var(--primary);
      font-weight: 600;
      order: 3;
    }

    input {
      font-size: 1rem;
      padding-left: 0.1rem;
    }

    .edit-icon {
      order: 2;
      padding: 0.5rem;
    }
    .edit-icon.active {
      filter: brightness(100%);
      color: var(--shade-4);
    }
    .edit-icon:hover {
      filter: brightness(100%);
      color: var(--shade-4);
    }

    @media (min-width: 768px) {
      p,
      input {
        order: 2;
        margin-right: 5rem;
        flex: 1 0 auto;
      }
    }
  }

  .field:last-child {
    border: none;
  }
`;

const Buttons = styled.div`
  width: 100%;
  max-width: 40rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;

  button {
    padding: 0.4rem 1rem;
  }
`;

export default MyProfile;
