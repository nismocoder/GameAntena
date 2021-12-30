import React from "react";
import { createPortal } from "react-dom";

import styled from "styled-components";

const Modal = ({
  show = false,
  controlled = true,
  children,
  exitCallback = () => { },
  className,
  alignV = 'flex-start'
}) => {

  const handleClick = (e) => {
    const element = e.target;
    if (element.classList.contains('modal-wrapper')) {
      document.body.style.overflow = "auto";
      if (typeof exitCallback === 'function' && !controlled) exitCallback()
    }
  }

  // Fixed scrolling
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    // return () => {
    //   document.body.style.overflow = 'auto';
    // }
  }, [])

  // We have two options when rendering the modal
  // 1 - Controll the rendering of modal using the "show" prop.
  //     The "controlled" prop must be set to true

  // 2 - Controll the rendering of the modal using the "exitCallback" prop.
  //     The "controlled" prop must be set to false

  // Option 2 is more suitable when you want to render your modal
  // base on a specified route.

  return createPortal(
    !controlled ? (
      <StyledModal alignV={alignV} className={`modal-wrapper ${className}`} onClick={handleClick}>
        {children}
      </StyledModal>
    ) : (
      show && (
        <StyledModal alignV={alignV} className={`modal-wrapper ${className}`} onClick={handleClick}>
          {children}
        </StyledModal>
      )
    ),
    document.getElementById("modal_root")
  );
}

const StyledModal = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  align-items: ${props => props.alignV};
  justify-content: center;
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