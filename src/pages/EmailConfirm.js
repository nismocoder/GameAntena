import React from 'react';

import { Modal, Loader } from '../components';

import { useLocation, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import axios from 'axios';

import { setLocalStorageItem } from '../utils';

import { updateUserAuthInfo } from '../actions/authAction';

const EmailConfirm = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const search = useLocation().search;

  const token = new URLSearchParams(search).get("token");

  React.useEffect(() => {
    if (!token)
      history.push('/');

    // Send POST request to backend's email confirm endpoint

    const confirmEmail = async () => {
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/email/confirm`,
          {
            token: token
          }
        );

        const { userId, access_token: accessToken } = result.data;

        dispatch(updateUserAuthInfo(userId, accessToken));

        setLocalStorageItem('accessToken', accessToken, 30);
        setLocalStorageItem('userId', userId, 30);

        history.push('/');
      } catch (error) {
        console.error(error.response.data.message);
      }
    }

    confirmEmail();
  }, [dispatch, history, token]);

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
  )
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
  padding: 2rem;
  border-radius: 10px;
  text-align: center;

  .loader {
    margin-top: 1rem;
  }
`;



export default EmailConfirm
