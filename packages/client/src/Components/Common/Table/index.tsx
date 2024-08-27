import { memo, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { Pagination as IPagination } from '../../../Api/crud/types';
import { TableBulkAction, TableProps } from './types';
import { useDebounce } from '../../../Hooks';
import { BaseModel } from '../../../Types';
import { ICheck, IDown, IUp } from '../..';
import Loader from '../../Core/Loader';
import Search from '../Search';

import rowCss from './composables/Row/index.module.css';
import css from './index.module.css';

// Composables
import Pagination from './composables/Pagination';
import Action from './composables/Action';
import Row from './composables/Row';

const Table = <T extends BaseModel>({
  cols,
  fetchFn,
  perPage = 25,
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
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalItems: 0,
    totalPages: 0
  });
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);

  // Actions
  const [bulkLoading, setBulkLoading] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  // Search
  const [search, setSearch] = useState('');
  const searchValue = useDebounce({ value: search, delay: 500 });

  // Sorting
  const [sorting, setSorting] = useState('-created_at');

  useEffect(() => setPage(1), [searchValue, sorting]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const { data, pagination } = await fetchFn({
          params: {
            page,
            limit: perPage,
            sort: sorting,
            [searchKey]: searchValue
          }
        });
        setPagination(pagination);
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
  }, [fetchFn, searchValue, sorting, searchKey, perPage, page]);

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
        setSelected(prev => [
          ...prev,
          ...items.filter(x => !prev.includes(x.uid)).map(x => x.uid)
        ]);
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
          <Search
            setValue={value => setSearch(value)}
            placeholder={searchPlaceholder}
          />
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
                    items.every(x => selected.includes(x.uid))
                      ? rowCss.selectedCheckbox
                      : ''
                  }`}
                >
                  {items.every(x => selected.includes(x.uid)) ? (
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
          {searchValue
            ? `No items were found searching for "${searchValue}".`
            : 'No items available.'}
        </p>
      )}

      <Pagination
        currentItems={items.length}
        pagination={pagination}
        setPage={setPage}
      />
    </section>
  );
};

export default memo(Table) as typeof Table;
