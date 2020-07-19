import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import { ADD_TASK, ADD_TASK_SUCCESS, REQUEST_FAILED } from "../actions";

function* addTaskWatcher() {
  yield takeLatest(ADD_TASK, addTaskWorker);
}

function* addTaskWorker(action: { type: string; payload: Task }) {
  const response = yield call(() => {
    try {
      const task = action.payload;
      const token = localStorage.getItem("token");

      if (token === null) {
        return { task };
      }
      return axios
        .post("/api/task", {
          task,
          token,
        })
        .then((res) => res.data)
        .catch((err) => {
          return {
            error: "An error occured making this request",
          };
        });
    } catch {
      return {
        error: "An error occured making this request",
      };
    }
  });

  if (response.task.name.length > 0) {
    yield put({
      type: ADD_TASK_SUCCESS,
      payload: response.task,
    });
  }

  if (response.error) {
    yield put({
      type: REQUEST_FAILED,
      payload: response.error,
    });
  }
}

export default addTaskWatcher;
