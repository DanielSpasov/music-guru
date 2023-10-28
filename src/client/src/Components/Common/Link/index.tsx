import { NavLink, Link } from 'react-router-dom';

import { LinkProps } from './helpers';

export default function CustomLink({
  children,
  to = '/',
  type = 'link',
  className,
  isActive
}: LinkProps) {
  const activeProps = isActive && 'text-primary dark:text-primary-dark';
  const hoverProps = 'hover:text-primary dark:hover:text-primary-dark';

  return type === 'navlink' ? (
    <NavLink
      to={to}
      className={`text-xl py-4 px-2 font-bold ${hoverProps} ${activeProps} ${className}`}
    >
      {children}
    </NavLink>
  ) : (
    <Link to={to} className={`text-lg ${hoverProps} ${className}`}>
      {children}
    </Link>
  );
}
