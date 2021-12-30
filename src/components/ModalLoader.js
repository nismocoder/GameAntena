import React from 'react';

import styled from 'styled-components';

import { Modal, Loader } from '../components';

const ModalLoader = () => {
  return (
    <Modal show={true} alignV='center'>
      <Loader />
    </Modal>
  )
}


export default ModalLoader
