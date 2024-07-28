import { render, screen } from '@testing-library/react';

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
});
