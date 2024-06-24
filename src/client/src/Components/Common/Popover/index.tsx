import { FC } from 'react';

import { PopoverProps, themeProps } from './helpers';

const Popover: FC<PopoverProps> = ({ open, label, children, className }) => {
  return (
    <div className="relative z-50" data-testid="popover">
      {label && (
        <div className="p-2" data-testid="popover-label">
          {label}
        </div>
      )}
      {open && (
        <div
          className={`absolute right-0 shadow-md p-2 rounded-md ${themeProps} ${className}`}
          data-testid="popover-content"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;
