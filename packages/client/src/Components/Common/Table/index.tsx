import { memo, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { useDebounce } from '../../../Hooks';
import { BaseModel } from '../../../Types';
import Loader from '../../Core/Loader';
import { TableProps } from './types';
import { IDown, IUp } from '../..';
import Search from '../Search';

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
              onClick={action.onClick}
              Icon={action.Icon}
              label={action.label}
            />
          ))}
        </article>
      ) : null}

      <table data-testid="table">
        <thead>
          <tr data-testid="table-head">
            {bulkActions.length ? (
              <th data-testid="table-bulk-actions-head" />
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
          {loading ? (
            <tr>
              <td>
                <Loader
                  type="spinner"
                  className={css.tableLoader}
                  data-testid="table-loader"
                />
              </td>
            </tr>
          ) : !items.length ? (
            <tr>
              <td
                className={css.noItemsBox}
                data-testid="table-no-items-message"
              >
                No items were found searching for &quot;{searchValue}&quot;.
              </td>
            </tr>
          ) : (
            items.map((item, i) => (
              <Row<T>
                key={`row-${i}`}
                cols={cols}
                item={item}
                actions={actions}
                bulkActions={bulkActions}
                isSelected={selected.includes(item.uid)}
                setSelected={setSelected}
                index={i}
              />
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default memo(Table) as typeof Table;
