const initialState = {
  user: {
    id: '',
    email: '',
    role: '',
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

    case 'LOGIN_SUCCESS': {
      const { email, accessToken } = action.payload;

      return {
        user: { ...state.user, email: email },
        isLoggedIn: true,
        accessToken: accessToken,
        isLoading: false,
      };
    }

    case 'LOGOUT': {
      return initialState;
    }

    case 'UPDATE_USER_AUTH_INFO': {
      const { id, email, accessToken, role } = action.payload;

      return {
        user: {
          id,
          email,
          role,
        },
        isLoggedIn: true,
        accessToken,
      };
    }

    default:
      return { ...state };
  }
};
