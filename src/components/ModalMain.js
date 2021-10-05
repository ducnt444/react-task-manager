import React from "react";
import { Modal } from "antd";

const ModalMain = ({
  modalContent,
  visible,
  confirmDelete,
  confirmLoading,
  handleCancel,
}) => {
  return (
    <Modal
      // title="Confirmation"
      visible={visible}
      onOk={confirmDelete}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <p className="modalContent">{modalContent}</p>
    </Modal>
  );
};

export default ModalMain;
