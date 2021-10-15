import React from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ModalVisibleAction,
  ModalLoadingAction,
  DeleteTaskAction,
} from "../redux/actions/ActionCreator";
import { updateAllTasks } from "../services/TaskServices";

const ModalMain = ({ currentUser, toastSuccess }) => {
  const dispatch = useDispatch();
  const modalId = useSelector((state) => state.modalState.modalId);
  const modalContent = useSelector((state) => state.modalState.modalContent);
  const confirmLoading = useSelector((state) => state.modalState.isLoading);
  const visible = useSelector((state) => state.modalState.isVisible);

  const handleCancel = () => {
    dispatch(ModalVisibleAction(false));
  };

  const deleteTaskThunk = () => {
    return function (dispatch) {
      dispatch(ModalLoadingAction(true));
      const newTasks = currentUser.tasks.filter(
        (eachTask) => eachTask.id !== modalId
      );
      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
      };
      updateAllTasks(currentUser.id, newTasks ? newTasks : [], {
        headers,
      }).then((res) => {
        dispatch(DeleteTaskAction(res.data.tasks));
        dispatch(ModalLoadingAction(false));
        dispatch(ModalVisibleAction(false));
        toastSuccess("Task is deleted successfully");
      });
    };
  };
  const handleOk = () => {
    dispatch(deleteTaskThunk());
  };

  return (
    <Modal
      // title="Confirmation"
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p className="modalContent">{modalContent}</p>
    </Modal>
  );
};

export default ModalMain;
