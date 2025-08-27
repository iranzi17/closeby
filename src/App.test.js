import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Register button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Register/i);
  expect(buttonElement).toBeInTheDocument();
});
