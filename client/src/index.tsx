import React from "react";
import ReactDOM from "react-dom";
import Root from "./views/Root";
import GlobalStyle from "./style";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root />
        <GlobalStyle />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
