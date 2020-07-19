import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../../reducer";

interface WrapperProps {
  children?: React.ReactElement;
  ui?: React.ReactElement;
}

const render = (
  ui: any,
  {
    initialState,
    store = createStore(rootReducer),
    ...renderOptions
  } = {} as any
) => {
  const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";

export { render };
