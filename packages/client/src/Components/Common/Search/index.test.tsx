import { fireEvent, render, screen } from '@testing-library/react';

import Search from '.';

describe('Search', () => {
  test('renders without crashing', () => {
    render(<Search setValue={vi.fn()} />);

    const searchEl = screen.getByTestId('search-box');
    expect(searchEl).toBeInTheDocument();

    const inputEl = screen.getByTestId('search-input');
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute('placeholder', 'Search...');
  });

  test('calls setValue with correct value', () => {
    const setValue = vi.fn();
    render(<Search setValue={setValue} />);

    const inputEl = screen.getByTestId('search-input');
    fireEvent.change(inputEl, { target: { value: 'test' } });
    expect(setValue).toBeCalledWith('test');
  });

  test('renders custom placeholder if provided', () => {
    const testPalceholder = 'testvalue';
    render(<Search setValue={vi.fn()} placeholder={testPalceholder} />);

    const inputEl = screen.getByTestId('search-input');
    expect(inputEl).toHaveAttribute('placeholder', testPalceholder);
  });
});
