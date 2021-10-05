import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import { FaRedo } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const Task = ({ task, onDelete, onComplete }) => {
  const history = useHistory();
  var options = {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  var formatter = new Intl.DateTimeFormat([], options);
  var timeFromServer = task.taskDate;
  var localTime = formatter.format(new Date(timeFromServer));

  return (
    <div className="taskItem">
      <div className="taskContent">
        <h3 className="taskName">{task.taskName}</h3>
        <h4 className="taskDate">{localTime}</h4>
      </div>
      <button
        className="doneBtn"
        onClick={() => onComplete(task.isDone, task.id)}
      >
        {task.isDone ? <FaRedo /> : <MdDone />}
      </button>

      <button
        className="editBtn"
        onClick={() => history.push(`/edit-task/${task.id}`)}
      >
        <BiEditAlt />
      </button>
      <button className="deleteBtn" onClick={() => onDelete(task.id)}>
        <RiDeleteBinLine />
      </button>
    </div>
  );
};

export default Task;
