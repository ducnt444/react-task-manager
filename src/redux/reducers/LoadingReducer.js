import { ToggleLoadingType } from "../actions/ActionType";

export const LoadingReducer = (
  state = {
    isLoading: true,
  },
  action
) => {
  switch (action.type) {
    case ToggleLoadingType: {
      return { ...state, isLoading: action.payload.status };
    }
    default:
      return state;
  }
};
