import * as actionTypes from "../actions/ActionType";
import { createAction } from "@reduxjs/toolkit";

export const ToggleLoadingAction = (status) => ({
  type: actionTypes.ToggleLoadingType,
  payload: {
    status,
  },
});

export const UpdateCurrentUserAction = createAction(
  "UPDATE_CURRENT",
  function prepare(userInput) {
    return {
      payload: {
        userInput,
      },
    };
  }
);

export const DisplayNavAction = createAction(
  "DISPLAY_NAV",
  function prepare(displayNav) {
    return {
      payload: displayNav,
    };
  }
);

export const LogoutAction = createAction("LOGOUT");

export const ModalContentAction = createAction(
  "MODAL_CONTENT",
  function prepare(id, content) {
    return {
      payload: { id, content },
    };
  }
);

export const ModalVisibleAction = createAction(
  "MODAL_VISIBLE",
  function prepare(isVisible) {
    return {
      payload: {
        isVisible,
      },
    };
  }
);

export const ModalLoadingAction = createAction(
  "MODAL_LOADING",
  function prepare(isLoading) {
    return {
      payload: {
        isLoading,
      },
    };
  }
);

export const GetTaskListAction = (taskList) => ({
  type: actionTypes.GetTaskListType,
  payload: {
    taskList,
  },
});

export const AddTaskAction = createAction(
  "ADD_TASK",
  function prepare(newTask) {
    return {
      payload: {
        newTask,
      },
    };
  }
);

export const EditTaskAction = createAction(
  "EDIT_TASK",
  function prepare(id, editedTask) {
    return {
      payload: {
        id,
        editedTask,
      },
    };
  }
);

export const CompleteTaskAction = createAction(
  "COMPLETE_TASK",
  function prepare(completeTask) {
    return {
      payload: {
        completeTask,
      },
    };
  }
);

export const DeleteTaskAction = createAction(
  "DELETE _TASK",
  function prepare(tasks) {
    return {
      payload: tasks,
    };
  }
);

export const GetTaskListAction2 = createAction(
  "GET _TASKS",
  function prepare(tasks) {
    return {
      payload: tasks,
    };
  }
);
