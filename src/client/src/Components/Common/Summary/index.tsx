import { useCallback, useState } from 'react';

import { SummaryProps } from './helpers';
import { Icon } from '../../';

const hoverProps = 'hover:bg-neutral-300';
const darkProps = 'dark:bg-neutral-700 dark:hover:bg-neutral-600';

export default function Summary({
  children,
  label,
  open = false
}: SummaryProps) {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  const toggleSummary = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <div
      className={`w-full bg-neutral-200 rounded-md p-2 ${hoverProps} ${darkProps}`}
    >
      <div
        className="flex items-center py-2 hover:cursor-pointer"
        onClick={toggleSummary}
      >
        <Icon model={isOpen ? 'up' : 'down'} />
        <h4>{label}</h4>
      </div>
      {isOpen && children}
    </div>
  );
}
