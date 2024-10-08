import { FC, useState } from 'react';

import { DetailsProps } from './types';
import { IDown, IUp } from '../..';

const Details: FC<DetailsProps> = ({ children, label, open = false }) => {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <details
      className={`w-full bg-neutral-200 rounded-md p-2 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600`}
      data-testid="details"
      open={open}
    >
      <summary
        className="flex text-lg font-semibold items-center py-2 hover:cursor-pointer"
        onClick={() => setIsOpen(prev => !prev)}
        data-testid="details-summary"
      >
        {isOpen ? (
          <IUp data-testid="details-up-icon" />
        ) : (
          <IDown data-testid="details-down-icon" />
        )}
        {label}
      </summary>

      <section data-testid="details-content">{isOpen && children}</section>
    </details>
  );
};

export default Details;
