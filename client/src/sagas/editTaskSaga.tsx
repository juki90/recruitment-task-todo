import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import { EDIT_TASK, EDIT_TASK_SUCCESS, REQUEST_FAILED } from "../actions";

function* editTaskWatcher() {
  yield takeLatest(EDIT_TASK, editTaskWorker);
}

function* editTaskWorker(action: {
  type: string;
  payload: { id: number; task: Task };
}) {
  const response = yield call(() => {
    try {
      const { id, task } = action.payload;
      const token = localStorage.getItem("token");

      if (token === null) {
        return { id, task };
      }
      return axios
        .put("/api/task", {
          id,
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

  if (response.task.name.length > 0 && response.id >= 0) {
    yield put({
      type: EDIT_TASK_SUCCESS,
      payload: { id: response.id, task: response.task },
    });
  }

  if (response.error) {
    yield put({
      type: REQUEST_FAILED,
      payload: response.error,
    });
  }
}

export default editTaskWatcher;
