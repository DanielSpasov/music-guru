import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import {
  darkActiveProps,
  darkHoverProps,
  lightActiveProps,
  lightHoverProps
} from './helpers';
import CustomLink from '.';

describe('Link', () => {
  describe('Rendering', () => {
    test('renders link without crashing', () => {
      render(
        <MemoryRouter>
          <CustomLink to="/test-route">Test Label</CustomLink>
        </MemoryRouter>
      );
      const linkElement = screen.getByTestId('link');
      expect(linkElement).toBeInTheDocument();
    });
  });

  describe('Component props', () => {
    test('redirects to correct route', () => {
      render(
        <MemoryRouter>
          <CustomLink to="/test-route">Test Label</CustomLink>
        </MemoryRouter>
      );
      const linkElement = screen.getByTestId('link');
      expect(linkElement).toHaveAttribute('href', '/test-route');
    });

    test('renders correct label', () => {
      render(
        <MemoryRouter>
          <CustomLink to="/test-route">Test Label</CustomLink>
        </MemoryRouter>
      );

      const linkElement = screen.getByTestId('link');
      expect(linkElement.textContent).toEqual('Test Label');
    });

    test('renders link with custom class', () => {
      render(
        <MemoryRouter>
          <CustomLink to="/test-route" className="custom-class">
            Test Label
          </CustomLink>
        </MemoryRouter>
      );
      const linkElement = screen.getByTestId('link');
      expect(linkElement).toHaveClass('custom-class');
    });
  });

  describe('CSS', () => {
    test('renders dark mode hover', () => {
      render(
        <MemoryRouter>
          <CustomLink to="/test-route">Test Label</CustomLink>
        </MemoryRouter>
      );
      const linkElement = screen.getByTestId('link');
      expect(linkElement).toHaveClass(darkHoverProps);
    });

    test('renders light mode hover', () => {
      render(
        <MemoryRouter>
          <CustomLink to="/test-route">Test Label</CustomLink>
        </MemoryRouter>
      );
      const linkElement = screen.getByTestId('link');
      expect(linkElement).toHaveClass(lightHoverProps);
    });
  });
});

describe('NavLink', () => {
  describe('Rendering', () => {
    test('renders navlink without crashing', () => {
      render(
        <MemoryRouter>
          <CustomLink to="/test-route" type="navlink">
            Test Label
          </CustomLink>
        </MemoryRouter>
      );
      const linkElement = screen.getByTestId('navlink');
      expect(linkElement).toBeInTheDocument();
    });
  });

  describe('Component Props', () => {
    test('redirects to correct route', () => {
      render(
        <MemoryRouter>
          <CustomLink to="/test-route" type="navlink">
            Test Label
          </CustomLink>
        </MemoryRouter>
      );
      const linkElement = screen.getByTestId('navlink');
      expect(linkElement).toHaveAttribute('href', '/test-route');
    });

    test('renders correct label', () => {
      render(
        <MemoryRouter>
          <CustomLink to="/test-route" type="navlink">
            Test Label
          </CustomLink>
        </MemoryRouter>
      );
      const linkElement = screen.getByTestId('navlink');
      expect(linkElement.textContent).toEqual('Test Label');
    });

    test('renders navlink with custom class', () => {
      render(
        <MemoryRouter>
          <CustomLink to="/test-route" type="navlink" className="custom-class">
            Test Label
          </CustomLink>
        </MemoryRouter>
      );
      const linkElement = screen.getByTestId('navlink');
      expect(linkElement).toHaveClass('custom-class');
    });
  });

  describe('CSS', () => {
    test('renders dark mode hover', () => {
      render(
        <MemoryRouter>
          <CustomLink to="/test-route" type="navlink">
            Test Label
          </CustomLink>
        </MemoryRouter>
      );
      const linkElement = screen.getByTestId('navlink');
      expect(linkElement).toHaveClass(darkHoverProps);
    });

    test('renders light mode hover', () => {
      render(
        <MemoryRouter>
          <CustomLink to="/test-route" type="navlink">
            Test Label
          </CustomLink>
        </MemoryRouter>
      );
      const linkElement = screen.getByTestId('navlink');
      expect(linkElement).toHaveClass(lightHoverProps);
    });

    test('renders dark mode active class', () => {
      render(
        <MemoryRouter>
          <CustomLink to="/test-route" type="navlink" isActive>
            Test Label
          </CustomLink>
        </MemoryRouter>
      );
      const linkElement = screen.getByTestId('navlink');
      expect(linkElement).toHaveClass(darkActiveProps);
    });

    test('renders light mode active class', () => {
      render(
        <MemoryRouter>
          <CustomLink to="/test-route" type="navlink" isActive>
            Test Label
          </CustomLink>
        </MemoryRouter>
      );
      const linkElement = screen.getByTestId('navlink');
      expect(linkElement).toHaveClass(lightActiveProps);
    });

    test("doesn't render darm active class", () => {
      render(
        <MemoryRouter>
          <CustomLink to="/test-route" type="navlink">
            Test Label
          </CustomLink>
        </MemoryRouter>
      );
      const linkElement = screen.getByTestId('navlink');
      expect(linkElement).not.toHaveClass(darkActiveProps);
    });

    test("doesn't render light active class", () => {
      render(
        <MemoryRouter>
          <CustomLink to="/test-route" type="navlink">
            Test Label
          </CustomLink>
        </MemoryRouter>
      );
      const linkElement = screen.getByTestId('navlink');
      expect(linkElement).not.toHaveClass(lightActiveProps);
    });
  });
});
