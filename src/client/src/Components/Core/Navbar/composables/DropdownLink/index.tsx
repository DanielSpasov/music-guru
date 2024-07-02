import { FC, memo, useMemo } from 'react';

import { activeIconProps, activeLabelProps, iconProps } from '../styles';
import { DropdownLinkProps } from '../types';
import { Link } from '../../../../Common';

const DropdownLink: FC<DropdownLinkProps> = ({
  isActive = false,
  hide = false,
  className,
  label,
  Icon,
  to,
  ...props
}) => {
  const dataTestId = useMemo(
    () => props?.['data-testid'] || 'dropdown-link',
    [props]
  );

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
        <Icon className={`w-5 h-5 ${isActive ? activeIconProps : iconProps}`} />
        <span
          className={`${isActive && activeLabelProps} whitespace-nowrap`}
          data-testid={`${dataTestId}-label`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

export default memo(DropdownLink);
