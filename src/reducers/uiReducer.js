const initState = {
  showSideMenu: false
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

    default:
      return { ...state }
  }
}