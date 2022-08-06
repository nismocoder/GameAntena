import * as React from "react";

import styled from "styled-components";

import { useDispatch } from "react-redux";

import { useDebouncedCallback } from "use-debounce";
import { Nav, SideMenu } from "../../components";
import { uiActions } from "../../redux/ui";

function WithSideMenuAndNav({ children }) {
  const dispatch = useDispatch();

  const [screenWidth, setScreenWidth] = React.useState(0);

  const updateScreenWidth = useDebouncedCallback(() => {
    setScreenWidth(window.innerWidth);
  }, 100);

  // Set screen after first render
  React.useEffect(() => {
    dispatch(
      uiActions.SET_SCREEN_SIZE({
        width: screenWidth,
        height: window.innerHeight
      })
    );
  }, [dispatch, screenWidth]);

  React.useLayoutEffect(() => {
    window.addEventListener("resize", updateScreenWidth);

    updateScreenWidth();
    return () => window.removeEventListener("resize", updateScreenWidth);
  }, [updateScreenWidth]);

  return (
    <>
      <Nav />
      <StyledMain>
        <SideMenu />
        {children}
      </StyledMain>
    </>
  );
}

const StyledMain = styled.main`
  position: relative;
  overflow-x: hidden;
`;

export default WithSideMenuAndNav;
