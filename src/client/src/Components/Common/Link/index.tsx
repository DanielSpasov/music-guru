import { NavLink, Link } from 'react-router-dom';
import { FC } from 'react';

import { LinkProps, activeProps, hoverProps, themeProps } from './helpers';

const CustomLink: FC<LinkProps> = ({
  children,
  to = '/',
  type = 'link',
  className,
  isActive
}) => {
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
    <Link
      to={to}
      data-testid="link"
      className={`text-lg ${hoverProps} ${className}`}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
