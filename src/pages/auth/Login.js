import * as React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { ModalLoader } from "../../components";
import {
  useHandleCredentialsInput,
  useRedirectLoggedInUser
} from "../../hooks";
import { loginUser } from "../../services/auth";

import { AuthLayout } from "../layout";

function Login() {
  document.title = "Game-Antena | Login";

  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  const { search } = useLocation();
  const previousPage = new URLSearchParams(search).get("p");

  const { credentials, handleOnChange, setCredentials } =
    useHandleCredentialsInput();

  // redirect to previous page after (if there's any) after loggin in
  useRedirectLoggedInUser(previousPage || "/");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginUser(credentials);

      return navigate(previousPage || "/");
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
        <>
          New to Game-Antena?
          <Link to="/register" className="hoverable">
            Register here
          </Link>
        </>
      }
    >
      {isLoading && <ModalLoader />}

      <h2>Welcome to Game-Antena</h2>
      <StyledForm onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email: </label>
          <input
            autoFocus
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
            onChange={handleOnChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn hoverable">
          Login
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
      outline-color: var(--shade-2);
    }
  }

  .submit-btn {
    border: none;
    color: var(--light);
    font-weight: 600;
    font-size: 1.2rem;
    background-color: var(--shade-2);
    padding: 0.5rem;
    margin-top: 1rem;
  }
`;

export default Login;
