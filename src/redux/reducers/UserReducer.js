import {
  UpdateCurrentUserAction,
  LogoutAction,
  AddTaskAction,
  EditTaskAction,
  DeleteTaskAction,
} from "../actions/ActionCreator";
import { createReducer } from "@reduxjs/toolkit";

export const UserReducer = createReducer(
  {
    apiUrl: "https://rest-api-v2.herokuapp.com",
    currentUser: {
      id: null,
      username: "",
      token: "",
      tasks: [],
    },
  },
  (builder) => {
    builder
      .addCase(UpdateCurrentUserAction, (state, action) => {
        state.currentUser = action.payload.userInput;
      })
      .addCase(LogoutAction, (state) => {
        state.currentUser = {
          id: null,
          username: "",
          token: "",
          tasks: [],
        };
      })
      .addCase(AddTaskAction, (state, action) => {
        state.currentUser.tasks.push(action.payload.newTask);
      })
      .addCase(EditTaskAction, (state, action) => {
        state.currentUser.tasks = state.currentUser.tasks.map((task) => {
          return task.id == action.payload.id
            ? action.payload.editedTask
            : task;
        });
      })
      .addCase(DeleteTaskAction, (state, action) => {
        state.currentUser.tasks = action.payload;
      });
  }
);
