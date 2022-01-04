import React from 'react';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import axios from 'axios';

import { loginUser, updateUserAuthInfo } from '../../actions/authAction';

import { useHandleCredentialsInput, useRouteGuard } from '../../hooks';

import { setLocalStorageItem } from '../../utils';

import { AuthLayout } from '../layout';

const Login = () => {
  const dispatch = useDispatch();

  const { credentials, handleOnChange, setCredentials } = useHandleCredentialsInput();

  // redirect to '/' - homepage if not logged in
  useRouteGuard('/');

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOADING_AUTH" });

    const baseUrl = process.env.REACT_APP_BACKEND_URL;

    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }

    try {
      const result = await axios.post(
        `${baseUrl}/login`,
        credentials,
        config
      );

      const { access_token: accessToken, email, userId } = result.data;

      dispatch(loginUser(email, accessToken));
      dispatch(updateUserAuthInfo(userId, accessToken));

      setLocalStorageItem('accessToken', accessToken, 30);
      setLocalStorageItem('userId', userId, 30);

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        return
      }
      alert(error);
    } finally {
      dispatch({ type: "LOADING_AUTH_FINISHED" });
      setCredentials((state) => {
        return {
          ...state,
          password: "",
        }
      })
    }
  }

  return (
    <AuthLayout linkToElement={
      <>
        New to Game-Antena?
        <Link to="/register" className='hoverable'>
          Register here
        </Link>
      </>
    }>
      <h2>Welcome to Game-Antena</h2>
      <StyledForm onSubmit={handleLogin}>
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
            onChange={handleOnChange}
            required
          />
        </div>
        <button className='submit-btn hoverable'>Login</button>
      </StyledForm>
    </AuthLayout>
  )
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
      outline-color: var(--shade-4)
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

export default Login
