// import { registerLocale, setDefaultLocale } from "react-datepicker";
// import vi from "date-fns/locale/vi";
// registerLocale("vi", vi);
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays, parseISO } from "date-fns";
import {
  EditTaskAction,
  ToggleLoadingAction,
} from "../redux/actions/ActionCreator";
import { updateAllTasks } from "../services/TaskServices";
import StyledInput from "../components/inputs/StyledInput";
import StyledDateInput from "../components/inputs/StyledInput";

const EditTask = ({ currentUser, toastSuccess, toastError }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState(null);
  const [taskIsDone, setTaskIsDone] = useState(false);

  useEffect(() => {
    const currentTask = currentUser.tasks.find((task) => task.id === id);
    if (currentTask) {
      setTaskName(currentTask.taskName);
      setTaskDate(parseISO(currentTask.taskDate));
      setTaskIsDone(currentTask.isDone);
    }
    return () => {
      console.log("Bye");
    };
  }, [currentUser]);

  const handleNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDateChange = (date) => {
    setTaskDate(date);
  };

  const editTaskThunk = () => {
    return function (dispatch) {
      dispatch(ToggleLoadingAction(true));
      const editedTask = {
        id: id,
        taskName,
        taskDate: new Date(taskDate).toISOString(),
        isDone: taskIsDone,
      };
      const newTasks = currentUser.tasks.map((task) => {
        return task.id == id ? editedTask : task;
      });
      console.log(newTasks);
      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
      };
      updateAllTasks(currentUser.id, newTasks, { headers }).then(() => {
        dispatch(EditTaskAction(id, editedTask));
        dispatch(ToggleLoadingAction(false));
        toastSuccess("Task edited successfully");
      });
    };
  };

  const handleSubmit = () => {
    if (taskName !== "" && taskDate !== null) dispatch(editTaskThunk());
    else toastError("Please fill in both fields");
  };

  return (
    <>
      <header className="container1140">
        <h1>Edit task</h1>
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
            <label htmlFor="taskName">Edit task:</label>
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
};

//legacy: non-redux

// const handleSubmit = () => {
//   if (taskName && taskDate) {
//     const editedTask = { taskName, taskDate };
//     toggleLoading(true);
//     axios
//       .patch(`https://test-heroku444.herokuapp.com/tasks/${id}`, editedTask)
//       .then((res) => {
//         console.log(res);
//         setTaskName("");
//         setTaskDate("");
//         reRender();
//         toggleLoading(false);
//         history.push("/");
//       });
//   } else {
//     console.log("empty");
//   }
// };

export default EditTask;
