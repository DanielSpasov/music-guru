import { NavLink, Link } from 'react-router-dom';

import { LinkProps } from './helpers';

export const lightHoverProps = 'hover:text-primary';
export const darkHoverProps = 'dark:hover:text-primary-dark';
const hoverProps = `${lightHoverProps} ${darkHoverProps}`;

export const lightActiveProps = 'text-primary';
export const darkActiveProps = 'dark:text-primary-dark';
const activeProps = `${lightActiveProps} ${darkActiveProps}`;

export default function CustomLink({
  children,
  to = '/',
  type = 'link',
  className,
  isActive
}: LinkProps) {
  return type === 'navlink' ? (
    <NavLink
      to={to}
      data-testid="navlink"
      className={`text-xl py-4 px-2 font-bold ${hoverProps} ${
        isActive && activeProps
      } ${className}`}
    >
      {children}
    </NavLink>
  ) : (
    <Link
      to={to}
      data-testid="link"
      className={`text-lg ${hoverProps} ${className}`}
    >
      {children}
    </Link>
  );
}
