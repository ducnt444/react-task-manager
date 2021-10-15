import { combineReducers } from "redux";
import { LoadingReducer } from "./LoadingReducer";
import { TaskReducer } from "./TaskReducer";
import { ModalReducer } from "./ModalReducer";
import { UserReducer } from "./UserReducer";
import { NavigationReducer } from "./NavigationReducer";

export default combineReducers({
  appState: UserReducer,
  loadingState: LoadingReducer,
  taskState: TaskReducer,
  modalState: ModalReducer,
  navState: NavigationReducer,
});
