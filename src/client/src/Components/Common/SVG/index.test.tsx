import { render, screen, fireEvent } from '@testing-library/react';

import {
  darkProps,
  lightProps,
  darkHoverProps,
  lightHoverProps,
  disabledProps
} from './helpers';
import SVG from './index';

describe('SVG component', () => {
  describe('Basic props', () => {
    it('renders SVG without crashing', () => {
      render(<SVG />);
      const svgElement = screen.getByTestId('svg-icon');
      expect(svgElement).toBeInTheDocument();
    });

    it('renders SVG with custom class', () => {
      const className = 'bg-neutral-50';
      render(<SVG className={className} />);
      const svgElement = screen.getByTestId('svg-icon');
      expect(svgElement).toHaveClass(className);
    });

    it('renders SVG with custom viewBox', () => {
      const viewBox = '0 0 24 24';
      render(<SVG viewBox={viewBox} />);
      const svgElement = screen.getByTestId('svg-icon');
      expect(svgElement).toHaveAttribute('viewBox', viewBox);
    });

    it('renders SVG with children', () => {
      const children = <path d="M10 10" />;
      render(<SVG>{children}</SVG>);
      const svgElement = screen.getByTestId('svg-icon');
      expect(svgElement).toContainHTML('<path d="M10 10" />');
    });
  });

  describe('Bussiness logic', () => {
    it('calls onClick function when SVG element is clicked', () => {
      let clickCounter = 0;
      const onClickMock = () => {
        clickCounter++;
      };

      render(<SVG onClick={onClickMock} />);

      const svgElement = screen.getByTestId('svg-icon');
      fireEvent.click(svgElement);

      expect(clickCounter).toBe(1);
    });

    it("doesn't call onClick function when SVG element is disabled and clicked", () => {
      let clickCounter = 0;
      const onClickMock = () => {
        clickCounter++;
      };

      render(<SVG onClick={onClickMock} disabled />);

      const svgElement = screen.getByTestId('svg-icon');
      fireEvent.click(svgElement);

      expect(clickCounter).toBe(0);
    });
  });

  describe('CSS', () => {
    it('renders dark mode', () => {
      render(<SVG />);
      const svgElement = screen.getByTestId('svg-icon');
      expect(svgElement).toHaveClass(darkProps);
    });

    it('renders light mode', () => {
      render(<SVG />);
      const svgElement = screen.getByTestId('svg-icon');
      expect(svgElement).toHaveClass(lightProps);
    });

    it('renders dark mode hover', () => {
      render(<SVG onClick={() => null} />);
      const svgElement = screen.getByTestId('svg-icon');
      expect(svgElement).toHaveClass(darkHoverProps);
    });

    it('renders light mode hover', () => {
      render(<SVG onClick={() => null} />);
      const svgElement = screen.getByTestId('svg-icon');
      expect(svgElement).toHaveClass(lightHoverProps);
    });

    it('renders disabled mode', () => {
      render(<SVG onClick={() => null} disabled />);
      const svgElement = screen.getByTestId('svg-icon');
      expect(svgElement).toHaveClass(disabledProps);
    });
  });
});
