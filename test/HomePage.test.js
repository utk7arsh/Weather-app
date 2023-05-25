import { render, screen } from '@testing-library/react';
import HomePage from '../pages/index';
/* eslint-env jest */
/* eslint-disable react/jsx-filename-extension */
describe('HomePage', () => {
  it('renders the title', () => {
    render(<HomePage />);

    const title = screen.getByText(/Weather App/i);
    expect(title).toBeInTheDocument();
  });

  it('renders the input field', () => {
    render(<HomePage />);

    const inputField = screen.getByPlaceholderText(/Enter city name.../i);
    expect(inputField).toBeInTheDocument();
  });
});
