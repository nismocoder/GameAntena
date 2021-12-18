import React from "react";
import { createPortal } from "react-dom";

import styled from "styled-components";

import { motion } from "framer-motion";


const Modal = ({ children, onClick }) => {

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [])

  return createPortal(
    <StyledModal onClick={onClick}>
      {children}
    </StyledModal>,
    document.getElementById("modal_root")
  );
}

const StyledModal = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkred;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }
`;

export default Modal