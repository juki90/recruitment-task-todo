import React, { useState } from "react";
import { theme } from "../theme";
import styled from "styled-components";
import Container from "../templates/Container";
import { lighten } from "polished";
import Task from "./../components/Task";
import AddTaskModal from "../components/AddTaskModal";
import { connect } from "react-redux";
import { removeTask as removeTaskAction } from "../actions";

const DashboardPanel = styled.div`
  min-height: calc(100vh - 85px);
  background-color: ${theme.panel_background};
  box-shadow: 0 0 25px 0 ${lighten(0.5, theme.header_background)};
  padding: 10px;
`;

const HeadingMain = styled.h1`
  font-size: 2.6em;
  text-align: center;
  color: ${theme.panel_text};
`;

const HeadingSecondary = styled.h2`
  font-size: 1.6em;
  text-align: center;
  color: ${theme.panel_text};
`;

const AddNew = styled.button`
  display: block;
  font-size: 1.25em;
  background-color: ${theme.header_background};
  margin: 0 auto;
  color: ${theme.header_text};
  padding: 5px 20px;
  text-shadow: 0 0 1px #000;
  border: 2px solid ${theme.header_text};
  box-shadow: 1px 1px 5px 0 ${lighten(0.25, theme.header_background)};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${lighten(0.2, theme.header_background)};
  }
`;

interface DashboardProps {
  scheduled: Task[];
  done: Task[];
  loggedAs: string;
  removeTask: (id: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  scheduled,
  done,
  loggedAs,
  removeTask,
}) => {
  const [addNew, setAddNew] = useState<boolean>(false);
  const preFilteredTasks = scheduled.filter((t) => {
    if (new Date().getTime() >= new Date(t.date).getTime()) {
      removeTask(t.id);
      return false;
    }
    return true;
  });
  const scheduledTasks = preFilteredTasks.map((t) => (
    <Task key={`tf-${t.id}`} data={t} />
  ));
  const doneTasks = done.map((t) => (
    <Task key={`td-${t.id}`} data={t} finished />
  ));
  return (
    <Container>
      <DashboardPanel>
        <HeadingMain>DASHBOARD</HeadingMain>
        {loggedAs && (
          <HeadingSecondary style={{ color: "#0cc" }}>
            Hello! You are logged in as {loggedAs}
          </HeadingSecondary>
        )}
        <HeadingSecondary>Add a new task to your list: </HeadingSecondary>
        <AddNew onClick={() => setAddNew(true)}>Add Task</AddNew>
        <HeadingSecondary>List of future tasks: </HeadingSecondary>
        <p style={{ textAlign: "center" }}>
          Please, note that tasks not marked as finished before finish time will
          be removed.
        </p>
        {preFilteredTasks.length > 0 ? (
          scheduledTasks
        ) : (
          <p style={{ textAlign: "center" }}>No tasks at the moment</p>
        )}
        <HeadingSecondary>List of finished tasks: </HeadingSecondary>
        {done.length > 0 ? (
          doneTasks
        ) : (
          <p style={{ textAlign: "center" }}>No tasks at the moment</p>
        )}
      </DashboardPanel>
      {addNew && <AddTaskModal onCancel={() => setAddNew(false)} />}
    </Container>
  );
};

const mapStateToProps = (state: {
  scheduled: Task[];
  done: Task[];
  loggedAs: string;
}) => {
  const { scheduled, done, loggedAs } = state;
  return {
    scheduled,
    done,
    loggedAs,
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; payload: number }) => any
) => ({
  removeTask: (id: number) => dispatch(removeTaskAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
