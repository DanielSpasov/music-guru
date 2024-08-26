import { render, screen } from '@testing-library/react';

import Button from './index';

describe('Button', () => {
  test('renders without crashing', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toContainHTML('Click me');
  });

  test('renders with custom data-testid', () => {
    render(<Button data-testid="custom-data-testid">Click me</Button>);

    const noButtonEl = screen.queryByTestId('button');
    expect(noButtonEl).not.toBeInTheDocument();

    const buttonEl = screen.getByTestId('custom-data-testid');
    expect(buttonEl).toBeInTheDocument();
  });
});
