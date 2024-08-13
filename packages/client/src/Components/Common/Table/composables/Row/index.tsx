import { memo, useCallback, useState } from 'react';

import { BaseModel } from '../../../../../Types';
import Loader from '../../../../Core/Loader';
import { TableAction } from '../../types';
import { RowProps } from './types';

// Composables
import Data from '../Data';

const Row = <T extends BaseModel>({
  cols,
  item,
  index,
  actions = []
}: RowProps<T>) => {
  const [loading, setLoading] = useState(false);

  const onActionClick = useCallback(
    async (action: TableAction<T>, uid: string) => {
      try {
        setLoading(true);
        await action.onClick(uid);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <tr className="relative border-b-[1px] border-neutral-200 dark:border-neutral-700">
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
          actions={actions.map(ac => ({
            ...ac,
            onClick: uid => onActionClick(ac, uid),
            disableFn: item => loading || Boolean(ac?.disableFn?.(item))
          }))}
        />
      ) : null}

      {loading && (
        <td>
          <Loader type="spinner" className="absolute m-auto inset-0" />
        </td>
      )}
    </tr>
  );
};

export default memo(Row) as typeof Row;
