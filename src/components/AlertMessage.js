import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const AlertMessage = ({
  message = '',
  status = 'success',
  removeAfter = 5,
}) => {
  const dispatch = useDispatch();

  const getColorByStatus = React.useCallback((status) => {
    if (status === 'success') return 'var(--shade-3)';
    if (status === 'danger') return 'var(--danger)';
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: 'SET_ALERT_MESSAGE',
        payload: { status: '', message: '' },
      });
    }, removeAfter * 1000);
  }, [dispatch, removeAfter]);

  return (
    message && (
      <StyledAlertMessage style={{ color: getColorByStatus(status) }}>
        {message}
      </StyledAlertMessage>
    )
  );
};

const StyledAlertMessage = styled.div`
  font-size: 0.9rem;
`;

export default AlertMessage;
