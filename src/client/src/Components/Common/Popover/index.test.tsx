import { render, screen } from '@testing-library/react';

import { darkProps, lightProps } from './helpers';
import Popover from '.';

describe('Popover', () => {
  describe('Rendering', () => {
    test('renders popover component without crashing', () => {
      render(<Popover open={false} />);
      const element = screen.getByTestId('popover');
      expect(element).toBeInTheDocument();
    });

    test('renders correct children', () => {
      render(
        <Popover open={true} label="Test Label">
          <span>test child</span>
        </Popover>
      );
      const element = screen.getByTestId('popover-content');
      expect(element).toContainHTML('<span>test child</span>');
    });
  });

  describe('Component props', () => {
    test("doesn't render popover content if open is false", () => {
      render(<Popover open={false} />);
      const element = screen.queryByTestId('popover-content');
      expect(element).not.toBeInTheDocument();
    });

    test('renders popover content if open is true', () => {
      render(<Popover open={true} />);
      const element = screen.queryByTestId('popover-content');
      expect(element).toBeInTheDocument();
    });

    test("doesn't render popover label if label is not passed", () => {
      render(<Popover open={true} />);
      const element = screen.queryByTestId('popover-label');
      expect(element).not.toBeInTheDocument();
    });

    test('renders popover label if label is passed', () => {
      render(<Popover open={true} label="Test Label" />);
      const element = screen.queryByTestId('popover-label');
      expect(element).toBeInTheDocument();
    });

    test('renders with custom class name', () => {
      render(<Popover open={true} className="bg-neutral-200" />);
      const element = screen.getByTestId('popover-content');
      expect(element).toHaveClass('bg-neutral-200');
    });
  });

  describe('CSS', () => {
    test('renders light mode props correctly', () => {
      render(<Popover open={true} />);
      const element = screen.getByTestId('popover-content');
      expect(element).toHaveClass(lightProps);
    });

    test('renders dark mode props correctly', () => {
      render(<Popover open={true} />);
      const element = screen.getByTestId('popover-content');
      expect(element).toHaveClass(darkProps);
    });
  });
});
