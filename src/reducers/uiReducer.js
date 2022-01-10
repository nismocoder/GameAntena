const initState = {
  showSideMenu: false,
  showChannelMenu: true,
  screen: { width: 0, height: 0 }
};

export const uiReducer = (state = initState, action) => {
  switch (action.type) {
    case "SHOW_SIDE_MENU":
      return {
        ...state,
        showSideMenu: true
      }

    case "HIDE_SIDE_MENU":
      return {
        ...state,
        showSideMenu: false
      }

    case "SHOW_CHANNEL_MENU":
      return {
        ...state,
        showChannelMenu: true
      }

    case "HIDE_CHANNEL_MENU":
      return {
        ...state,
        showChannelMenu: false
      }

    case "SET_SCREEN": {
      const screen = action.payload;

      return {
        ...state,
        screen
      }
    }

    default:
      return { ...state }
  }
}