import React from "react";
import { theme } from "../theme";
import styled from "styled-components";
import Header from "../templates/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routes } from "../routes";
import Dashboard from "./Dashboard";
import { lighten } from "polished";
import Login from "./Login";
import Register from "./Register";
import { connect } from "react-redux";
import ModalInfo from "../components/ModalInfo";
import { errorDismiss as errorDismissAction } from "../actions";

const MainContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${theme.body_background};
  background-image: linear-gradient(
    0deg,
    rgba(204, 204, 204, 0) 500px,
    rgba(161, 161, 161, 1) 100%
  );
  box-shadow: 0 65px 50px 0 ${lighten(0.25, theme.header_background)} inset;
  padding-bottom: 15px;
`;

interface RootProps {
  error: string;
  errorDismiss: () => void;
}

const Root: React.FC<RootProps> = ({ error, errorDismiss }) => {
  return (
    <MainContainer>
      <Header />
      <Router>
        <Switch>
          <Route exact path={routes.home}>
            <Dashboard />
          </Route>
          <Route exact path={routes.login}>
            <Login />
          </Route>
          <Route exact path={routes.register}>
            <Register />
          </Route>
        </Switch>
      </Router>
      {error && <ModalInfo onClose={errorDismiss} message={error} />}
    </MainContainer>
  );
};

const mapStateToProps = (state: { error: string }) => {
  const { error } = state;
  return {
    error,
  };
};

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  errorDismiss: () => dispatch(errorDismissAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
