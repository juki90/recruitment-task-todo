import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  MOVE_TO_HISTORY,
  MOVE_TO_HISTORY_SUCCESS,
  REQUEST_FAILED,
} from "../actions";

function* moveToHistorykWatcher() {
  yield takeLatest(MOVE_TO_HISTORY, moveToHistorykWorker);
}

function* moveToHistorykWorker(action: { type: string; payload: number }) {
  const response = yield call(() => {
    try {
      const id = action.payload;
      const token = localStorage.getItem("token");

      if (token === null) {
        return { id };
      }
      return axios
        .post("/api/finished", {
          id,
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

  if (response.id >= 0) {
    yield put({
      type: MOVE_TO_HISTORY_SUCCESS,
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

export default moveToHistorykWatcher;
