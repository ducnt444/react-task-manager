import "./App.css";
import Home from "./views/Home/Home";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";
import ModalMain from "./components/ModalMain";
import AddTask from "./views/AddTask";
import Loading from "./components/Loading";
import EditTask from "./views/EditTask";

function App() {
  const history = useHistory();
  console.log(history);

  const [deleteID, setDeleteID] = useState("");
  const [tasks, setTasks] = useState([]);
  const [toggleFetching, setToggleFetching] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  //modal
  const [modalContent, setModalContent] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  //after page load: get data from server and use as base state
  useEffect(() => {
    axios.get("https://test-heroku444.herokuapp.com/tasks").then((res) => {
      setTasks(res.data);
      setIsLoading(false);
    });
  }, [toggleFetching]);

  //toggleLoading
  const toggleLoading = (mode) => {
    setIsLoading(mode);
  };

  //re-render app
  const reRender = () => {
    setToggleFetching((toggleFetching) => toggleFetching + 1);
  };

  //complete task
  const handleComplete = (isDone, id) => {
    toggleLoading(true);
    axios
      .patch(`https://test-heroku444.herokuapp.com/tasks/${id}`, {
        isDone: !isDone,
      })
      .then(() => {
        setToggleFetching((toggleFetching) => toggleFetching + 1);
        toggleLoading(false);
      });
  };

  //delete task
  const handleDelete = (id) => {
    setModalContent("Do you want to delete this task?");
    setVisible(true);
    setDeleteID(id);
  };
  const confirmDelete = () => {
    setConfirmLoading(true);
    axios
      .delete(`https://test-heroku444.herokuapp.com/tasks/${deleteID}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== deleteID));
        setConfirmLoading(false);
        setVisible(false);
      });
  };
  const confirmCancel = () => {
    setVisible(false);
  };

  return (
    <div className="App">
      <Router>
        <Loading isLoading={isLoading} />
        <ModalMain
          modalContent={modalContent}
          visible={visible}
          confirmDelete={confirmDelete}
          confirmLoading={confirmLoading}
          handleCancel={confirmCancel}
        />
        <Switch>
          <Route path="/add-task">
            <AddTask toggleLoading={toggleLoading} reRender={reRender} />
          </Route>
          <Route path="/edit-task/:id">
            <EditTask toggleLoading={toggleLoading} reRender={reRender} />
          </Route>
          <Route path="/">
            <Home
              tasks={tasks}
              onDelete={handleDelete}
              onComplete={handleComplete}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
