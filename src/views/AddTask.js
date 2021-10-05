import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";

// import { registerLocale, setDefaultLocale } from "react-datepicker";
// import vi from "date-fns/locale/vi";
// registerLocale("vi", vi);

const AddTask = ({ reRender, toggleLoading }) => {
  const history = useHistory();

  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState(null);

  const handleNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDateChange = (date) => {
    setTaskDate(date);
    // console.log(date);
  };

  const handleSubmit = () => {
    if (taskName && taskDate) {
      const newTask = { taskName, taskDate, isDone: false };
      toggleLoading(true);
      axios
        .post("https://test-heroku444.herokuapp.com/tasks", newTask)
        .then((res) => {
          console.log(res);
          setTaskName("");
          setTaskDate("");
          reRender();
          toggleLoading(false);
          history.push("/");
        });
    } else {
      console.log("empty");
    }
  };

  return (
    <>
      <header>
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
        <div className="form-item">
          <label htmlFor="taskName">Add task:</label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={handleNameChange}
          ></input>
        </div>
        <div className="form-item">
          <label htmlFor="taskDate">Task date:</label>
          <DatePicker
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
      </main>
    </>
  );
};

export default AddTask;
