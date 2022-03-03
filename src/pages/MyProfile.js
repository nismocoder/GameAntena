import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { WithSideMenuAndNav, AdjustToSideMenu } from './layout';
import { faCameraRetro, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader } from '../components';

const MyProfile = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  return (
    <WithSideMenuAndNav>
      <AdjustToSideMenu>
        {isLoading ? (
          <div style={{ width: '100vw', height: '100vh', flex: 1 }}>
            <Loader style={{ transform: 'scale(2)' }} />
          </div>
        ) : (
          <AdjustToSideMenuContent>
            <DisplayPicturePreview>
              <img src={`${user.displayPicture}`} alt='user-dp' />
              <div className='overlay hoverable'>
                <FontAwesomeIcon className='camera-icon' icon={faCameraRetro} />
              </div>
            </DisplayPicturePreview>
            <PersonalInfo>
              <h3 className='title'>Personal Info:</h3>
              <div className='info-fields'>
                <div className='field'>
                  <label>Name</label>
                  <p>{user.displayName || ''}</p>
                  <div className='edit-icon hoverable'>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </div>
                </div>
                <div className='field'>
                  <label>Email</label>
                  <p>{user.email || ''}</p>
                  <div className='edit-icon hoverable'>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </div>
                </div>
              </div>
            </PersonalInfo>
          </AdjustToSideMenuContent>
        )}
      </AdjustToSideMenu>
    </WithSideMenuAndNav>
  );
};

const AdjustToSideMenuContent = styled.div`
  padding: 3rem 1rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 3rem;
`;

const DisplayPicturePreview = styled.div`
  position: relative;
  width: 10rem;

  img {
    object-fit: contain;
    width: 100%;
    clip-path: circle(50% at 50% 50%);
    -webkit-mask-image: linear-gradient(to top, red 50%, black 100%);
    mask-image: linear-gradient(to top, red 50%, black 50%);*/
  }

  .overlay {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    border-radius: 50%;
    background: var(--dark-faded-1);
    clip-path: inset(64% 0 0 0 round 0);
    -webkit-tap-highlight-color: transparent;

    .camera-icon {
      position: absolute;
      top: 80%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
      color: var(--light);
    }
  }
  
 
`;

const PersonalInfo = styled.div`
  border: 1px solid var(--primary-light);
  border-radius: 10px;
  padding: 1rem;
  width: 100%;
  max-width: 40rem;

  .title {
    font-weight: 400;
    color: var(--primary);
    margin-bottom: 1rem;
  }

  .info-fields {
    color: var(--primary-light);

    .field {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid var(--primary-light);
      border-top: 1px solid var(--primary-light);
      padding: 0.5rem 0;

      label {
        padding-right: 5rem;
      }

      p {
        color: var(--primary);
        font-weight: 600;
        flex: 1 0 auto;
        padding-right: 1rem;
      }

      .edit-icon {
        padding: 0.5rem;
      }
      .edit-icon:hover {
        filter: brightness(100%);
        color: var(--shade-4);
      }
    }

    .field:last-child {
      border: none;
    }

    @media (max-width: 350px) {
      p {
        flex: 1 0 100% !important;
      }
    }
  }
`;

export default MyProfile;
