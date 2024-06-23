import { PopoverProps } from './helpers';

export const lightProps = 'bg-neutral-100';
export const darkProps = 'dark:bg-neutral-900 dark:shadow-black';
export const themeProps = `${lightProps} ${darkProps}`;

export default function Popover({
  open,
  label,
  children,
  className
}: PopoverProps) {
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
}
