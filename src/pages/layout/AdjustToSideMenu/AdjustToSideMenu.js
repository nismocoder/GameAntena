import * as React from "react";

import styled from "styled-components";

import { motion } from "framer-motion";

import { useSelector } from "react-redux";
import { ScrollUp } from "../../../components";

import { useGetRefElementScrollY } from "../../../hooks";

const getComponentVariant = (screenWidth) => {
  const variants = {
    desktop: {
      open: { translateX: "284px" },
      closed: { translateX: "56px" }
    },
    mobile: {
      open: { translateX: "284px" },
      closed: { translateX: "0px" }
    }
  };

  if (screenWidth > 768) {
    return variants.desktop;
  }
  return variants.mobile;
};

const AdjustToSideMenu = React.forwardRef(({ children }, ref) => {
  const { showSideMenu, screenSize } = useSelector((state) => state.ui);

  const { scrollY, element } = useGetRefElementScrollY(ref);

  return (
    <StyledAdjustToSideMenu
      ref={ref}
      variants={getComponentVariant(screenSize.width)}
      animate={showSideMenu ? "open" : "closed"}
      transition={{ duration: 0.4 }}
      style={{
        width: `calc(100vw - ${
          getComponentVariant(screenSize.width).closed.translateX
        })`
      }}
    >
      <>
        {children}
        <ScrollUp element={element} elementScrollY={scrollY} />
      </>
    </StyledAdjustToSideMenu>
  );
});

const StyledAdjustToSideMenu = styled(motion.div)`
  overflow-y: auto;
  height: calc(100vh - 60px); /* Minus the navbar's height */

  .error {
    text-align: center;
    padding: 3rem 1rem;
    font-family: var(--font-3);
    letter-spacing: 0.2rem;
    word-spacing: 1rem;
    color: var(--danger);
  }

  /* DESKTOP */
  @media (min-width: 768px) {
    height: calc(100vh - 79px); /* Minus the navbar's height */

    .loader {
      height: calc(100vh - 79px); /* Minus the navbar's height */
    }
  }
`;

export default AdjustToSideMenu;
