import { UpdateCurrentUserAPI } from "../services/UserServices";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiUser } from "react-icons/bi";
import {
  ToggleLoadingAction,
  UpdateCurrentUserAction,
} from "../redux/actions/ActionCreator";
import axios from "axios";

const Profile = () => {
  const apiUrl = useSelector((store) => store.appState.apiUrl);
  const currentUser = useSelector((store) => store.appState.currentUser);
  const history = useHistory();
  const initDispatch = useDispatch();

  const logoutThunk = () => {
    initDispatch(ToggleLoadingAction(true));
    return async function (dispatch) {
      const { data } = await UpdateCurrentUserAPI({ id: "", token: "" });
      dispatch(UpdateCurrentUserAction(data));
      history.push("/login");
      initDispatch(ToggleLoadingAction(false));
    };
  };

  const handleLogout = () => {
    initDispatch(logoutThunk());
  };

  const handleTest = () => {
    const headers = {
      Authorization: `Bearer ${currentUser.token}`,
    };
    axios.get(apiUrl + "/users/", { headers }).then((res) => console.log(res));
  };

  return (
    <>
      <header className="container1140">
        <h1>Profile</h1>
        <div className="userInfo">
          <div className="userAvatar flex-center">
            <BiUser />
          </div>
          <h3 className="userName">{currentUser.username}</h3>
        </div>
      </header>

      <main className="flex-center">
        <div className="container1140 flex-center">
          <button className="logoutBtn" onClick={handleLogout}>
            Logout
          </button>
          {/* <button onClick={handleTest}>Test</button> */}
        </div>
      </main>
    </>
  );
};

export default Profile;
