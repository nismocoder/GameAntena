import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  WithSideMenuAndNav,
  AdjustToSideMenu,
  AdjustToSideMenuLoader
} from "../layout";
import {
  ProfilePicturePreview,
  AlertMessage,
  FormFields,
  ModalLoader
} from "../../components";
import { twitchAuthForwardUrl, youtubeAuthForwardUrl } from "../../utils";

import { useGetUserTwitchData } from "../../hooks/queries/twitchQueries";
import { useGetUserYoutubeData } from "../../hooks/queries/youtubeQueries";
import { useCheckFieldChanges, useEditableFormFields } from "./MyProfileLogic";
import { getAuthInfo } from "../../utils/auth";
import {
  useDeleteUserAccount,
  useUpdateUserData
} from "../../hooks/mutations/userMutations";
import { useGetUserData } from "../../hooks/queries/userQueries";

function MyProfile() {
  const { alertMessage } = useSelector((state) => state.ui);

  const { accessToken } = getAuthInfo();

  const {
    userData: user,
    userDataLoading,
    userDataError
  } = useGetUserData(accessToken);
  const { mutateUpdateUserData, mutateUpdateUserDataLoading } =
    useUpdateUserData(accessToken);
  const { mutateDeleteUserAccount } = useDeleteUserAccount(accessToken);

  const { userTwitchData } = useGetUserTwitchData(accessToken);
  const { userYoutubeData } = useGetUserYoutubeData(accessToken);

  const { editableFields, setEditableFields, registerEditableField } =
    useEditableFormFields();
  const { fieldChangesToBeSaved } = useCheckFieldChanges(editableFields, user);

  document.title = user?.displayName
    ? `My Profile | ${user?.displayName}`
    : "My Profile";

  const saveInfoFields = async () => {
    if (fieldChangesToBeSaved) {
      // updateFields object must match user object from the backend
      const updateFields = {
        displayName: editableFields.name.value.trim(),
        profilePicture: editableFields.profilePictureUrl
          ? {
              url: editableFields.profilePictureUrl
            }
          : null
      };

      // Mutate user info
      mutateUpdateUserData(updateFields);
    }
  };

  const resetFields = () => {
    setEditableFields((state) => ({
      ...state,
      name: { ...state.name, value: user?.displayName },
      profilePictureUrl: user?.profilePicture?.url
    }));
  };

  const useTwitchInfo = () => {
    setEditableFields((state) => ({
      ...state,
      name: { ...state.name, value: userTwitchData.twitch_display_name },
      profilePictureUrl: userTwitchData.twitch_display_picture
    }));
  };

  const useYoutubeInfo = () => {
    setEditableFields((state) => ({
      ...state,
      name: { ...state.name, value: userYoutubeData.youtube_display_name },
      profilePictureUrl: userYoutubeData.youtube_display_picture
    }));
  };

  const deleteAccount = async () => {
    if (
      window.confirm(
        "You sure you want to delete your account? This can't be undone"
      )
    ) {
      mutateDeleteUserAccount();
    }
  };

  // Sync fields to user's data
  React.useEffect(() => {
    setEditableFields((state) => ({
      ...state,
      name: { ...state.name, value: user?.displayName },
      profilePictureUrl: user?.profilePicture?.url
    }));
  }, [setEditableFields, user?.displayName, user?.profilePicture?.url]);

  return (
    <WithSideMenuAndNav>
      <AdjustToSideMenu>
        {userDataLoading || userDataError ? (
          <AdjustToSideMenuLoader />
        ) : (
          <Content>
            {mutateUpdateUserDataLoading && <ModalLoader />}
            {!user.isEmailConfirmed && (
              <div className="confirm-email">
                Please confirm your email address. Go click the link we sent to
                your email
              </div>
            )}

            <ProfilePicturePreview image={editableFields.profilePictureUrl} />

            <PersonalInfo>
              <h3 className="title">Personal Info:</h3>

              <StyledFormFields
                fields={[
                  {
                    readOnly: false,
                    label: "Name",
                    ...registerEditableField("name")
                  },

                  {
                    readOnly: true,
                    readOnlyStyle: {
                      color: `${
                        !user.isEmailConfirmed
                          ? "var(--danger)"
                          : "var(--primary-light)"
                      }`
                    },
                    label: "Email",
                    name: "email",
                    value: user.email
                  }
                ]}
              />
            </PersonalInfo>

            <AlertMessage
              message={alertMessage.message}
              status={alertMessage.status}
            />

            <Buttons>
              <button
                type="button"
                className={`outline-dark ${
                  fieldChangesToBeSaved ? "hovered" : "disabled"
                }`}
                onClick={resetFields}
              >
                Reset
              </button>
              <button
                type="button"
                className={`secondary ${
                  fieldChangesToBeSaved ? "" : "disabled"
                }`}
                onClick={saveInfoFields}
              >
                Save
              </button>
            </Buttons>

            <SyncInfoNav>
              {userTwitchData?.id ? (
                <button
                  type="button"
                  className="hoverable-bright"
                  onClick={useTwitchInfo}
                >
                  Use my Twitch info
                </button>
              ) : (
                <a
                  href={twitchAuthForwardUrl({
                    clientId: process.env.REACT_APP_TWITCH_CLIENT_ID,
                    authRedirectUri: `${process.env.REACT_APP_BACKEND_URL}/twitch/auth`,
                    scope: ["user:read:email", "channel:read:subscriptions"],
                    email: user.email,
                    redirectPage: "/my-profile"
                  })}
                >
                  <button type="button" className="hoverable-bright">
                    Use my Twitch info
                  </button>
                </a>
              )}
              {userYoutubeData?.id ? (
                <button
                  type="button"
                  className="danger hoverable-bright"
                  onClick={useYoutubeInfo}
                >
                  Use my YouTube info
                </button>
              ) : (
                <a
                  href={youtubeAuthForwardUrl({
                    clientId: process.env.REACT_APP_YOUTUBE_CLIENT_ID,
                    authRedirectUri: `${process.env.REACT_APP_BACKEND_URL}/youtube/auth`,
                    scope: ["https://www.googleapis.com/auth/youtube.readonly"],
                    email: user.email,
                    redirectPage: "/my-profile"
                  })}
                >
                  <button type="button" className="danger hoverable-bright">
                    Use my YouTube info
                  </button>
                </a>
              )}
            </SyncInfoNav>

            <button
              type="button"
              onClick={deleteAccount}
              className="outline-danger delete-account"
            >
              Delete Account
            </button>
          </Content>
        )}
      </AdjustToSideMenu>
    </WithSideMenuAndNav>
  );
}

const Content = styled.div`
  padding: 3rem 1rem 12rem 1rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 3rem;
  position: relative;
  height: 100%;
  width: 100%;
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

const PersonalInfo = styled.div`
  border: 1px solid var(--primary-light);
  border-radius: 10px;
  padding: 1rem 1rem 0.5rem 1rem;
  width: 100%;
  max-width: 40rem;

  .title {
    font-weight: 400;
    color: var(--primary);
    margin-bottom: 1rem;
  }
`;

const StyledFormFields = styled(FormFields)`
  .field {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1px solid var(--primary-light);
    padding: 0.5rem 0;

    label {
      color: var(--primary-light);
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

  .field:first-child {
    border-top: 1px solid var(--primary-light);
  }

  .field:last-child {
    border: none;
    padding: 1rem 0;
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
