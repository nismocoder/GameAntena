import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAlertMessage } from "../../redux/ui/uiThunks";
import { unlinkTwitchAccount } from "../../services/user/twitchData";
import {
  deleteProfilePicture,
  deleteUserAccount,
  updateUserData,
  uploadProfilePicture
} from "../../services/user/userData";
import { unlinkYoutubeAccount } from "../../services/user/youtubeData";
import { removeAccessToken } from "../../utils/auth";

export const useUpdateUserData = (accessToken = "") => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    mutate: mutateUpdateUserData,
    isLoading: mutateUpdateUserDataLoading
  } = useMutation((updateFields) => updateUserData(updateFields, accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("user-data");

      dispatch(
        setAlertMessage({
          status: "success",
          message: "Profile info updated!",
          removeAfter: 10
        })
      );
    },
    onError: (error) => {
      if (error.response?.data.statusCode === 401) {
        removeAccessToken();
        navigate("/login?p=/my-profile");

        return;
      }

      dispatch(
        setAlertMessage({
          status: "danger",
          message: "Can't update profile info right now",
          removeAfter: 10
        })
      );
    }
  });

  return {
    mutateUpdateUserData,
    mutateUpdateUserDataLoading
  };
};

export const useUploadProfilePicture = (accessToken = "") => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    mutate: mutateUploadProfilePicture,
    isLoading: mutateUploadProfilePictureLoading
  } = useMutation((formData) => uploadProfilePicture(formData, accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("user-data");

      dispatch(
        setAlertMessage({
          status: "success",
          message: "Profile picture updated.",
          removeAfter: 10
        })
      );
    },
    onError: (error) => {
      if (error.response?.data.statusCode === 401) {
        removeAccessToken();
        navigate("/login?p=/my-profile");

        return;
      }

      if (error.response?.data.statusCode === 422) {
        dispatch(
          setAlertMessage({
            status: "danger",
            message: "Please upload a valid image.",
            removeAfter: 10
          })
        );

        return;
      }

      dispatch(
        setAlertMessage({
          status: "danger",
          message: "Can't update profile picture right now.",
          removeAfter: 10
        })
      );
    }
  });

  return {
    mutateUploadProfilePicture,
    mutateUploadProfilePictureLoading
  };
};

export const useDeleteProfilePicture = (accessToken = "") => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    mutate: mutateDeleteProfilePicture,
    isLoading: mutateDeleteProfilePictureLoading
  } = useMutation(() => deleteProfilePicture(accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("user-data");

      dispatch(
        setAlertMessage({
          status: "danger",
          message: "Profile picture removed.",
          removeAfter: 10
        })
      );
    },
    onError: (error) => {
      if (error.response?.data.statusCode === 401) {
        removeAccessToken();
        navigate("/login?p=/my-profile");

        return;
      }

      if (error.response?.data.statusCode === 422) {
        dispatch(
          setAlertMessage({
            status: "danger",
            message: "Upload a profile picture first.",
            removeAfter: 10
          })
        );

        return;
      }

      dispatch(
        setAlertMessage({
          status: "danger",
          message: "Can't update profile picture right now",
          removeAfter: 10
        })
      );
    }
  });

  return {
    mutateDeleteProfilePicture,
    mutateDeleteProfilePictureLoading
  };
};

export const useUnlinkPlatformAccount = (accessToken = "") => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: mutatePlatformAccount,
    isLoading: mutatePlatformAccountLoading
  } = useMutation(
    (platform = "") => {
      if (platform === "twitch") return unlinkTwitchAccount(accessToken);

      if (platform === "youtube") return unlinkYoutubeAccount(accessToken);

      throw new Error(
        "platform must be either of the two ['twitch', 'yotube']"
      );
    },
    {
      onSuccess: (data, platform) => {
        queryClient.resetQueries(`user-${platform}-data`, { exact: true });
      },
      onError: (error) => {
        if (error.response?.data.statusCode === 401) {
          removeAccessToken();
          navigate("/login?p=/my-profile");
        }
      }
    }
  );

  return {
    mutatePlatformAccount,
    mutatePlatformAccountLoading
  };
};

export const useDeleteUserAccount = (accessToken = "") => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    mutate: mutateDeleteUserAccount,
    isLoading: mutateDeleteUserAccountLoading
  } = useMutation(() => deleteUserAccount(accessToken), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("user-data");

      removeAccessToken();

      dispatch(
        setAlertMessage({
          status: "danger",
          message: data.data.message,
          removeAfter: 10
        })
      );

      navigate("/login");
    },
    onError: (error) => {
      if (error.response?.data.statusCode === 401) {
        removeAccessToken();
        navigate("/login?p=/my-profile");
      }
    }
  });

  return {
    mutateDeleteUserAccount,
    mutateDeleteUserAccountLoading
  };
};
