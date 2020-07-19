import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../theme";
import { Input, Label, Submit, InputError } from "../style";
import DateTimePicker from "react-datetime-picker";
import { darken, lighten } from "polished";
import { AiFillCloseCircle } from "react-icons/ai";
import { connect } from "react-redux";
import {
  addTask as addTaskAction,
  editTask as editTaskAction,
  removeTask as removeTaskAction,
} from "../actions";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99998;
  width: 100%;
  height: 100vh;
  background-color: rgba(50, 50, 50, 0.75);
`;

const Modal = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  z-index: 99999;
  max-width: 300px;
  transform: translate(-50%, -50%);
  background-color: ${theme.panel_background};
  @media screen and (min-width: 768px) {
    max-width: 480px;
  }
`;

const HeadingMain = styled.h2`
  position: relative;
  font-size: 2.2em;
  color: ${theme.panel_text};
  padding: 10px 20px;
  background-color: ${theme.header_background};
  color: ${theme.header_text};
  margin: 0;
`;

const ModalContent = styled.div`
  padding: 15px;
`;

const Checkbox = styled.input`
  cursor: pointer;
  display: block;
  padding: 15px;
  width: 25px;
  height: 25px;
  opacity: 0;
  margin: 0 10px;
`;

const CheckboxVisible = styled.span`
  cursor: pointer;
  position: relative;
  z-index: -1;
  top: 0;
  left: -35px;
  border: 1px solid black;
  height: 20px;
  width: 20px;
  border-radius: 3px;
  line-height: 20px;
  padding: 2px 0 1px 6px;
  box-shadow: 1px 1px 6px 0 ${lighten(0.25, theme.header_background)};
`;

const DateTimePickerStyled = styled(DateTimePicker)`
  display: block;
  .react-datetime-picker__wrapper {
    display: flex;
    align-items: center;
    margin: 10px 0 25px 0;
    font-size: 1em;
    padding: 5px 10px;
    border: 1px solid ${darken(0.3, theme.panel_background)};
    box-shadow: 0 0 5px 0 ${darken(0.2, theme.panel_background)};
  }
  .react-datetime-picker__inputGroup {
    display: flex;
  }
  .react-datetime-picker__inputGroup__leadingZero {
    padding-top: 1px;
  }
`;

const CloseHedingButton = styled.button`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  border: 0 none;
  background-color: transparent;
  margin-left: auto;
  cursor: pointer;
`;

const CloseButton = styled.button`
  font-size: 1em;
  background-color: #a22;
  color: ${theme.header_text};
  padding: 5px 10px;
  text-shadow: 0 0 1px #000;
  border: 2px solid ${theme.header_text};
  box-shadow: 1px 1px 5px 0 ${lighten(0.25, theme.header_background)};
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${lighten(0.2, "#a22")};
  }
`;

interface AddTaskModalProps {
  editMode?: boolean;
  task?: Task;
  scheduled: Task[];
  onCancel: () => void;
  addTask: (task: Task) => void;
  editTask: (id: number, task: Task) => void;
  removeTask: (id: number) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  editMode = false,
  task,
  scheduled,
  onCancel,
  addTask,
  editTask,
  removeTask,
}) => {
  const [name, setName] = useState<string>(editMode ? task!.name : "");
  const [date, setDate] = useState<Date>(
    editMode ? new Date(task!.date) : new Date()
  );
  const [important, setImportant] = useState<boolean>(
    editMode ? task!.important : false
  );
  const [err, setErr] = useState<{ name: boolean; date: boolean }>({
    name: false,
    date: false,
  });

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nowNum = new Date().getTime();
    const destNum = new Date(date).getTime();
    const errors = { name: false, date: false };
    if (nowNum >= destNum) {
      errors.date = true;
    }
    if (name.length === 0) {
      errors.name = true;
    }
    if (errors.name || errors.date) {
      setErr(errors);
      return;
    }
    if (editMode) {
      editTask(task!.id, {
        name,
        date: date.toString(),
        important,
        id: scheduled.length,
      });
      onCancel();
      return;
    }
    addTask({ name, date: date.toString(), important, id: scheduled.length });
    onCancel();
  };

  return (
    <ModalContainer>
      <Modal>
        <HeadingMain>
          {editMode ? "Edit task" : "Add new task"}
          <CloseHedingButton onClick={onCancel}>
            <AiFillCloseCircle color={theme.header_text} size={30} />
          </CloseHedingButton>
        </HeadingMain>
        <ModalContent>
          <form onSubmit={handleAddTask}>
            <Label htmlFor="name">
              Task name
              <Input
                name="name"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-testid="task-name"
              />
              {err.name && (
                <InputError>You must enter name of the task</InputError>
              )}
            </Label>
            <Label htmlFor="date" data-testid="task-date">
              Task date
              <DateTimePickerStyled
                value={date}
                onChange={(v: React.SetStateAction<Date>) => setDate(v)}
                minDate={new Date()}
              />
              {err.date && (
                <InputError>You must enter date in the future</InputError>
              )}
            </Label>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <Checkbox
                id="important"
                type="checkbox"
                checked={important}
                onChange={() => setImportant(!important)}
                data-testid="task-important"
              />
              <CheckboxVisible
                style={{ textIndent: important ? 0 : "-3000em" }}
              >
                &#10004;
              </CheckboxVisible>
              <Label style={{ margin: "0 0 0 -15px" }} htmlFor="important">
                This task is important
              </Label>
            </div>
            <Submit
              type="submit"
              value={editMode ? "Save changes" : "Add task"}
              data-testid="task-submit"
            />
            <CloseButton onClick={onCancel}>Cancel</CloseButton>
          </form>
        </ModalContent>
      </Modal>
    </ModalContainer>
  );
};

const mapStateToProps = (state: { scheduled: Task[] }) => {
  const { scheduled } = state;
  return {
    scheduled,
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: {
    type: string;
    payload: number | Task | { id: number; task: Task };
  }) => any
) => ({
  addTask: (task: Task) => dispatch(addTaskAction(task)),
  editTask: (id: number, task: Task) => dispatch(editTaskAction(id, task)),
  removeTask: (id: number) => dispatch(removeTaskAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskModal);
