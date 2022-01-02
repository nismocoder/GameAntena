import React from 'react';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import axios from 'axios';

import { useHandleCredentialsInput, useRouteGuard } from '../../hooks';

import { Modal } from '../../components';
import PageLayout from './PageLayout';

const Register = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = React.useState(false);
  const { credentials, handleOnChange, setCredentials } = useHandleCredentialsInput();

  // redirect to '/' - homepage if not logged in
  useRouteGuard('/');

  const handleRegister = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOADING_AUTH" });

    const baseUrl = process.env.REACT_APP_BACKEND_URL;

    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }

    try {
      await axios.post(`${baseUrl}/register`,
        credentials,
        config
      );

      // show modal pointing to email confirmaton link
      setShowModal(true);
    } catch (error) {
      alert(error.response.data.message);
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
    <PageLayout linkToElement={
      <Link to="/login" className='hoverable'>
        Go back to Login Page
      </Link>
    }>
      {showModal && (
        <Modal show={true} alignV={'center'}>
          <StyledModalContent>
            Check your email, and <strong>click the confirmation link to login</strong>
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
        <button className='submit-btn hoverable'>Register</button>
      </StyledForm>
    </PageLayout>
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
    background-color: var(--shade-2);
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
`;


export default Register
