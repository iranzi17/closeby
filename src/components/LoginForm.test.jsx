import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

jest.mock('../firebase', () => ({ auth: {} }));
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

test('renders login form fields', () => {
  render(<LoginForm />);
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});
