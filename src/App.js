import "./App.css";
import Home from "./views/Home/Home";
import { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import ModalMain from "./components/ModalMain";
import AddTask from "./views/AddTask";
import Loading from "./components/Loading";
import { useDispatch, useSelector } from "react-redux";
import EditTask from "./views/EditTask";
import {
  DisplayNavAction,
  ToggleLoadingAction,
  UpdateCurrentUserAction,
} from "./redux/actions/ActionCreator";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./views/LoginPage";
import TheNavigation from "./components/TheNavigation";
import Profile from "./views/Profile";
import { GetCurrentUserAPI, GetUserByIdAPI } from "./services/UserServices";
import Test from "./views/Test";
import { pipe } from "lodash/fp";

function App() {
  const trim = (str) => str.trim();
  const wrap = (type) => (str) => `<${type}>${str}</${type}>`;
  const toLowerCase = (str) => str.toLowerCase();
  const result = pipe(trim, toLowerCase, wrap("h1"));

  console.log(result("JavaScript"));

  //toast
  const toastSuccess = (text, callback) => toast.success(text, callback);
  const toastError = (text) => toast.error(text);
  const toastWarning = (text) => toast.warn(text);

  //general
  const history = useHistory();
  const dispatch = useDispatch();

  //toggleLoading
  const isLoading = useSelector((store) => store.loadingState.isLoading);

  const currentUser = useSelector((store) => store.appState.currentUser);

  // const getCurrent = async () => {
  //   const { data } = await GetCurrentUserAPI();
  //   if (data.token !== "") {
  //     dispatch(UpdateCurrentTokenAction(data.token));
  //     const headers = {
  //       Authorization: `Bearer ${data.token}`,
  //     };
  //     const currentUserData = await GetUserByIdAPI(data.id, headers);
  //     dispatch(UpdateCurrentUserAction(currentUserData.data));
  //   } else {
  //     history.push("/login");
  //   }
  //   dispatch(ToggleLoadingAction(false));
  // };

  //thunk
  const getCurrent = () => {
    return function (dispatch) {
      return GetCurrentUserAPI()
        .then((res) => {
          const token = res.data.token;
          if (token !== "") {
            const headers = {
              Authorization: `Bearer ${token}`,
            };
            GetUserByIdAPI(res.data.id, headers)
              .then((res2) => {
                dispatch(UpdateCurrentUserAction({ ...res2.data, token }));
              })
              .catch((err) => {
                if (err.response.data === "Unauthorized")
                  history.push("/login");
              })
              .finally(() => {
                dispatch(ToggleLoadingAction(false));
              });
          } else {
            history.push("/login");
          }
        })
        .finally(() => {
          dispatch(ToggleLoadingAction(false));
        });
    };
  };

  //first load: get currentUserID from API, then call thunk: get current user data from API then update state
  useEffect(() => {
    dispatch(getCurrent());
  }, []);

  return (
    <div className="App">
      <Loading isLoading={isLoading} />
      <ToastContainer
        transition={Flip}
        className="customizedToast"
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
      <ModalMain currentUser={currentUser} toastSuccess={toastSuccess} />
      <Switch>
        <Route path="/login">
          <LoginPage toastSuccess={toastSuccess} toastError={toastError} />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/add-task">
          <AddTask toastSuccess={toastSuccess} toastError={toastError} />
        </Route>
        <Route path="/edit-task/:id">
          <EditTask
            currentUser={currentUser}
            toastSuccess={toastSuccess}
            toastError={toastError}
          />
        </Route>
        <Route path="/test" exact={true}>
          <Test />
        </Route>
        <Route path="/" exact={true}>
          <Home toastSuccess={toastSuccess} toastWarning={toastWarning} />
        </Route>
      </Switch>
      <TheNavigation />
    </div>
  );
}

//legacy

//Component state style
// const [tasks, setTasks] = useState([]);
// useEffect(() => {
//   axios.get("https://test-heroku444.herokuapp.com/tasks").then((res) => {
//     setTasks(res.data);
//     toggleLoading(false);
//   });
// }, [toggleFetching]);

//Modal
// modalContent = { modalContent };
// visible = { visible };
// confirmLoading = { confirmLoading };
// confirmDelete = { confirmDelete };
// handleCancel = { confirmCancel };
// const confirmLoading = useSelector((state) => state.modalState.isLoading);
// const visible = useSelector((state) => state.modalState.isVisible);
// const modalContent = useSelector((state) => state.modalState.modalContent);

// //delete task
// const [deleteID, setDeleteID] = useState("");
// const handleDelete = (id) => {
//   setModalContent("Do you want to delete this task?");
//   setVisible(true);
//   setDeleteID(id);
// };
// const confirmCancel = () => {
//   setVisible(false);
// };
// const confirmDelete = () => {
//   setConfirmLoading(true);
//   axios
//     .delete(`https://test-heroku444.herokuapp.com/tasks/${deleteID}`)
//     .then(() => {
//       // setTasks(tasks.filter((task) => task.id !== deleteID));
//       setConfirmLoading(false);
//       setVisible(false);
//     });
// };

//complete task
// const handleComplete = (isDone, id) => {
//   toggleLoading(true);
//   axios
//     .patch(`https://test-heroku444.herokuapp.com/tasks/${id}`, {
//       isDone: !isDone,
//     })
//     .then(() => {
//       setToggleFetching((toggleFetching) => toggleFetching + 1);
//       toggleLoading(false);
//     });
// };

export default App;
