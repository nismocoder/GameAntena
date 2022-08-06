import * as React from "react";
import styled from "styled-components";

function TextSection({ heading = "Heading", children }) {
  return (
    <StyledSection>
      <h2 className="heading">
        {heading} <div className="underline" />
      </h2>
      <div className="content">{children}</div>
    </StyledSection>
  );
}

const StyledSection = styled.div`
  .heading {
    position: relative;
    width: fit-content;
    color: var(--shade-2);
    margin-bottom: 1.5rem;

    .underline {
      width: 30%;
      height: 0.5rem;
      position: absolute;
      bottom: 0;
      transform: translateY(50%);
      background-color: var(--shade-4);
    }
  }

  .content {
    font-size: 1.1rem;
    letter-spacing: 0.8px;
  }
`;

export default TextSection;
