export const ADD_TASK = "ADD_TASK";
export const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
export const REMOVE_TASK = "REMOVE_TASK";
export const REMOVE_TASK_SUCCESS = "REMOVE_TASK_SUCCESS";
export const EDIT_TASK = "EDIT_TASK";
export const EDIT_TASK_SUCCESS = "EDIT_TASK_SUCCESS";
export const MOVE_TO_HISTORY = "MOVE_TO_HISTORY";
export const MOVE_TO_HISTORY_SUCCESS = "MOVE_TO_HISTORY_SUCCESS";
export const REMOVE_HISTORY = "REMOVE_HISTORY";
export const REMOVE_HISTORY_SUCCESS = "REMOVE_HISTORY_SUCCESS";
export const REGISTER = "REGISTER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const REQUEST_FAILED = "REQUEST_FAILED";
export const ERROR_DISMISS = "ERROR_DISMISS";

export const addTask: (
  task: Task
) => {
  type: string;
  payload: Task;
} = (task) => {
  return {
    type: ADD_TASK,
    payload: task,
  };
};

export const addTaskSuccess: (
  task: Task
) => {
  type: string;
  payload: Task;
} = (task) => {
  return {
    type: ADD_TASK_SUCCESS,
    payload: task,
  };
};

export const removeTask: (id: number) => { type: string; payload: number } = (
  id
) => {
  return {
    type: REMOVE_TASK,
    payload: id,
  };
};

export const removeTaskSuccess: (
  id: number
) => { type: string; payload: number } = (id) => {
  return {
    type: REMOVE_TASK_SUCCESS,
    payload: id,
  };
};

export const editTask: (
  id: number,
  task: Task
) => { type: string; payload: { id: number; task: Task } } = (id, task) => {
  return {
    type: EDIT_TASK,
    payload: { id, task },
  };
};

export const editTaskSuccess: (
  id: number,
  task: Task
) => { type: string; payload: { id: number; task: Task } } = (id, task) => {
  return {
    type: EDIT_TASK_SUCCESS,
    payload: { id, task },
  };
};

export const moveToHistory: (
  id: number
) => { type: string; payload: number } = (id) => {
  return {
    type: MOVE_TO_HISTORY,
    payload: id,
  };
};

export const moveToHistorySuccess: (
  id: number
) => { type: string; payload: number } = (id) => {
  return {
    type: MOVE_TO_HISTORY_SUCCESS,
    payload: id,
  };
};

export const removeHistory: (
  id: number
) => { type: string; payload: number } = (id) => {
  return {
    type: REMOVE_HISTORY,
    payload: id,
  };
};

export const removeHistorySuccess: (
  id: number
) => { type: string; payload: number } = (id) => {
  return {
    type: REMOVE_HISTORY_SUCCESS,
    payload: id,
  };
};

export const register: (
  email: string,
  password: string,
  passwordRepeat: string,
  scheduled: Task[],
  done: Task[],
  onSuccess: () => void
) => {
  type: string;
  payload: {
    email: string;
    password: string;
    passwordRepeat: string;
    scheduled: Task[];
    done: Task[];
    onSuccess: () => void;
  };
} = (email, password, passwordRepeat, scheduled, done, onSuccess) => {
  return {
    type: REGISTER,
    payload: { email, password, passwordRepeat, scheduled, done, onSuccess },
  };
};

export const registerSuccess: (
  email: string
) => {
  type: string;
  payload: {
    email: string;
  };
} = (email) => {
  return {
    type: REGISTER_SUCCESS,
    payload: { email },
  };
};

export const requestFailed: (
  error: string
) => {
  type: string;
  payload: string;
} = (error) => {
  return {
    type: REQUEST_FAILED,
    payload: error,
  };
};

export const errorDismiss: () => {
  type: string;
} = () => {
  return {
    type: ERROR_DISMISS,
  };
};

export const logout: () => { type: string } = () => {
  return {
    type: LOGOUT,
  };
};

export const login: (
  email: string,
  password: string,
  onSuccess: () => void
) => {
  type: string;
  payload: { email: string; password: string; onSuccess: () => void };
} = (email, password, onSuccess) => {
  return {
    type: LOGIN,
    payload: {
      email,
      password,
      onSuccess,
    },
  };
};

export const loginSuccess: (
  email: string,
  scheduled: Task[],
  done: Task[]
) => {
  type: string;
  payload: { email: string; scheduled: Task[]; done: Task[] };
} = (email, scheduled, done) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      email,
      scheduled,
      done,
    },
  };
};
