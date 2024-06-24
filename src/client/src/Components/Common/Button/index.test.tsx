import { render, screen } from '@testing-library/react';

import { variants } from './variants';
import Button from './index';

describe('Button', () => {
  describe('Rendering', () => {
    test('renders without crashing', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByTestId('button');
      expect(button).toBeInTheDocument();
    });

    test('renders correct children', () => {
      render(
        <Button>
          <span>Test</span>
        </Button>
      );
      const button = screen.getByTestId('button');
      expect(button).toContainHTML('<span>Test</span>');
    });
  });

  describe('Component props', () => {
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
});
