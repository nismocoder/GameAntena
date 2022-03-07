export const setAlertMessage =
  ({ status, message }) =>
  (dispatch) => {
    dispatch({ type: 'SET_ALERT_MESSAGE', payload: { status, message } });
  };
