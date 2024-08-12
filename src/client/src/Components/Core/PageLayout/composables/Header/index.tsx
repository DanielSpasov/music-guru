import { BaseSyntheticEvent, FC, memo, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { Action as IAction } from '../../types';
import { Button } from '../../../../Common';
import { HeaderProps } from './types';
import Loader from '../../../Loader';

const Header: FC<HeaderProps> = ({ heading, actions = [] }) => {
  return (
    <header
      data-testid="header"
      className="relative flex justify-between items-center h-16 border-b-[1px] dark:border-b-neutral-700"
    >
      <h1 className="pl-4" data-testid="header-heading">
        {heading}
      </h1>

      <section
        data-testid="header-actions"
        className="flex items-center h-full gap-3 pr-4"
      >
        {actions
          .filter(x => !x?.hidden)
          .map((action, i) => (
            <Action action={action} key={i} i={i} />
          ))}
      </section>
    </header>
  );
};

export default memo(Header);

const Action: FC<{ action: IAction; i: number }> = ({ action, i }) => {
  const [loading, setLoading] = useState(false);

  const onActionClick = useCallback(
    (onClick: IAction['onClick']) => async (e: BaseSyntheticEvent) => {
      try {
        setLoading(true);
        await onClick(e);
      } catch (err) {
        toast.error('Failed to perform action.');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  if (loading) return <Loader type="spinner" />;

  if (action.type === 'button') {
    return (
      <Button
        data-testid={`header-actions-${i}`}
        onClick={onActionClick(action.onClick)}
        variant={action.variant}
        disabled={action?.disabled}
      >
        {action.children}
      </Button>
    );
  }

  return (
    <action.Icon
      data-testid={`header-actions-${i}`}
      disabled={action?.disabled}
      onClick={onActionClick(action.onClick)}
    />
  );
};
