import { useEffect, useMemo, useRef } from 'react';

import { PopoverProps } from './helpers';

const darkProps = 'dark:bg-neutral-900 dark:shadow-black';

export default function Popover({
  open,
  label,
  children,
  className
}: PopoverProps) {
  const id = useMemo(() => `popover-${Math.random()}`, []); // TODO: This is tricky, please change

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const box = document.getElementById(id);
    if (!box) return;

    if (open) {
      box.classList.remove('hidden');
      setTimeout(() => {
        box.classList.remove('scale-0');
        box.classList.remove('opacity-0');
      }, 20);
    } else {
      box.classList.add('opacity-0');
      box.classList.add('scale-0');
      box.addEventListener('transitionend', () => box.classList.add('hidden'), {
        capture: false,
        once: true,
        passive: false
      });
    }
  }, [id, open]);

  return (
    <div className="relative">
      {label && <div className="p-2">{label}</div>}
      <div
        id={id}
        className={`absolute bg-neutral-100 right-0 shadow-md p-2 rounded-md opacity-0 hidden scale-0 ${darkProps} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
