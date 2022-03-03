const initialState = {
  user: {
    id: '',
    email: '',
    role: '',
    displayName: '',
    displayPicture: '',
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
      const userUpdateFields = action.payload;

      return {
        ...state,
        user: userUpdateFields,
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
