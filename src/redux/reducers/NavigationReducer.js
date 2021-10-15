import { createReducer } from "@reduxjs/toolkit";
import { DisplayNavAction } from "../actions/ActionCreator";

export const NavigationReducer = createReducer(
  { displayNav: true },
  (builder) => {
    builder.addCase(DisplayNavAction, (state, action) => {
      state.displayNav = action.payload;
    });
  }
);
