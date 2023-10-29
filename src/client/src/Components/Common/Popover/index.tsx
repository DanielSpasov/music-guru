import { PopoverProps } from './helpers';

const darkProps = 'dark:bg-neutral-900 dark:shadow-black';

export default function Popover({
  open,
  label,
  children,
  className
}: PopoverProps) {
  return (
    <div className="relative z-50">
      {label && <div className="p-2">{label}</div>}
      {open && (
        <div
          className={`absolute bg-neutral-100 right-0 shadow-md p-2 rounded-md ${darkProps} ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
