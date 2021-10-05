import Task from "./Task";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Home = ({ tasks, onDelete, onComplete }) => {
  const doneTasks = tasks.filter((task) => task.isDone === true);
  const todoTasks = tasks.filter((task) => task.isDone === false);

  return (
    <>
      <header>
        <h1>Task Manager by React</h1>
        <div className="header-content">
          <div className="statistics-area">
            <div className="statistics">
              <div className="header-item">{doneTasks.length}</div>
              <span className="statistics-text">Completed</span>
            </div>
            <div className="statistics">
              <div className="header-item">{todoTasks.length}</div>
              <span className="statistics-text">Ongoing</span>
            </div>
          </div>
          <button className="header-item header-btn">
            <Link to="/add-task">
              <span>Add</span> <AiOutlinePlusCircle />
            </Link>
          </button>
        </div>
      </header>

      <main>
        <div className="home">
          <div className="doneTasks">
            <h2>Ongoing tasks: </h2>
            {todoTasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onDelete={onDelete}
                onComplete={onComplete}
              />
            ))}
          </div>
          <div className="todoTasks">
            <h2>Completed tasks: </h2>
            {doneTasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onDelete={onDelete}
                onComplete={onComplete}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
