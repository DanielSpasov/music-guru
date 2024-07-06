import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FC } from 'react';

import { SVGProps } from '../SVG/helpers';
import { styles } from './styles';
import Link from '.';

const MockedIcon: FC<SVGProps> = props => <div {...props}>test</div>;

describe('Link', () => {
  test('renders link without crashing', () => {
    render(
      <MemoryRouter>
        <Link type="link" to="/test-route">
          Test Label
        </Link>
      </MemoryRouter>
    );

    const linkEl = screen.getByTestId('link');

    expect(linkEl).toBeInTheDocument();
    expect(linkEl.textContent).toEqual('Test Label');
    expect(linkEl).toHaveAttribute('href', '/test-route');
  });

  test('renders link with additional props', () => {
    render(
      <MemoryRouter>
        <Link
          type="link"
          to="/test-route"
          className="bg-neutral-50"
          data-testid="custom-link-data-testid"
        >
          Test Label
        </Link>
      </MemoryRouter>
    );
    const linkEl = screen.getByTestId('custom-link-data-testid');

    expect(linkEl).toBeInTheDocument();
    expect(linkEl).toHaveClass('bg-neutral-50');
  });
});

describe('NavLink', () => {
  test('renders navlink without crashing', () => {
    render(
      <MemoryRouter>
        <Link type="navlink" to="/test-route">
          Test Navlink Label
        </Link>
      </MemoryRouter>
    );

    const linkEl = screen.getByTestId('navlink');

    expect(linkEl).toBeInTheDocument();
    expect(linkEl.textContent).toEqual('Test Navlink Label');
    expect(linkEl).toHaveAttribute('href', '/test-route');
    expect(linkEl).toHaveClass(styles.navlink.defaultProps);
    expect(linkEl).not.toHaveClass(styles.navlink.activeProps);
  });

  test('renders navlink with additional props', () => {
    const customClass = 'fill-black';
    render(
      <MemoryRouter>
        <Link
          type="navlink"
          to="/test-route"
          isActive
          data-testid="custom-navlink-data-testid"
          className={customClass}
        >
          Test Navlink Label
        </Link>
      </MemoryRouter>
    );

    const linkEl = screen.getByTestId('custom-navlink-data-testid');

    expect(linkEl).toBeInTheDocument();
    expect(linkEl).not.toHaveClass(styles.navlink.defaultProps);
    expect(linkEl).toHaveClass(styles.navlink.activeProps);
    expect(linkEl).toHaveClass(customClass);
  });
});

describe('Dropdown Link', () => {
  test('renders dropdown link without crashing', () => {
    render(
      <MemoryRouter>
        <Link type="dropdown-link" to="/some-page" Icon={MockedIcon}>
          Test Dropdown Link Label
        </Link>
      </MemoryRouter>
    );

    const linkEl = screen.getByTestId('dropdown-link');
    expect(linkEl).toBeInTheDocument();
    expect(linkEl).toHaveAttribute('href', '/some-page');

    const linkLabelEl = screen.getByTestId('dropdown-link-label');
    expect(linkLabelEl.textContent).toEqual('Test Dropdown Link Label');
    expect(linkLabelEl).not.toHaveClass(
      styles['dropdown-link'].activeLabelProps
    );

    const linkIconEl = screen.getByTestId('dropdown-link-icon');
    expect(linkIconEl).toBeInTheDocument();
  });

  test('renders dropdown link with additional props', () => {
    const dataTestId = 'custom-dropdown-link-data-testid';
    const customClassName = 'fill-green-500';
    render(
      <MemoryRouter>
        <Link
          type="dropdown-link"
          to="/some-page"
          isActive
          Icon={MockedIcon}
          data-testid={dataTestId}
          className={customClassName}
        >
          Test Dropdown Link Label
        </Link>
      </MemoryRouter>
    );

    const linkEl = screen.getByTestId(dataTestId);
    expect(linkEl).toBeInTheDocument();
    expect(linkEl).toHaveClass(customClassName);

    const linkLabelEl = screen.getByTestId(`${dataTestId}-label`);
    expect(linkLabelEl).toBeInTheDocument();
    expect(linkLabelEl).toHaveClass(styles['dropdown-link'].activeLabelProps);

    const linkIconEl = screen.getByTestId(`${dataTestId}-icon`);
    expect(linkIconEl).toBeInTheDocument();
  });

  test("doesn't render dropdown link if hide is true", () => {
    render(
      <MemoryRouter>
        <Link type="dropdown-link" to="/some-page" Icon={MockedIcon} hide>
          Test Dropdown Link Label
        </Link>
      </MemoryRouter>
    );

    const linkEl = screen.queryByTestId('dropdown-link');
    expect(linkEl).not.toBeInTheDocument();
  });
});
