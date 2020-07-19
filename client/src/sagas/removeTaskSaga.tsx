import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import { REMOVE_TASK, REMOVE_TASK_SUCCESS, REQUEST_FAILED } from "../actions";

function* removeTaskWatcher() {
  yield takeLatest(REMOVE_TASK, removeTaskWorker);
}

function* removeTaskWorker(action: { type: string; payload: number }) {
  const response = yield call(() => {
    try {
      const id = action.payload;
      const token = localStorage.getItem("token");

      if (token === null) {
        return { id };
      }
      return axios
        .delete("/api/task", {
          data: {
            id,
            token,
          },
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

  if (response.id >= 0) {
    yield put({
      type: REMOVE_TASK_SUCCESS,
      payload: response.id,
    });
  }

  if (response.error) {
    yield put({
      type: REQUEST_FAILED,
      payload: response.error,
    });
  }
}

export default removeTaskWatcher;
