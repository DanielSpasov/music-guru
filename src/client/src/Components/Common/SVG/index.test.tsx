import { render, screen, fireEvent, act } from '@testing-library/react';

import {
  darkProps,
  lightProps,
  darkHoverProps,
  lightHoverProps,
  disabledProps
} from './helpers';
import SVG from './index';

describe('SVG component', () => {
  describe('Rendering', () => {
    test('renders SVG without crashing', () => {
      render(<SVG />);
      const svgElement = screen.getByTestId('svg-icon');
      expect(svgElement).toBeInTheDocument();
    });

    test('renders correct children', () => {
      render(
        <SVG>
          <path d="M10 10" />
        </SVG>
      );
      const svgElement = screen.getByTestId('svg-icon');
      expect(svgElement).toContainHTML('<path d="M10 10" />');
    });
  });

  describe('Component props', () => {
    test('renders SVG with custom class', () => {
      const className = 'bg-neutral-50';
      render(<SVG className={className} />);
      const svgElement = screen.getByTestId('svg-icon');
      expect(svgElement).toHaveClass(className);
    });

    test('renders SVG with custom viewBox', () => {
      const viewBox = '0 0 24 24';
      render(<SVG viewBox={viewBox} />);
      const svgElement = screen.getByTestId('svg-icon');
      expect(svgElement).toHaveAttribute('viewBox', viewBox);
    });

    test('calls onClick function when SVG element is clicked', async () => {
      const onClick = vi.fn();
      render(<SVG onClick={onClick} />);
      const svgElement = screen.getByTestId('svg-icon');
      await act(async () => fireEvent.click(svgElement));
      expect(onClick).toBeCalled();
    });

    test("doesn't call onClick function when SVG element is disabled and clicked", async () => {
      const onClick = vi.fn();
      render(<SVG onClick={onClick} disabled />);
      const svgElement = screen.getByTestId('svg-icon');
      await act(async () => fireEvent.click(svgElement));
      expect(onClick).not.toBeCalled();
    });
  });

  describe('CSS', () => {
    test('renders dark mode', () => {
      render(<SVG />);
      const svgElement = screen.getByTestId('svg-icon');
      expect(svgElement).toHaveClass(darkProps);
    });

    test('renders light mode', () => {
      render(<SVG />);
      const svgElement = screen.getByTestId('svg-icon');
      expect(svgElement).toHaveClass(lightProps);
    });

    test('renders dark mode hover', () => {
      render(<SVG onClick={() => null} />);
      const svgElement = screen.getByTestId('svg-icon');
      expect(svgElement).toHaveClass(darkHoverProps);
    });

    test('renders light mode hover', () => {
      render(<SVG onClick={() => null} />);
      const svgElement = screen.getByTestId('svg-icon');
      expect(svgElement).toHaveClass(lightHoverProps);
    });

    test('renders disabled mode', () => {
      render(<SVG onClick={() => null} disabled />);
      const svgElement = screen.getByTestId('svg-icon');
      expect(svgElement).toHaveClass(disabledProps);
    });
  });
});
