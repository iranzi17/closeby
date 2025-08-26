import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import { signInWithEmailAndPassword } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock('../firebase', () => ({ auth: {} }));

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows success message on login', async () => {
    signInWithEmailAndPassword.mockResolvedValue({});
    render(<LoginForm />);
    await userEvent.type(screen.getByPlaceholderText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'password123');
    userEvent.click(screen.getByRole('button', { name: /login/i }));
    const submittingButton = await screen.findByRole('button', { name: /submitting/i });
    expect(submittingButton).toBeDisabled();
    await waitFor(() => {
      expect(screen.getByText(/login successful/i)).toBeInTheDocument();
    });
  });

  test('shows error message on login failure', async () => {
    signInWithEmailAndPassword.mockRejectedValue(new Error('Invalid credentials'));
    render(<LoginForm />);
    await userEvent.type(screen.getByPlaceholderText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'password123');
    userEvent.click(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});
