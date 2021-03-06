import React from 'react';

import { Modal, Loader } from '../components';

import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import axios from 'axios';

import { setLocalStorageItem } from '../utils';

import { updateAuthInfo, updateUserInfo } from '../actions/authAction';
import { useRedirectLoggedInUser } from '../hooks';

const EmailConfirm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { search } = useLocation();

  const token = new URLSearchParams(search).get('token');

  useRedirectLoggedInUser('/');

  React.useEffect(() => {
    if (!token) navigate('/');

    // Send POST request to backend's email confirm endpoint

    const confirmEmail = async () => {
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/email/confirm`,
          {
            token: token,
          },
        );

        const { userId, access_token: accessToken } = result.data;

        dispatch(updateAuthInfo(true, accessToken));
        dispatch(updateUserInfo(userId, accessToken));

        setLocalStorageItem('accessToken', accessToken, 30);
        setLocalStorageItem('userId', userId, 30);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
          return;
        }
        alert(error);
      }
    };

    confirmEmail();
  }, [dispatch, navigate, token]);

  return (
    <StyledPage>
      <Modal show={true} alignV={'center'}>
        <StyledModalContent>
          <h2>Email Confirmed.</h2>
          <h2>Logging In...</h2>
          <Loader className='loader' />
        </StyledModalContent>
      </Modal>
    </StyledPage>
  );
};

const StyledPage = styled.div`
  background-color: var(--primary);
  color: var(--light);
  height: 100vh;
`;

const StyledModalContent = styled.div`
  background-color: var(--light);
  color: var(--primary);
  height: min-content;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;

  .loader {
    margin-top: 1rem;
  }
`;

export default EmailConfirm;
