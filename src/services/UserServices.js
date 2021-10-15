import axios from "axios";
import { api } from "./API_URL";

//GET request to /users/id to fetch data of user/id
export const GetUserByIdAPI = (id, headers) => {
  return axios.get(api + "/users/" + id, {headers});
};

//GET request to /currentUser to fetch data
export const GetCurrentUserAPI = () => {
  return axios.get(api + "/currentUser");
};

//PUT request to /currentUser to: update data when log in or update back to {} when log out
export const UpdateCurrentUserAPI = (payload) => {
  return axios.put(api + "/currentUser", payload);
};

//POST request to /login or /register with payload
export const LogSignAPI = (apiUrl, endpoint, payload) => {
  return axios.post(apiUrl + endpoint, payload);
};
