import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CustomLink, {
  darkActiveProps,
  darkHoverProps,
  lightActiveProps,
  lightHoverProps
} from './index';

describe('Link', () => {
  describe('Basic Props', () => {
    it('renders link without crashing', () => {
      render(
        <MemoryRouter>
          <CustomLink to="/test-route">Test Label</CustomLink>
        </MemoryRouter>
      );
      const linkElement = screen.getByTestId('link');
      expect(linkElement).toBeInTheDocument();
    });

    it('redirects to correct route', () => {
      render(
        <MemoryRouter>
          <CustomLink to="/test-route">Test Label</CustomLink>
        </MemoryRouter>
      );
      const linkElement = screen.getByTestId('link');
      expect(linkElement).toHaveAttribute('href', '/test-route');
    });

    it('renders correct label', () => {
      render(
        <MemoryRouter>
          <CustomLink to="/test-route">Test Label</CustomLink>
        </MemoryRouter>
      );

      const linkElement = screen.getByTestId('link');
      expect(linkElement.textContent).toEqual('Test Label');
    });

    it('renders link with custom class', () => {
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
});

describe('NavLink', () => {
  describe('Basic Props', () => {
    it('renders navlink without crashing', () => {
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

    it('redirects to correct route', () => {
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

    it('renders correct label', () => {
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

    it('renders navlink with custom class', () => {
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
    it('renders dark mode hover', () => {
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

    it('renders light mode hover', () => {
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

    it('renders dark mode active class', () => {
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

    it('renders light mode active class', () => {
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

    it("doesn't render darm active class", () => {
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

    it("doesn't render light active class", () => {
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
