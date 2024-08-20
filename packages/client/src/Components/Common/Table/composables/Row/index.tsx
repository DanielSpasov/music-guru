import { memo, useCallback, useMemo, useState } from 'react';

import { ICheck } from '../../../../Icons/ICheck';
import { BaseModel } from '../../../../../Types';
import Loader from '../../../../Core/Loader';
import { TableRowAction } from '../../types';
import { RowProps } from './types';

import css from './index.module.css';

// Composables
import Cell from '../Cell';

const Row = <T extends BaseModel>({
  cols,
  item,
  index,
  actions = [],
  bulkActions = [],
  isSelected,
  bulkLoading,
  setSelected
}: RowProps<T>) => {
  const [loadingRow, setLoadingRow] = useState(false);

  const onActionClick = useCallback(
    async (action: TableRowAction<T>, uid: string) => {
      try {
        setLoadingRow(true);
        await action.onClick(uid);
      } finally {
        setLoadingRow(false);
      }
    },
    []
  );

  const onCheckboxClick = useCallback(() => {
    if (isSelected) {
      setSelected(prev => prev.filter(uid => uid !== item.uid));
      return;
    }
    setSelected(prev => [...prev, item.uid]);
  }, [isSelected, item.uid, setSelected]);

  const loading = useMemo(
    () => loadingRow || bulkLoading,
    [loadingRow, bulkLoading]
  );

  return (
    <tr className={css.row} data-testid={`row-${index}`}>
      {bulkActions.length ? (
        <td
          onClick={() => onCheckboxClick()}
          className={css.checkboxCell}
          data-testid={`row-${index}-checkbox`}
        >
          <div
            className={`${css.checkbox} ${
              isSelected ? css.selectedCheckbox : ''
            }`}
          >
            {isSelected ? (
              <ICheck
                className={css.checkIcon}
                data-testid={`row-${index}-checkbox-check`}
              />
            ) : null}
          </div>
        </td>
      ) : null}

      {cols.map((col, i) => (
        <Cell<T>
          key={`row-${index}-col-${i}`}
          col={col}
          index={i}
          item={item}
          rowIndex={index}
          loading={loading}
        />
      ))}

      {actions.length ? (
        <Cell<T>
          key={`row-${index}-col-${cols.length + 1}`}
          col={{ key: 'actions', type: 'actions' }}
          item={item}
          rowIndex={index}
          index={cols.length}
          loading={loading}
          actions={actions.map(ac => ({
            ...ac,
            onClick: uid => onActionClick(ac, uid),
            disableFn: item =>
              isSelected || loading || Boolean(ac?.disableFn?.(item))
          }))}
        />
      ) : null}

      {loading && (
        <td>
          <Loader
            type="spinner"
            className={css.loader}
            data-testid={`row-${index}-loader`}
          />
        </td>
      )}
    </tr>
  );
};

export default memo(Row) as typeof Row;
