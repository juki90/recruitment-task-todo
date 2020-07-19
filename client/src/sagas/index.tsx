import { all } from "redux-saga/effects";
import registerWatcher from "./registerSaga";
import loginWatcher from "./loginSaga";
import addTaskWatcher from "./addTaskSaga";
import removeTaskWatcher from "./removeTaskSaga";
import editTaskWatcher from "./editTaskSaga";
import moveToHistoryWarcher from "./moveToHistorySaga";
import removeHistoryWatcher from "./removeHistorySaga";

function* rootSaga() {
  yield all([
    registerWatcher(),
    loginWatcher(),
    addTaskWatcher(),
    removeTaskWatcher(),
    editTaskWatcher(),
    moveToHistoryWarcher(),
    removeHistoryWatcher(),
  ]);
}

export default rootSaga;
