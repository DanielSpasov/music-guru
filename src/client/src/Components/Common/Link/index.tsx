import { NavLink, Link } from 'react-router-dom';
import { FC, useMemo } from 'react';

import { LinkProps, activeProps, hoverProps, themeProps } from './helpers';

const CustomLink: FC<LinkProps> = ({
  children,
  to = '/',
  type = 'link',
  className,
  isActive,
  ...linkProps
}) => {
  const dataTestId = useMemo(
    () => linkProps?.['data-testid'] || type,
    [linkProps, type]
  );

  return type === 'navlink' ? (
    <NavLink
      to={to}
      data-testid={dataTestId}
      className={`text-xl px-4 py-2 m-2 rounded-full ${hoverProps} ${
        isActive ? activeProps : themeProps
      } ${className}`}
      {...linkProps}
    >
      {children}
    </NavLink>
  ) : (
    <Link
      to={to}
      data-testid={dataTestId}
      className={`text-lg ${hoverProps} ${className}`}
      {...linkProps}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
