import * as React from "react";

import { Link } from "react-router-dom";

import styled from "styled-components";

import {
  useHandleCredentialsInput,
  useRedirectLoggedInUser
} from "../../hooks";

import { Modal, ModalLoader } from "../../components";
import { AuthLayout } from "../layout";
import { registerUser } from "../../services/auth";

function Register() {
  const [isLoading, setIsLoading] = React.useState(false);

  document.title = "Game-Antena | Register";

  const [showModal, setShowModal] = React.useState(false);
  const { credentials, handleOnChange, setCredentials } =
    useHandleCredentialsInput();

  // redirect to '/' - homepage if logged in
  useRedirectLoggedInUser("/");

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await registerUser(credentials);

      // show modal pointing to email confirmaton link
      return setShowModal(true);
    } catch (error) {
      if (error.response) return alert(error.response.data.message);

      return alert(error.message);
    } finally {
      setCredentials((state) => {
        return {
          ...state,
          password: ""
        };
      });
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      linkToElement={
        <Link to="/login" className="hoverable">
          Go back to Login Page
        </Link>
      }
    >
      {isLoading && <ModalLoader />}

      {showModal && (
        <Modal show alignV="center">
          <StyledModalContent>
            <p>Click the confirmation link we sent to your email to login</p>
            <div className="spam">
              Can&apos;t found the email?{" "}
              <strong>Please check your spam</strong>
            </div>
          </StyledModalContent>
        </Modal>
      )}

      <h2>Register</h2>
      <StyledForm onSubmit={handleRegister}>
        <div className="form-group">
          <label>Email: </label>
          <input
            name="email"
            value={credentials.email}
            type="email"
            placeholder="my@email.com"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            name="password"
            value={credentials.password}
            type="password"
            placeholder="MyStrongPassword123"
            onChange={handleOnChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn hoverable">
          Register
        </button>
      </StyledForm>
    </AuthLayout>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-flow: column;
  gap: 1.5rem;

  .form-group {
    display: flex;
    flex-flow: column;

    label {
      margin-bottom: 0.3rem;
    }

    input {
      border: none;
      padding: 0.5rem;
      font-size: 1.1rem;
      outline-color: var(--shade-4);
    }
  }

  .submit-btn {
    border: none;
    color: var(--light);
    font-weight: 600;
    font-size: 1.2rem;
    background-color: var(--shade-4);
    padding: 0.5rem;
    margin-top: 1rem;
  }
`;

const StyledModalContent = styled.div`
  background-color: var(--light);
  color: var(--primary);
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  width: 80%;
  font-size: 1.2rem;
  max-width: 20rem;
  display: flex;
  flex-flow: column;
  gap: 2rem;

  p {
    color: var(--primary);
  }

  .spam {
    color: var(--shade-2);
    font-style: italic;
  }
`;

export default Register;
