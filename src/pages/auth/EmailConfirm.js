import * as React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import styled from "styled-components";

import { Modal, Loader } from "../../components";

import { useRedirectLoggedInUser } from "../../hooks";
import { persistToken } from "../../utils/auth";
import { emailConfirm } from "../../services/auth";

function EmailConfirm() {
  const [modalContent, setModalContent] = React.useState({
    status: "",
    message: "..."
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const { search } = useLocation();
  const navigate = useNavigate();

  const token = new URLSearchParams(search).get("token");

  useRedirectLoggedInUser("/");

  React.useEffect(() => {
    setIsLoading(true);
    if (!token) navigate("/");

    // Send POST request to backend's email confirm endpoint
    const confirmEmail = async () => {
      try {
        const { access_token: accessToken } = await emailConfirm(token);

        persistToken(accessToken);

        return setModalContent({
          status: "success",
          message: "Email Confirmed. Logging In..."
        });
      } catch (error) {
        if (error.response)
          return setModalContent({
            status: "error",
            message: error.response.data.message
          });

        return setModalContent({
          status: "error",
          message: error.message
        });
      } finally {
        setIsLoading(false);
      }
    };

    confirmEmail();
  }, [navigate, token]);

  return (
    <StyledPage>
      <Modal show alignV="center">
        <StyledModalContent>
          <h2>{modalContent.message}</h2>
          {isLoading && <Loader className="loader" />}
          {modalContent.status === "error" && (
            <Link to="/">
              <button type="button" className="redirect-button">
                Go to home
              </button>
            </Link>
          )}
        </StyledModalContent>
      </Modal>
    </StyledPage>
  );
}

const StyledPage = styled.div`
  background-color: var(--primary);
  color: var(--light);
  height: 100vh;
`;

const StyledModalContent = styled.div`
  background-color: var(--light);
  color: var(--primary);
  height: min-content;
  max-width: 20rem;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;

  .loader {
    margin-top: 1rem;
  }

  .redirect-button {
    padding: 0.5rem 1rem;
    margin-top: 1.5rem;
  }
`;

export default EmailConfirm;
