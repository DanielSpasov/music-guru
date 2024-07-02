import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { activeIconProps, activeLabelProps } from '../styles';
import DropdownLink from '.';

const MockIcon = ({ className }: { className: string }) => (
  <div data-testid="dropdown-link-icon" className={className}>
    Mock Icon
  </div>
);

describe('DropdownLink', () => {
  test('renders without crashing', () => {
    const label = 'Test Label';
    const to = '/me';

    render(
      <MemoryRouter>
        <DropdownLink Icon={MockIcon} label={label} to={to} />
      </MemoryRouter>
    );
    const linkEl = screen.getByTestId('dropdown-link');
    const iconEl = screen.getByTestId('dropdown-link-icon');
    const labelEl = screen.getByTestId('dropdown-link-label');

    expect(linkEl).toBeInTheDocument();
    expect(linkEl).toHaveAttribute('href', to);

    expect(iconEl).toBeInTheDocument();

    expect(labelEl).toBeInTheDocument();
    expect(labelEl).toHaveTextContent(label);
  });

  test("doesn't render if hide is true", () => {
    render(
      <MemoryRouter>
        <DropdownLink Icon={MockIcon} label="Test" to="/me" hide />
      </MemoryRouter>
    );
    const element = screen.queryByTestId('dropdown-link');
    expect(element).not.toBeInTheDocument();
  });

  test('renders isActive styles correctly', () => {
    render(
      <MemoryRouter>
        <DropdownLink label="Home" Icon={MockIcon} to="/home" isActive />
      </MemoryRouter>
    );
    const iconEl = screen.getByTestId('dropdown-link-icon');
    const labelEl = screen.getByTestId('dropdown-link-label');

    expect(iconEl).toHaveClass(activeIconProps);
    expect(labelEl).toHaveClass(activeLabelProps);
  });

  test('renders with extra className', () => {
    const className = 'bg-neutral-50';
    render(
      <MemoryRouter>
        <DropdownLink
          label="Home"
          Icon={MockIcon}
          to="/home"
          className={className}
        />
      </MemoryRouter>
    );
    const element = screen.getByTestId('dropdown-link');
    expect(element).toHaveClass(className);
  });
});
