import { render, screen } from '@testing-library/react';
import TestRenderer from 'react-test-renderer'
import App from '../App.js';
import Login from '../components/Login/Login.js'

// NOT A VERY GOOD TEST...
test('Checking for Login Screen Rendering...', () => {
  const component = TestRenderer.create(<Login />).toJSON()
  expect(component).toMatchSnapshot()
})

test('Renders Home Text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
