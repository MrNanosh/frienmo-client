import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import RegistrationForm from "./RegistrationForm";

describe(`RegistrationForm Component`, () => {
  it("renders without errors", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});