const initState = {
  showSideMenu: false,
  showChannelMenu: true
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

    default:
      return { ...state }
  }
}