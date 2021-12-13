const initialState = {
  email: "",
  isLoggedIn: false,
  accessToken: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      const { email, accessToken } = action.payload;
      return {
        email: email,
        isLoggedIn: true,
        accessToken: accessToken,
      };
    }

    case "LOGOUT": {
      return {
        isLoggedIn: false,
        accessToken: "",
      };
    }

    case "UPDATE_LOGIN_STATUS": {
      const { email, accessToken } = action.payload;
      return {
        email: email,
        isLoggedIn: true,
        accessToken: accessToken,
      }
    }

    default:
      return { ...state };
  }
};