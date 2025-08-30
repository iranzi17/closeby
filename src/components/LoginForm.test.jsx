import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

test("shows validation messages for invalid submission", async () => {
  const onLogin = jest.fn();
  render(<LoginForm onLogin={onLogin} onRegister={jest.fn()} />);
  await userEvent.type(screen.getByPlaceholderText(/email/i), "invalid");
  await userEvent.type(screen.getByPlaceholderText(/password/i), "123");
  fireEvent.click(screen.getByRole("button", { name: /login/i }));
  expect(await screen.findByText(/invalid email format/i)).toBeInTheDocument();
  expect(
    await screen.findByText(/password must be at least 6 characters/i)
  ).toBeInTheDocument();
  expect(onLogin).not.toHaveBeenCalled();
});

test("shows success message on valid login", async () => {
  const onLogin = jest.fn().mockResolvedValue();
  render(<LoginForm onLogin={onLogin} onRegister={jest.fn()} />);
  await userEvent.type(
    screen.getByPlaceholderText(/email/i),
    "test@example.com"
  );
  await userEvent.type(
    screen.getByPlaceholderText(/password/i),
    "123456"
  );
  fireEvent.click(screen.getByRole("button", { name: /login/i }));
  expect(onLogin).toHaveBeenCalledWith("test@example.com", "123456");
  expect(await screen.findByText(/login successful/i)).toBeInTheDocument();
});

test("shows error message on login failure", async () => {
  const onLogin = jest
    .fn()
    .mockRejectedValue(new Error("Invalid credentials"));
  render(<LoginForm onLogin={onLogin} onRegister={jest.fn()} />);
  await userEvent.type(
    screen.getByPlaceholderText(/email/i),
    "test@example.com"
  );
  await userEvent.type(
    screen.getByPlaceholderText(/password/i),
    "123456"
  );
  fireEvent.click(screen.getByRole("button", { name: /login/i }));
  expect(onLogin).toHaveBeenCalled();
  expect(
    await screen.findByText(/invalid credentials/i)
  ).toBeInTheDocument();
});

