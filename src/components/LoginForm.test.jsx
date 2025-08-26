import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";

test("renders login form", () => {
  render(<LoginForm onLogin={jest.fn()} onRegister={jest.fn()} />);
});

