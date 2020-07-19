import React, { useState } from "react";
import { theme } from "../theme";
import { darken, lighten } from "polished";
import styled from "styled-components";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import AddTaskModal from "./AddTaskModal";
import {
  removeTask as removeTaskAction,
  moveToHistory as moveToHistoryAction,
  removeHistory as removeHistoryAction,
} from "../actions";
import { connect } from "react-redux";

const TaskFuture = styled.div<TaskProps>`
  position: relative;
  padding: 10px 120px 30px 15px;
  margin: 5px 15px 15px 15px;
  background-color: ${(props) =>
    props.data.important
      ? darken(0.1, "#eea")
      : darken(0.1, theme.panel_background)};
  border: 1px solid
    ${(props) =>
      props.data.important
        ? darken(0.2, "#cca")
        : darken(0.3, theme.panel_background)};
  box-shadow: 0 0 10px 1px ${darken(0.15, theme.panel_background)};
`;

const TaskFinished = styled.div`
  position: relative;
  opacity: 0.75;
  padding: 10px 55px 30px 15px;
  margin: 5px 15px 15px 15px;
  background-color: ${darken(0.1, theme.panel_background)};
  border: 0 none;
  color: ${lighten(0.2, theme.panel_text)} !important;
`;

const ButtonGroup = styled.div`
  position: absolute;
  padding: 5px 10px;
  top: 0;
  right: 0;
`;

const ButtonDelete = styled.button`
  margin-left: 5px;
  border: 1px solid ${darken(0.4, theme.panel_background)};
  border-radius: 3px;
  padding: 5px 5px 0 5px;
  background-color: #ff7766;
  cursor: pointer;
`;

const ButtonEdit = styled.button`
  margin-left: 5px;
  border: 1px solid ${darken(0.4, theme.panel_background)};
  border-radius: 3px;
  padding: 5px 5px 0 5px;
  cursor: pointer;
`;

const ButtonDone = styled.button`
  margin-left: 5px;
  border: 1px solid ${darken(0.2, "#5ee")};
  border-radius: 3px;
  padding: 5px 5px 0 5px;
  cursor: pointer;
  background-color: #55eeee;
`;

const DateTimeInfo = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(80, 80, 80, 0.75);
  color: ${theme.header_text};
  padding: 4px 12px;
  font-size: 0.66em;
  text-shadow: 1px 1px 2px #000;
`;

interface TaskProps {
  data: Task;
  finished?: boolean;
  removeTask?: (id: number) => void;
  moveToHistory?: (id: number, done: boolean) => void;
  removeHistory?: (id: number) => void;
}

const Task: React.FC<TaskProps> = (props) => {
  const {
    data,
    finished = false,
    removeTask,
    moveToHistory,
    removeHistory,
  } = props;
  const [editOn, setEdit] = useState<boolean>(false);

  const displayDate = (date: string) => {
    return `${new Date(date).getDate().toString().padStart(2, "0")}/${(
      new Date(date).getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${new Date(date)
      .getFullYear()
      .toString()
      .padStart(4, "0")} ${new Date(date).getHours().toString()}:${new Date(
      date
    )
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  if (!finished) {
    return (
      <TaskFuture data={data} data-testid="task-name">
        {data.name}
        <ButtonGroup>
          <ButtonDone
            onClick={() => moveToHistory!(data.id, true)}
            data-testid="done-button"
          >
            <MdDone size={20} />
          </ButtonDone>
          <ButtonEdit onClick={() => setEdit(true)} data-testid="edit-button">
            <AiFillEdit size={20} />
          </ButtonEdit>
          <ButtonDelete
            onClick={() => removeTask!(data.id)}
            data-testid="delete-button"
          >
            <AiFillDelete size={20} />
          </ButtonDelete>
        </ButtonGroup>
        <DateTimeInfo>
          <b>To do before:</b> {displayDate(data.date)}
        </DateTimeInfo>
        {editOn && (
          <AddTaskModal editMode task={data} onCancel={() => setEdit(false)} />
        )}
      </TaskFuture>
    );
  }
  return (
    <TaskFinished data-testid="task-name">
      {data.name}
      <ButtonGroup>
        <ButtonDelete
          onClick={() => removeHistory!(data.id)}
          data-testid="delete-button"
        >
          <AiFillDelete size={20} />
        </ButtonDelete>
      </ButtonGroup>
      <DateTimeInfo>
        <b>Finished at</b> {displayDate(data.date)}
      </DateTimeInfo>
    </TaskFinished>
  );
};

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; payload: number }) => any
) => ({
  removeTask: (id: number) => dispatch(removeTaskAction(id)),
  moveToHistory: (id: number) => dispatch(moveToHistoryAction(id)),
  removeHistory: (id: number) => dispatch(removeHistoryAction(id)),
});

export default connect(null, mapDispatchToProps)(Task);
