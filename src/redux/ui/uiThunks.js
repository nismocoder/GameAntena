import { uiActions } from ".";

// eslint-disable-next-line import/prefer-default-export
export const setAlertMessage =
  ({ status = "", message = "", removeAfter = 5 }) =>
  (dispatch) => {
    dispatch(
      uiActions.SET_ALERT_MESSAGE({
        status,
        message
      })
    );

    setTimeout(() => {
      dispatch(
        uiActions.SET_ALERT_MESSAGE({
          status: "",
          message: ""
        })
      );
    }, removeAfter * 1000);
  };
