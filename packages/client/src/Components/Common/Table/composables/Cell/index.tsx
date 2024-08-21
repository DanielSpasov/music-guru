import { memo, useMemo } from 'react';
import moment from 'moment';

import { BaseModel } from '../../../../../Types';
import { ICheck, IX } from '../../../..';
import { CellProps } from './types';

import css from './index.module.css';

// Composables
import Action from '../Action';

const Cell = <T extends BaseModel>({
  col,
  item,
  loading,
  actions,
  rowIndex,
  index
}: CellProps<T>) => {
  const Data = useMemo(() => {
    switch (col.type) {
      case 'actions':
        return (
          <div className={css.actionCell} data-testid="actions-cell">
            {actions?.map((action, i) => (
              <Action<T> {...action} type="row" item={item} key={i} />
            ))}
          </div>
        );

      case 'boolean':
        return item[col.key] ? (
          <ICheck className={css.checkIcon} data-testid="boolean-true-cell" />
        ) : (
          <IX className={css.xIcon} data-testid="boolean-false-cell" />
        );

      case 'date':
        return moment(item[col.key]?.toString()).format('ddd MMM DD YYYY');

      default:
        return item[col.key]?.toString();
    }
  }, [col, item, actions]);

  return (
    <td
      className={`p-2 ${loading ? 'opacity-50' : 'opacity-100'}`}
      data-testid={`row-${rowIndex}-cell-${index}`}
    >
      {Data}
    </td>
  );
};

export default memo(Cell) as typeof Cell;
