import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search de GitHub text', () => {
  render(<App />);
  const linkElement = screen.getByText(/search de GitHub/i);
  expect(linkElement).toBeInTheDocument();
});
