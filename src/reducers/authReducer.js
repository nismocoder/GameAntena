const initialState = {
  user: {
    id: "",
    email: "",
    role: "",
    twitch_user_id: "",
    twitch_display_name: "",
    twitch_email: "",
    twitch_display_picture: "",
  },
  isLoggedIn: false,
  accessToken: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      const { email, accessToken } = action.payload;

      return {
        user: { ...state.user, email: email },
        isLoggedIn: true,
        accessToken: accessToken,
      };
    }

    case "LOGOUT": {
      return initialState
    }

    case "UPDATE_USER_AUTH_INFO": {
      const {
        id,
        email,
        accessToken,
        role,
        twitch_user_id,
        twitch_display_name,
        twitch_display_picture,
        twitch_email,
      } = action.payload;

      return {
        user: {
          id,
          email,
          role,
          twitch_user_id,
          twitch_display_name,
          twitch_display_picture,
          twitch_email,
        },
        isLoggedIn: true,
        accessToken: accessToken,
      }
    }

    default:
      return { ...state };
  }
};