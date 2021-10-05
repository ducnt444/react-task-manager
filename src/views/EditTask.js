import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays, parseISO } from "date-fns";

// import { registerLocale, setDefaultLocale } from "react-datepicker";
// import vi from "date-fns/locale/vi";
// registerLocale("vi", vi);

const EditTask = ({ toggleLoading, reRender }) => {
  const history = useHistory();
  const { id } = useParams();

  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState(null);

  useEffect(() => {
    toggleLoading(true);
    axios
      .get(`https://test-heroku444.herokuapp.com/tasks/${id}`)
      .then((res) => {
        setTaskName(res.data.taskName);
        setTaskDate(parseISO(res.data.taskDate));
        toggleLoading(false);
      });
  }, []);

  const handleNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDateChange = (date) => {
    setTaskDate(date);
  };

  const handleSubmit = () => {
    if (taskName && taskDate) {
      const editedTask = { taskName, taskDate };
      toggleLoading(true);
      axios
        .patch(`https://test-heroku444.herokuapp.com/tasks/${id}`, editedTask)
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
        <div className="form-item">
          <label htmlFor="taskName">Edit task:</label>
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

export default EditTask;
