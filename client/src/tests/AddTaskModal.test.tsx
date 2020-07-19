import React from "react";
import AddTaskModal from "../components/AddTaskModal";
import { render, screen, fireEvent } from "./utils/test-utils";
import "@testing-library/jest-dom/extend-expect";

const initialState: reducerState = {
  scheduled: [],
  done: [],
  loggedAs: "",
  error: "",
};

describe("Add-new-task component tests", () => {
  it("Renders 4 inputs for adding new task", () => {
    render(<AddTaskModal onCancel={() => {}} />, { initialState });
    expect(screen.getByTestId("task-name")).toBeInTheDocument();
    expect(screen.getByTestId("task-date")).toBeInTheDocument();
    expect(screen.getByTestId("task-important")).toBeInTheDocument();
    expect(screen.getByTestId("task-submit")).toBeInTheDocument();
  });
  it("Should render text in task name when user is typing", () => {
    render(<AddTaskModal onCancel={() => {}} />, { initialState });

    const name = screen.getByLabelText(/Task name/i);

    fireEvent.change(name, { target: { value: "I must eat something soon" } });

    expect((name as HTMLInputElement).value).toBe("I must eat something soon");
  });
  it("Checkbox should be checked on click", () => {
    render(<AddTaskModal onCancel={() => {}} />, { initialState });

    const checkbox = screen.getByLabelText(/This task is important/i);

    fireEvent.click(checkbox);

    expect(checkbox as HTMLElement).toBeChecked();
  });
});
