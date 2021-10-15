import { createReducer } from "@reduxjs/toolkit";
import {
  ModalContentAction,
  ModalVisibleAction,
  ModalLoadingAction,
} from "../actions/ActionCreator";

export const ModalReducer = createReducer(
  { modalContent: "", modalId: null, isVisible: false, isLoading: false },
  (builder) => {
    builder
      .addCase(ModalContentAction, (state, action) => {
        state.modalId = action.payload.id;
        state.modalContent = action.payload.content;
      })
      .addCase(ModalVisibleAction, (state, action) => {
        state.isVisible = action.payload.isVisible;
      })
      .addCase(ModalLoadingAction, (state, action) => {
        state.isLoading = action.payload.isLoading;
      });
  }
);
