import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UpdateCurrentUserAPI, LogSignAPI } from "../services/UserServices";
import {
  UpdateCurrentUserAction,
  ToggleLoadingAction,
} from "../redux/actions/ActionCreator";
import StyledButton from "../components/buttons/StyledButton";
import StyledInput from "../components/inputs/StyledInput";

const LoginPage = ({ toastSuccess, toastError }) => {
  const history = useHistory();
  const initDispatch = useDispatch();
  const apiUrl = useSelector((store) => store.appState.apiUrl);

  const [mode, setMode] = useState("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isClose, setIsClose] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const switchMode = () => {
    mode === "Login" ? setMode("Signup") : setMode("Login");
  };

  //log-sign
  const LogSignThunk = (endpoint) => {
    initDispatch(ToggleLoadingAction(true));
    const userInput = { username, password };
    return function (dispatch) {
      return (
        LogSignAPI(apiUrl, endpoint, userInput)
          .then((res) => {
            dispatch(UpdateCurrentUserAction(res.data));
            UpdateCurrentUserAPI({ id: res.data.id, token: res.data.token });
            setIsClose(true);
            toastSuccess(`Welcome, ${res.data.username}. Redirecting...`, {
              onClose: () => history.push("/"),
            });
          })
          // .then((res) => {
          //   return UpdateCurrentUserAPI;
          // })
          .catch((error) => {
            toastError(error.response.data.message);
          })
          .finally(() => {
            initDispatch(ToggleLoadingAction(false));
          })
      );
    };
  };
  const handleLogSign = (endpoint) => {
    isClose ? console.log("blocked") : initDispatch(LogSignThunk(endpoint));
  };

  //submit
  const handleSubmit = () => {
    mode === "Login" ? handleLogSign("/login") : handleLogSign("/register");
  };

  return (
    <>
      <header className="container1140">
        <h1>Task Manager with React</h1>
        <h2>{mode === "Login" ? "Log in" : "Sign up"}</h2>
      </header>

      <main className="login-page-wrapper">
        <div className="login-page container1140">
          <div className="form-item">
            <label htmlFor="username">Username:</label>
            <StyledInput.TextInput
              type="text"
              id="username"
              placeholder="demo: user"
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-item">
            <label htmlFor="password">Password:</label>
            <StyledInput.TextInput
              type="text"
              id="password"
              placeholder="demo: 123"
              onChange={handlePasswordChange}
            />
          </div>
          <StyledButton.BlueButton
            onClick={handleSubmit}
            margin="15px 0 30px 0"
          >
            {mode === "Login" ? "Log in" : "Sign up"}
          </StyledButton.BlueButton>

          <p className="sign-up-text">
            {mode === "Login"
              ? "Don't have an account yet?"
              : "Have an account?"}
            <span className="sign-up" onClick={switchMode}>
              {mode === "Login" ? " Sign up here!" : " Log in now!"}
            </span>
          </p>

          <div className="projects">
            <h3>My other projects:</h3>
            <ul>
              <li>
                <a
                  href="https://ducnt444.github.io/halo"
                  target="_blank"
                  rel="noreferrer"
                >
                  HALO
                </a>
                : demo camera shop website (static content, practicing Pug, CSS,
                JS)
              </li>
              <li>
                <a
                  href="https://ducnt444.github.io/planetary"
                  target="_blank"
                  rel="noreferrer"
                >
                  PLANETARY
                </a>
                : demo space travel website (practicing Vue.js, Vuex)
              </li>
              <li>
                <a
                  href="https://changeable-list.herokuapp.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Changeable list
                </a>
                : demo list manager (practicing DOM manipulation, Jquery, basic
                uses of REST API)
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
