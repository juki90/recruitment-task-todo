import React from "react";
import ModalInfo from "../components/ModalInfo";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const message = "Connection broken";

describe("Modal info component rendering tests", () => {
  it("Renders same title all the time", () => {
    render(<ModalInfo onClose={() => {}} message={message} />);
    expect(screen.getByText("Error making request")).toBeInTheDocument();
  });
  it("Renders button with 'Close' label", () => {
    render(<ModalInfo onClose={() => {}} message={message} />);
    expect(screen.getByText("Close")).toBeInTheDocument();
  });
  it("Renders given message", () => {
    render(<ModalInfo onClose={() => {}} message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
