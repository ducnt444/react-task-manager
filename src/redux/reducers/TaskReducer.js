import { GetTaskListType, AddTaskType } from "../actions/ActionType";
import { createReducer } from "@reduxjs/toolkit";
import {
  EditTaskAction,
  DeleteTaskAction,
  CompleteTaskAction,
  GetTaskListAction2,
} from "../actions/ActionCreator";

export const TaskReducer = createReducer(
  { taskList: [], deleteID: null },
  (builder) => {
    builder
      .addCase(GetTaskListType, (state, action) => {
        state.taskList = action.payload.taskList;
      })
      .addCase(AddTaskType, (state, action) => {
        state.taskList.push(action.payload.newTask);
      })
      .addCase(EditTaskAction, (state, action) => {
        state.taskList = state.taskList.map((task) =>
          task.id === action.payload.editedTask.id
            ? {
                ...task,
                taskName: action.payload.editedTask.taskName,
                taskDate: action.payload.editedTask.taskDate,
                isDone: action.payload.editedTask.isDone,
              }
            : task
        );
      })
      .addCase(CompleteTaskAction, (state, action) => {
        state.taskList = state.taskList.map((task) =>
          task.id === action.payload.completeTask.id
            ? {
                ...task,
                isDone: action.payload.completeTask.isDone,
              }
            : task
        );
      })
      .addCase(DeleteTaskAction, (state, action) => {
        if (action.payload.mode === "attemptDelete") {
          state.deleteID = action.payload.deleteId;
        } else if (action.payload.mode === "confirmDelete") {
          state.taskList = state.taskList.filter(
            (task) => task.id !== state.deleteID
          );
        }
      })
      .addCase(GetTaskListAction2, (state, action) => {
        state.taskList = action.payload.taskList;
      });
  }
);

//legacy: old style
// export const TaskReducer = (
// state = {
//   taskList: [],
// },
//   action
// ) => {
//   switch (action.type) {
//     case GetTaskListType: {
//       return { ...state, taskList: action.payload.taskList };
//     }
//     default:
//       return state;
//   }
// };
