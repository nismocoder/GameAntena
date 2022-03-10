const initialState = {
  twitchData: {
    id: '',
    displayName: '',
    displayPicture: '',
  },
  youtubeData: {
    id: '',
    displayName: '',
    displayPicture: '',
  },
  isLoading: false,
};

export const socialsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_SOCIALS_DATA': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'LOADING_SOCIALS_DATA_FINISHED': {
      return {
        ...state,
        isLoading: false,
      };
    }

    case 'UPDATE_USER_TWITCH_DATA': {
      const { twitch_user_id, twitch_display_name, twitch_display_picture } =
        action.payload;

      return {
        ...state,
        twitchData: {
          id: twitch_user_id,
          displayName: twitch_display_name,
          displayPicture: twitch_display_picture,
        },
      };
    }

    case 'NO_TWITCH_DATA': {
      return {
        ...state,
        twitchData: {
          id: '',
          displayName: '',
        },
      };
    }

    case 'UPDATE_USER_YOUTUBE_DATA': {
      const { youtube_user_id, youtube_display_name, youtube_display_picture } =
        action.payload;

      return {
        ...state,
        youtubeData: {
          id: youtube_user_id,
          displayName: youtube_display_name,
          displayPicture: youtube_display_picture,
        },
      };
    }

    case 'NO_YOUTUBE_DATA': {
      return {
        ...state,
        youtubeData: {
          id: '',
          displayName: '',
          displayPicture: '',
        },
      };
    }

    default:
      return state;
  }
};
