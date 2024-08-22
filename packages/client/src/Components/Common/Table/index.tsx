import { memo, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { TableBulkAction, TableProps } from './types';
import { useDebounce } from '../../../Hooks';
import { BaseModel } from '../../../Types';
import { ICheck, IDown, IUp } from '../..';
import Loader from '../../Core/Loader';
import Search from '../Search';

import rowCss from './composables/Row/index.module.css';
import css from './index.module.css';

// Composables
import Action from './composables/Action';
import Row from './composables/Row';

const Table = <T extends BaseModel>({
  cols,
  fetchFn,
  // Actions
  actions = [],
  bulkActions = [],
  // Sorting
  allowSorting = [],
  // Search
  searchPlaceholder,
  searchKey = 'name',
  hideSearch = false
}: TableProps<T>) => {
  // Items
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<T[]>([]);

  // Actions
  const [bulkLoading, setBulkLoading] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  // Search
  const [search, setSearch] = useState('');
  const searchValue = useDebounce({ value: search, delay: 500 });

  // Sorting
  const [sorting, setSorting] = useState('-created_at');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const { data } = await fetchFn({
          params: {
            [searchKey]: searchValue,
            sort: sorting
          }
        });
        setItems(data);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data?.message || 'Failed to fetch data.');
          return;
        }
        toast.error('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchFn, searchValue, sorting, searchKey]);

  const SortingIcon = useCallback(
    (key: keyof T) => {
      if (sorting === key) return <IUp className="w-6 h-6" />;

      if (
        sorting.startsWith('-') &&
        key === sorting.substring(1, sorting.length)
      ) {
        return <IDown className="w-6 h-6" />;
      }
    },
    [sorting]
  );

  const onSort = useCallback(
    (key: keyof T) => {
      if (!allowSorting.includes(key)) return;
      setSorting(`${key === sorting ? '-' : ''}${key.toString()}`);
    },
    [allowSorting, sorting]
  );

  const onSelectAll = useCallback(
    (selected: string[]) => {
      if (selected.length !== items.length) {
        setSelected(items.map(x => x.uid));
        return;
      }

      setSelected([]);
    },
    [items]
  );

  const onBulkActionClick = useCallback(
    async (action: TableBulkAction) => {
      try {
        setBulkLoading(selected);

        await action.onClick(selected);
        setSelected([]);
      } catch (err) {
        toast.error('Failed to execute action.');
      } finally {
        setBulkLoading([]);
      }
    },
    [selected]
  );

  return (
    <section data-testid="table-section">
      {!hideSearch && (
        <article data-testid="table-search-box">
          <Search setValue={setSearch} placeholder={searchPlaceholder} />
        </article>
      )}

      {bulkActions.length ? (
        <article
          className={css.bulkActionsBox}
          data-testid="table-bulk-actions"
        >
          {bulkActions.map((action, i) => (
            <Action
              key={i}
              type="bulk"
              disabled={
                !selected.length || Boolean(action?.disableFn?.(selected))
              }
              onClick={() => onBulkActionClick(action)}
              Icon={action.Icon}
              label={action.label}
            />
          ))}
        </article>
      ) : null}

      <table data-testid="table">
        <thead>
          <tr data-testid="table-head">
            {!loading && bulkActions.length ? (
              <th
                data-testid="table-head-bulk-actions"
                onClick={() => onSelectAll(selected)}
              >
                <div
                  className={`${rowCss.checkbox} ${
                    selected.length === items.length && items.length !== 0
                      ? rowCss.selectedCheckbox
                      : ''
                  }`}
                >
                  {selected.length === items.length && items.length !== 0 ? (
                    <ICheck
                      className={rowCss.checkIcon}
                      data-testid={`table-head-checkbox-check`}
                    />
                  ) : null}
                </div>
              </th>
            ) : null}

            {cols.map((col, i) => (
              <th
                key={i}
                data-testid={`table-head-${i}`}
                className={
                  allowSorting.includes(col.key) ? 'cursor-pointer' : ''
                }
                onClick={() => onSort(col.key)}
              >
                <div className="flex">
                  {SortingIcon(col.key)}
                  {col.label}
                </div>
              </th>
            ))}

            {actions.length ? (
              <th data-testid="table-row-actions-head" />
            ) : null}
          </tr>
        </thead>

        <tbody data-testid="table-body">
          {!loading &&
            items.map((item, i) => (
              <Row<T>
                key={`row-${i}`}
                cols={cols}
                item={item}
                actions={actions}
                bulkActions={bulkActions}
                isSelected={selected.includes(item.uid)}
                bulkLoading={bulkLoading.includes(item.uid)}
                setSelected={setSelected}
                index={i}
              />
            ))}
        </tbody>
      </table>

      {loading && (
        <div className="w-full flex justify-center p-2">
          <Loader type="spinner" data-testid="table-loader" />
        </div>
      )}

      {!loading && !items.length && (
        <p data-testid="table-no-items-message" className={css.noItemsBox}>
          No items were found searching for &quot;{searchValue}&quot;.
        </p>
      )}
    </section>
  );
};

export default memo(Table) as typeof Table;
