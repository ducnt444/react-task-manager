import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import { FaRedo } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import {
  ModalContentAction,
  ModalVisibleAction,
  ToggleLoadingAction,
  EditTaskAction,
} from "../../redux/actions/ActionCreator";
import { useDispatch, useSelector } from "react-redux";
import { updateAllTasks } from "../../services/TaskServices";

const Task = ({ task, toastSuccess, toastWarning }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.appState.currentUser);

  //timezone
  var options = {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  var formatter = new Intl.DateTimeFormat([], options);
  var timeFromServer = task.taskDate;
  var localTime = formatter.format(new Date(timeFromServer));

  const completeTaskThunk = () => {
    return function (dispatch) {
      dispatch(ToggleLoadingAction(true));
      const completeChangedTask = {
        ...task,
        isDone: !task.isDone,
      };
      const newTasks = currentUser.tasks.map((eachTask) => {
        return eachTask.id == task.id ? completeChangedTask : eachTask;
      });
      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
      };
      updateAllTasks(currentUser.id, newTasks, { headers }).then(() => {
        dispatch(EditTaskAction(task.id, completeChangedTask));
        dispatch(ToggleLoadingAction(false));
        task.isDone
          ? toastWarning("Task is incomplete")
          : toastSuccess("Task is completed");
      });
    };
  };

  const handleComplete = () => dispatch(completeTaskThunk());

  //Trigger modal delete
  const TriggerModalDelete = () => {
    // dispatch(DeleteTaskAction("attemptDelete", task.id));
    dispatch(ModalContentAction(task.id, "Do you want to delete this task"));
    dispatch(ModalVisibleAction(true));
  };

  return (
    <div className="taskItem">
      <div className="taskContent">
        <h3 className="taskName">{task.taskName}</h3>
        <h4 className="taskDate">{localTime}</h4>
      </div>
      <button className="doneBtn" onClick={handleComplete}>
        {task.isDone ? <FaRedo /> : <MdDone />}
      </button>

      <button
        className="editBtn"
        onClick={() => history.push(`/edit-task/${task.id}`)}
      >
        <BiEditAlt />
      </button>
      <button className="deleteBtn" onClick={TriggerModalDelete}>
        <RiDeleteBinLine />
      </button>
    </div>
  );
};

export default Task;
