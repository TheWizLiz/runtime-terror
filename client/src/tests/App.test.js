import { render, screen } from '@testing-library/react';
import TestRenderer from 'react-test-renderer'
import App from '../App.js';
import Login from '../components/account/Login.js'

test('Renders Home Text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
