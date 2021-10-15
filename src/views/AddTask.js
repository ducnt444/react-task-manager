import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";
import {
  AddTaskAction,
  ToggleLoadingAction,
} from "../redux/actions/ActionCreator";
import { updateAllTasks } from "../services/TaskServices";
import { v4 as uuidv4 } from "uuid";
import StyledInput from "../components/inputs/StyledInput";
import StyledDateInput from "../components/inputs/StyledInput";
// import { registerLocale, setDefaultLocale } from "react-datepicker";
// import vi from "date-fns/locale/vi";
// registerLocale("vi", vi);

//add task: POST task to API .then update store
const AddTask = ({ toastSuccess, toastError }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState(null);
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.appState.currentUser);
  const handleNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDateChange = (date) => {
    setTaskDate(date);
  };

  const addTaskThunk = () => {
    return function (dispatch) {
      dispatch(ToggleLoadingAction(true));
      const newTask = {
        id: uuidv4(),
        taskName,
        taskDate,
        isDone: false,
      };
      const newTasks = [...currentUser.tasks, newTask];
      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
      };
      updateAllTasks(currentUser.id, newTasks, { headers }).then(() => {
        dispatch(
          AddTaskAction({
            ...newTask,
            taskDate: new Date(taskDate).toISOString(),
          })
        );
        dispatch(ToggleLoadingAction(false));
        setTaskName("");
        setTaskDate(null);
        toastSuccess("Task added successfully");
        console.log(currentUser);
      });
    };
  };

  const handleSubmit = () => {
    if (taskName !== "" && taskDate !== null) dispatch(addTaskThunk());
    else toastError("Please fill in both fields");
  };

  return (
    <>
      <header className="container1140">
        <h1>Add task</h1>
        <div className="header-content">
          <button className="header-item header-btn">
            <Link to="/">
              <span>Back</span>
            </Link>
          </button>
        </div>
      </header>

      <main>
        <div className="main-content container1140">
          <div className="form-item">
            <label htmlFor="taskName">Add task:</label>
            <StyledInput.TextInput
              type="text"
              id="taskName"
              value={taskName}
              onChange={handleNameChange}
            ></StyledInput.TextInput>
          </div>
          <div className="form-item">
            <label htmlFor="taskDate">Task date:</label>

            <StyledDateInput.DateInput
              className="datePicker"
              dateFormat="dd/MM/yyyy"
              selected={taskDate}
              onChange={handleDateChange}
              minDate={subDays(new Date(), 0)}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="confirm-btn blue-text-btn btn"
          >
            Confirm
          </button>
        </div>
      </main>
    </>
  );

  //legacy (non-redux):
  // const handleSubmitOld = () => {
  //   if (taskName && taskDate) {
  //     const newTask = { taskName, taskDate, isDone: false };
  //     toggleLoading(true);
  //     axios
  //       .post("https://test-heroku444.herokuapp.com/tasks", newTask)
  //       .then((res) => {
  //         setTaskName("");
  //         setTaskDate("");
  //         toggleLoading(false);
  //         history.push("/");
  //       });
  //   } else {
  //     console.log("empty");
  //   }
  // };
};

export default AddTask;
