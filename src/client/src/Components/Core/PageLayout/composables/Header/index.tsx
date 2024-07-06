import { FC, memo } from 'react';

import { Button } from '../../../../Common';
import { HeaderProps } from './types';

const Header: FC<HeaderProps> = ({ heading, actions = [] }) => {
  return (
    <header
      data-testid="header"
      className="relative flex justify-between items-center h-16 border-b-[1px] dark:border-b-neutral-700"
    >
      {heading && (
        <h1 className="pl-4" data-testid="header-heading">
          {heading}
        </h1>
      )}

      <section
        data-testid="header-actions"
        className="flex items-center h-full gap-3 pr-4"
      >
        {actions
          .filter(x => !x?.hidden)
          .map((action, i) => {
            switch (action.type) {
              case 'button':
                return (
                  <Button
                    key={i}
                    data-testid={`header-actions-${i}`}
                    onClick={action.onClick}
                    variant={action.variant}
                    disabled={action?.disabled}
                  >
                    {action.children}
                  </Button>
                );
              default:
                return (
                  <action.Icon
                    key={i}
                    data-testid={`header-actions-${i}`}
                    disabled={action?.disabled}
                    onClick={action.onClick}
                  />
                );
            }
          })}
      </section>
    </header>
  );
};

export default memo(Header);
