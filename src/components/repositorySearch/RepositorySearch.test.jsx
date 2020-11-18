import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

test('renders search bar', () => {
  render(<App />);
  expect(screen.getByTestId('search-input')).toBeVisible()
});
