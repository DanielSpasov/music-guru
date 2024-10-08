import { FC } from 'react';

import { PopoverProps } from './types';

const Popover: FC<PopoverProps> = ({ open, label, children, className, z }) => {
  return (
    <div className={`relative ${z ?? 'z-50'}`} data-testid="popover">
      {label && <div data-testid="popover-label">{label}</div>}
      {open && (
        <div
          className={`absolute right-0 shadow-md p-2 rounded-md bg-neutral-100 dark:bg-neutral-900 dark:shadow-black ${className}`}
          data-testid="popover-content"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;
