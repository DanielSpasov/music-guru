import { NavLink, Link } from 'react-router-dom';
import { FC, memo, useMemo } from 'react';

import { DropdownLinkProps, LinkProps, NavlinkProps } from './types';
import { styles } from './styles';

const CustomLink: FC<LinkProps> = ({
  children,
  to = '/',
  type = 'link',
  className,
  ...linkProps
}) => {
  const dataTestId = useMemo(
    () => linkProps?.['data-testid'] || type,
    [linkProps, type]
  );

  if (type === 'navlink') {
    const { isActive = false, ...props } = linkProps as NavlinkProps;
    return (
      <NavLink
        to={to}
        data-testid={dataTestId}
        className={`text-xl px-4 py-2 m-2 rounded-full ${
          styles[type].hoverProps
        } ${
          isActive ? styles[type].activeProps : styles[type].defaultProps
        } ${className}`}
        {...props}
      >
        {children}
      </NavLink>
    );
  }

  if (type === 'dropdown-link') {
    const {
      Icon,
      isActive = false,
      hide = false,
      ...props
    } = linkProps as DropdownLinkProps;

    if (hide) return null;
    return (
      <Link
        to={to}
        data-testid={dataTestId}
        className={`p-1 px-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 ${className}`}
        {...props}
        type="link"
      >
        <div className="flex items-center gap-2">
          <Icon
            data-testid={`${dataTestId}-icon`}
            className={`w-5 h-5 ${
              isActive ? styles[type].activeIconProps : styles[type].iconProps
            }`}
          />
          <span
            className={`${
              isActive && styles[type].activeLabelProps
            } text-lg whitespace-nowrap`}
            data-testid={`${dataTestId}-label`}
          >
            {children}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={to}
      data-testid={dataTestId}
      className={`text-lg ${styles[type].hoverProps} ${className}`}
      {...linkProps}
    >
      {children}
    </Link>
  );
};

export default memo(CustomLink);
