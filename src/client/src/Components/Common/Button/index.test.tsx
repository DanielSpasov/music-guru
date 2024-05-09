import { render, screen } from '@testing-library/react';

import { variants } from './variants';
import Button from './index';

describe('Button', () => {
  test('renders without crashing', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
  });

  test('renders default variant', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass(variants.primary);
  });

  test('renders correct variant', () => {
    render(<Button variant="outline">Click me</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass(variants.outline);
  });
});
