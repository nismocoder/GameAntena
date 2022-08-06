import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { setAlertMessage } from "../../redux/ui/uiThunks";
import { getUserData } from "../../services/user/userData";

// eslint-disable-next-line import/prefer-default-export
export const useGetUserData = (accessToken = "") => {
  const dispatch = useDispatch();

  const {
    data: userData,
    isLoading: userDataLoading,
    isError: userDataError
  } = useQuery("user-data", () => getUserData(accessToken), {
    enabled: !!accessToken,
    refetchOnWindowFocus: false,
    onError: () => {
      // console.log(error.response?.data.message);
      dispatch(
        setAlertMessage({
          status: "danger",
          message: "Can't retrieve user info",
          removeAfter: 10
        })
      );
    }
  });

  return { userData, userDataLoading, userDataError };
};
