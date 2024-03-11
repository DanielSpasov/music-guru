import { NavLink, Link } from 'react-router-dom';

import { LinkProps } from './helpers';

export const lightProps = 'text-neutral-400';
export const darkProps = 'dark:text-white';
const themeProps = `${lightProps} ${darkProps}`;

export const lightHoverProps = 'hover:bg-neutral-200 hover:text-neutral-950';
export const darkHoverProps =
  'dark:hover:bg-neutral-900 dark:hover:text-primary-dark';
const hoverProps = `${lightHoverProps} ${darkHoverProps}`;

export const lightActiveProps = 'text-neutral-950';
export const darkActiveProps = 'dark:text-primary-dark';
const activeProps = `${lightActiveProps} ${darkActiveProps} font-bold`;

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
      className={`text-xl px-4 py-2 m-2 rounded-full ${hoverProps} ${
        isActive ? activeProps : themeProps
      } ${className}`}
    >
      {children}
    </NavLink>
  ) : (
    <Link to={to} data-testid="link" className={`text-lg ${className}`}>
      {children}
    </Link>
  );
}
