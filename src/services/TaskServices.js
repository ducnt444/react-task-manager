import axios from "axios";
import { api } from "./API_URL";

//PUT request to /task/taskId, payload = isDone to complete a task
export const CompleteTaskAPI = (id, isDone) => {
  console.log(id, isDone);
  return axios.patch(api + "/tasks/" + id, { isDone: !isDone });
};

//PATCH to /users/id => tasks (add task, edit task, delete task with a whole new tasks array)
export const updateAllTasks = (id, newTasks, headers) => {
  return axios.patch(api + "/users/" + id, { tasks: newTasks }, headers);
};
