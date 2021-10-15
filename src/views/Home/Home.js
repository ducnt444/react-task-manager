import Task from "./Task";
import { useSelector } from "react-redux";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Home = ({ toastSuccess, toastWarning }) => {
  const tasks = useSelector((store) => store.appState.currentUser.tasks);
  const doneTasks = tasks.filter((task) => task.isDone === true);
  const todoTasks = tasks.filter((task) => task.isDone === false);
  const scrollToDone = () =>
    document.getElementById("doneTasks").scrollIntoView({ behavior: "smooth" });
  const scrollToTodo = () =>
    document.getElementById("todoTasks").scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <header className="container1140">
        <h1>Task Manager with React</h1>
        <div className="header-content">
          <div className="statistics-area">
            <div className="statistics" onClick={scrollToDone}>
              <div className="header-item">{doneTasks.length}</div>
              <span className="statistics-text">Completed</span>
            </div>
            <div className="statistics" onClick={scrollToTodo}>
              <div className="header-item">{todoTasks.length}</div>
              <span className="statistics-text">Ongoing</span>
            </div>
          </div>
          {/* <button className="header-item header-btn">
            <Link to="/add-task">
              <span>Add</span> <AiOutlinePlusCircle />
            </Link>
          </button> */}
        </div>
      </header>

      <main>
        <div className="home main-content container1140">
          <div id="todoTasks">
            <h2>Ongoing tasks: </h2>
            {todoTasks.length > 0 ? (
              todoTasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  toastSuccess={toastSuccess}
                  toastWarning={toastWarning}
                />
              ))
            ) : (
              <span className="noTasks">No tasks yet</span>
            )}
          </div>
          <div id="doneTasks">
            <h2>Completed tasks: </h2>
            {doneTasks.length > 0 ? (
              doneTasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  toastSuccess={toastSuccess}
                  toastWarning={toastWarning}
                />
              ))
            ) : (
              <span className="noTasks">No tasks yet</span>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
