import {
  REMOVE_TASK_SUCCESS,
  REQUEST_FAILED,
  ERROR_DISMISS,
  REGISTER_SUCCESS,
  LOGOUT,
  LOGIN_SUCCESS,
  ADD_TASK_SUCCESS,
  EDIT_TASK_SUCCESS,
  MOVE_TO_HISTORY_SUCCESS,
  REMOVE_HISTORY_SUCCESS,
} from "../actions";

const initialState: reducerState = {
  scheduled: [],
  done: [],
  loggedAs: "",
  error: "",
};

const rootReducer = (state: reducerState = initialState, action: any) => {
  switch (action.type) {
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        scheduled: [...state.scheduled, action.payload]
          .sort((a, b) => {
            const aNum = new Date(a.date).getTime();
            const bNum = new Date(b.date).getTime();
            return aNum > bNum ? 1 : -1;
          })
          .map((t, i) => {
            const task = t;
            task.id = i;
            return task;
          }),
      };
    case REMOVE_TASK_SUCCESS:
      return {
        ...state,
        scheduled: [
          ...state.scheduled
            .filter((t) => t.id !== action.payload)
            .map((t, i) => {
              const task = t;
              task.id = i;
              return task;
            }),
        ],
      };
    case EDIT_TASK_SUCCESS:
      return {
        ...state,
        scheduled: [
          ...state.scheduled
            .map((t) => {
              if (t.id === action.payload.id) {
                let task = t;
                task = action.payload.task;
                return task;
              }
              return t;
            })
            .sort((a, b) => {
              const aNum = new Date(a.date).getTime();
              const bNum = new Date(b.date).getTime();
              return aNum > bNum ? 1 : -1;
            })
            .map((t, i) => {
              const task = t;
              task.id = i;
              return task;
            }),
        ],
      };
    case MOVE_TO_HISTORY_SUCCESS:
      const [moved] = state.scheduled.filter((t) => t.id === action.payload);
      moved.date = new Date().toString();
      return {
        ...state,
        scheduled: [
          ...state.scheduled
            .filter((t) => t.id !== action.payload)
            .map((t, i) => {
              const task = t;
              task.id = i;
              return task;
            }),
        ],
        done: [...state.done, moved]
          .sort((a, b) => {
            const aNum = new Date(a.date).getTime();
            const bNum = new Date(b.date).getTime();
            return aNum < bNum ? 1 : -1;
          })
          .map((t, i) => {
            const task = t;
            task.id = i;
            return task;
          }),
      };
    case REMOVE_HISTORY_SUCCESS:
      return {
        ...state,
        done: [
          ...state.done
            .filter((t) => t.id !== action.payload)
            .map((t, i) => {
              const task = t;
              task.id = i;
              return task;
            }),
        ],
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loggedAs: action.payload.email,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        scheduled: action.payload.scheduled,
        done: action.payload.done,
        loggedAs: action.payload.email,
      };
    case REQUEST_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case ERROR_DISMISS:
      return {
        ...state,
        error: "",
      };
    case LOGOUT:
      return {
        ...state,
        scheduled: [],
        done: [],
        loggedAs: "",
      };
    default:
      return state;
  }
};

export default rootReducer;
