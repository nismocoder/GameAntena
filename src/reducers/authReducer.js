const initialState = {
  user: {
    id: "",
    email: "",
    role: "",
    twitch_user_id: "",
    twitch_display_name: "",
    twitch_email: "",
    twitch_display_picture: "",
    twitch_followers_count: 0,
    twitch_subscribers_count: 0,
    twitch_channel_qualified: false,
    twitch_videos: [],
    twitch_subscribers: [],
  },
  isLoggedIn: false,
  accessToken: "",
  isLoading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_AUTH": {
      return {
        ...state,
        isLoading: true
      }
    }

    case "LOADING_AUTH_FINISHED": {
      return {
        ...state,
        isLoading: false
      }
    }

    case "LOGIN_SUCCESS": {
      const { email, accessToken } = action.payload;

      return {
        user: { ...state.user, email: email },
        isLoggedIn: true,
        accessToken: accessToken,
        isLoading: false,
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
        twitch_videos,
        twitch_subscribers,
        twitch_followers_count,
        twitch_subscribers_count,
        twitch_channel_qualified,
      } = action.payload;

      return {
        user: {
          ...state.user,
          id,
          email,
          role,
          twitch_user_id,
          twitch_display_name,
          twitch_display_picture,
          twitch_email,
          twitch_videos,
          twitch_subscribers,
          twitch_followers_count,
          twitch_subscribers_count,
          twitch_channel_qualified,
        },
        isLoggedIn: true,
        accessToken: accessToken,
      }
    }

    default:
      return { ...state };
  }
};