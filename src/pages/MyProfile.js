import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { WithSideMenuAndNav, AdjustToSideMenu } from './layout';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProfilePicturePreview } from '../components';

const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <WithSideMenuAndNav>
      <AdjustToSideMenu>
        <AdjustToSideMenuContent>
          <ProfilePicturePreview />
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
