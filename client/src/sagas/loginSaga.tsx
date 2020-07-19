import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import { LOGIN, LOGIN_SUCCESS, REQUEST_FAILED } from "../actions";

function* loginWatcher() {
  yield takeLatest(LOGIN, loginWorker);
}

function* loginWorker(action: {
  type: string;
  payload: {
    email: string;
    password: string;
    onSuccess: () => void;
  };
}) {
  const response = yield call(() => {
    const { email, password } = action.payload;
    try {
      return axios
        .post("/api/login", {
          email,
          password,
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

  if (response.email && response.token) {
    localStorage.setItem("token", response.token);
    action.payload.onSuccess();
    yield put({
      type: LOGIN_SUCCESS,
      payload: {
        email: response.email,
        scheduled: response.scheduled.length ? response.scheduled : [],
        done: response.done.length ? response.done : [],
      },
    });
  }

  if (response.error) {
    yield put({
      type: REQUEST_FAILED,
      payload: response.error,
    });
  }
}

export default loginWatcher;
