import { NavLink, Link } from 'react-router-dom';

import { LinkProps } from './helpers';

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
      className={`text-lg py-4 px-2 duration-200 ${
        isActive ? 'text-primary' : 'text-white'
      } hover:text-primary ${className}`}
    >
      {children}
    </NavLink>
  ) : (
    <Link
      to={to}
      className={`text-lg duration-200 hover:text-primary ${className}`}
    >
      {children}
    </Link>
  );
}
