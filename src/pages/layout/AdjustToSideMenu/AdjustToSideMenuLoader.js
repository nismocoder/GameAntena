import React from "react";
import styled from "styled-components";
import { Loader } from "../../../components";

function AdjustToSideMenuLoader() {
  return (
    <StyledLoader className="loader">
      <Loader style={{ transform: "scale(2)" }} />
    </StyledLoader>
  );
}

const StyledLoader = styled.div`
  flex: 1;
  width: 100%;
  height: calc(100vh - 60px);
`;

export default AdjustToSideMenuLoader;
