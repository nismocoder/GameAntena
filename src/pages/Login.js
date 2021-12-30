import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import { Logo, ModalLoader } from '../components';

import { Link, useHistory } from 'react-router-dom';

import axios from 'axios';

import { setLocalStorageItem } from '../utils';

import { loginUser, updateUserAuthInfo } from '../actions/authAction';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { isLoading, isLoggedIn } = useSelector(state => state.auth);

  const handleOnChange = (e) => {
    const input = e.target.name;
    const value = e.target.value;

    if (input === 'email')
      setCredentials((state) => {
        return {
          ...state,
          email: value
        }
      })

    if (input === 'password')
      setCredentials((state) => {
        return {
          ...state,
          password: value
        }
      })
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOADING_AUTH" });

    const baseUrl = process.env.REACT_APP_BACKEND_URL;

    const loginCredentials = {
      email: credentials.email,
      password: credentials.password,
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }

    try {
      const result = await axios.post(
        `${baseUrl}/login`,
        loginCredentials,
        config
      );

      const { access_token: accessToken, email, userId } = result.data;

      dispatch(loginUser(email, accessToken));
      dispatch(updateUserAuthInfo(userId, accessToken));

      setLocalStorageItem('accessToken', accessToken, 30);
      setLocalStorageItem('userId', userId, 30);

      history.push("/");
    } catch (error) {
      if (error) return alert("Username or password didn't match");
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

  React.useEffect(() => {
    if (isLoggedIn) history.push("/");
  }, [history, isLoggedIn]);

  return (
    <StyledPage>
      {isLoading && <ModalLoader />}
      <Logo />
      <main>
        <h2>Welcome to Game-Antena</h2>
        <StyledForm onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email: </label>
            <input
              name="email"
              value={credentials.email}
              type="email"
              placeholder="user@email.com"
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
        <div className='link'>
          New to Game-Antena?
          <Link to="/register" className='hoverable'>
            Register here
          </Link>
        </div>

      </main>
    </StyledPage>
  )
}

const StyledPage = styled.div`
  height: 100vh;
  background-color: var(--primary);
  color: var(--light);
  padding: 1rem;
  overflow: hidden;

  main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
    padding: 3rem 0;
    
    h2 {
      text-align: center;
      width: 70%;
      font-family: var(--font-2);
      color: var(--light-2);
    }

    .link {
      color: var(--light-2);
      a {
        color: var(--light);
        margin-left: 0.3rem;
        text-decoration: underline;
      }
    }
  }
`;

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
    margin-top: 2rem;
  }  
`;

export default Login
