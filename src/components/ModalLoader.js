import * as React from "react";

import { Modal, Loader } from ".";

function ModalLoader() {
  return (
    <Modal show alignV="center">
      <Loader />
    </Modal>
  );
}

export default ModalLoader;
