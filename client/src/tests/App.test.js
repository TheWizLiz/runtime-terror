import { render, screen } from '@testing-library/react';
import App from '../App.js';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('xx', () => {
  render(<App />);
  const linkElement = screen.getByText(/xx/i);
  expect(linkElement).toBeInTheDocument();
});

test('yy', () => {
  render(<App />);
  const linkElement = screen.getByText(/yy/i);
  expect(linkElement).toBeInTheDocument();
});
