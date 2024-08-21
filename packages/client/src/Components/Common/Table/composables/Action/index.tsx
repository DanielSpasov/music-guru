import { memo } from 'react';

import { ActionProps, BulkAction, RowAction } from './types';
import { BaseModel } from '../../../../../Types';
import Button from '../../../Button';

const Action = <T extends BaseModel>({
  Icon,
  label,
  type = 'row',
  ...props
}: ActionProps<T>) => {
  if (type === 'bulk') {
    const { disabled, onClick } = props as BulkAction;
    return (
      <Button
        disabled={disabled}
        onClick={() => onClick()}
        variant="outline"
        data-testid="table-bulk-action"
      >
        <Icon className="w-6 h-6" />
        {label}
      </Button>
    );
  }

  const { disableFn, onClick, item } = props as RowAction<T>;
  return (
    <Button
      disabled={Boolean(disableFn?.(item))}
      onClick={() => onClick(item.uid)}
      variant="outline"
      data-testid="table-row-action"
    >
      <Icon className="w-6 h-6" />
      {label}
    </Button>
  );
};

export default memo(Action) as typeof Action;
