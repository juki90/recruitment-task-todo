declare module "react-datetime-picker";

type Task = {
  id: number;
  name: string;
  date: string;
  important: boolean;
};

type reducerState = {
  scheduled: Task[];
  done: Task[];
  loggedAs: string;
  error: string;
};
