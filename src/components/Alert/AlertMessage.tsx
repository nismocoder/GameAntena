import * as React from "react";
import styled from "styled-components";

const getColorByStatus = (status: string) => {
  if (status === "success") return "var(--shade-3)";
  if (status === "danger") return "var(--danger)";

  return "var(--primary)";
};

function AlertMessage({
  message = "",
  status = ""
}: {
  message: string;
  status: string;
}) {
  return message ? (
    <StyledAlertMessage
      className="alert-message"
      style={{ color: getColorByStatus(status) }}
    >
      {message}
    </StyledAlertMessage>
  ) : null;
}

const StyledAlertMessage = styled.div`
  font-size: 0.9rem;
`;

export default AlertMessage;
