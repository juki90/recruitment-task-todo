import React from "react";
import Task from "../components/Task";
import { render, screen } from "./utils/test-utils";
import "@testing-library/jest-dom/extend-expect";

const initialState: reducerState = {
  scheduled: [],
  done: [],
  loggedAs: "",
  error: "",
};

const taskData = {
  id: 0,
  name: "Example task",
  date: new Date(1990, 2, 13, 23, 0).toString(),
  important: false,
};
const taskFinishedData = {
  id: 0,
  name: "Example task",
  date: new Date(1990, 2, 13, 23, 0).toString(),
  important: false,
  finished: true,
};

describe("Task rendering tests", () => {
  it("Renders given name", () => {
    render(<Task data={taskData} />, { initialState });
    expect(screen.getByTestId("task-name")).toHaveTextContent(taskData.name);
  });
  it("Renders given date in proper format", () => {
    render(<Task data={taskData} />, { initialState });
    expect(screen.queryByText("13/03/1990 23:00")).toBeInTheDocument();
  });
  it("Renders 3 buttons if task is not finished", () => {
    render(<Task data={taskData} />, { initialState });
    expect(screen.getByTestId("done-button")).toBeInTheDocument();
    expect(screen.getByTestId("edit-button")).toBeInTheDocument();
    expect(screen.getByTestId("delete-button")).toBeInTheDocument();
  });
  it("Renders 1 delete button if task is finished", () => {
    render(<Task data={taskFinishedData} />, { initialState });
    expect(screen.getByTestId("delete-button")).toBeInTheDocument();
  });
});
