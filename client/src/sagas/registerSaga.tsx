import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import { REGISTER, REGISTER_SUCCESS, REQUEST_FAILED } from "../actions";

function* registerWatcher() {
  yield takeLatest(REGISTER, registerWorker);
}

function* registerWorker(action: {
  type: string;
  payload: {
    email: string;
    password: string;
    passwordRepeat: string;
    scheduled: Task[];
    done: Task[];
    onSuccess: () => void;
  };
}) {
  const response = yield call(() => {
    const {
      email,
      password,
      passwordRepeat,
      scheduled,
      done,
      onSuccess,
    } = action.payload;
    try {
      return axios
        .post("/api/register", {
          email,
          password,
          passwordRepeat,
          scheduled,
          done,
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
      type: REGISTER_SUCCESS,
      payload: {
        email: response.email,
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

export default registerWatcher;
