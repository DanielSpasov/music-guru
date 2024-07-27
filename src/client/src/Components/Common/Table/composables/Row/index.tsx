import { memo } from 'react';

import { BaseModel } from '../../../../../Types';
import { RowProps } from './types';

// Composables
import Data from '../Data';

const Row = <T extends BaseModel>({
  cols,
  item,
  index,
  loading,
  actions = []
}: RowProps<T>) => {
  return (
    <tr
      className={
        index % 2
          ? `bg-neutral-200 dark:bg-neutral-900 ${
              loading ? 'animate-pulse' : ''
            }`
          : ''
      }
    >
      {cols.map((col, i) => (
        <Data<T>
          key={`row-${index}-col-${i}`}
          col={col}
          item={item}
          loading={loading}
        />
      ))}

      {actions.length ? (
        <Data<T>
          key={`row-${index}-col-${cols.length + 1}`}
          col={{ key: 'actions', type: 'actions' }}
          item={item}
          loading={loading}
          actions={actions}
        />
      ) : null}
    </tr>
  );
};

export default memo(Row) as typeof Row;
