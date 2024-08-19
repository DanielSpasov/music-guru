import { memo, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { useDebounce } from '../../../Hooks';
import { BaseModel } from '../../../Types';
import Loader from '../../Core/Loader';
import { TableProps } from './types';
import { IDown, IUp } from '../..';
import Search from '../Search';

// Composables
import Row from './composables/Row';

const Table = <T extends BaseModel>({
  cols,
  fetchFn,
  actions = [],
  // Sorting
  allowSorting = [],
  // Search
  searchPlaceholder,
  searchKey = 'name',
  hideSearch = false
}: TableProps<T>) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<T[]>([]);

  const [search, setSearch] = useState('');
  const searchValue = useDebounce({ value: search, delay: 500 });

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
    <>
      {!hideSearch && (
        <Search setValue={setSearch} placeholder={searchPlaceholder} />
      )}
      <table className="relative w-full">
        <thead className="border-b-[1px] border-b-neutral-200 dark:border-b-neutral-700">
          <tr>
            {cols.map((col, i) => (
              <th
                key={i}
                className={`font-semibold text-start p-2 ${
                  allowSorting.includes(col.key) ? 'cursor-pointer' : ''
                }`}
                onClick={() => onSort(col.key)}
              >
                <div className="flex">
                  {SortingIcon(col.key)}
                  {col.label}
                </div>
              </th>
            ))}
            {actions.length ? <th /> : null}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td>
                <Loader type="spinner" className="absolute m-auto w-full" />
              </td>
            </tr>
          ) : !items.length ? (
            <tr>
              <td className="absolute m-auto w-full text-center font-semibold p-2">
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
                index={i}
              />
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default memo(Table) as typeof Table;
