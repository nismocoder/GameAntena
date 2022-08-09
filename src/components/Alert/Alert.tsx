import * as React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AlertMessage from "./AlertMessage";

function Alert() {
  const { alertMessage } = useSelector((state: RootState) => state.ui);

  return (
    alertMessage.message && (
      <StyledAlert
        style={{
          backgroundColor:
            alertMessage.status === "danger"
              ? "var(--danger-fade)"
              : "var(--light)"
        }}
      >
        <AlertMessage
          message={alertMessage.message}
          status={alertMessage.status}
        />
      </StyledAlert>
    )
  );
}

const StyledAlert = styled.div`
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  position: fixed;
  top: 60px;
  left: 50%;
  padding: 0.3rem 1rem;
  transform: translateX(-50%);
  z-index: 4;

  @media (min-width: 768px) {
    top: 79px;
  }
`;

export default Alert;
