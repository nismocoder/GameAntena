const initialState = {
  user: {
    id: '',
    email: '',
    role: '',
    displayName: '',
    profilePicture: '',
    isEmailConfirmed: false,
  },
  isLoggedIn: false,
  accessToken: '',
  isLoading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_AUTH': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'LOADING_AUTH_FINISHED': {
      return {
        ...state,
        isLoading: false,
      };
    }

    case 'LOGOUT': {
      return initialState;
    }

    case 'UPDATE_USER_INFO': {
      const { id, email, role, displayName, profilePicture, isEmailConfirmed } =
        action.payload;

      return {
        ...state,
        user: {
          id,
          email,
          role,
          displayName,
          profilePicture: profilePicture?.url,
          isEmailConfirmed,
        },
      };
    }

    case 'UPDATE_AUTH_INFO': {
      const { isLoggedIn, accessToken } = action.payload;

      return {
        ...state,
        isLoggedIn,
        accessToken,
      };
    }

    default:
      return { ...state };
  }
};
