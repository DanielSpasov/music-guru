import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { Col, Sorting, TableProps } from './types';
import { BaseModel } from '../../../Types';
import Loader from '../../Core/Loader';
import { IDown, IUp } from '../..';

// Composables
import Row from './composables/Row';

const Table = <T extends BaseModel>({
  cols,
  fetchFn,
  actions = []
}: TableProps<T>) => {
  const [sorting, setSorting] = useState<Sorting<T>>({
    key: null,
    direction: null
  });
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<T[]>([]);

  const unsortedItems = useRef<T[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const { data } = await fetchFn();
        setItems(data);
        unsortedItems.current = data;
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data?.message || 'Failed to fetch data.');
        }
        toast.error('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchFn]);

  const toggleSorting = useCallback(
    (col: Col<T>) => {
      if (!sorting.direction || col.key !== sorting.key) {
        setSorting({ key: col.key, direction: 'asc' });
        switch (col.type) {
          case 'boolean':
            items.sort((a, b) => Number(b[col.key]) - Number(a[col.key]));
            break;
          case 'date':
            items.sort(
              (a, b) =>
                new Date(a[col.key] as string).getTime() -
                new Date(b[col.key] as Date).getTime()
            );
            break;
          default:
            items.sort((a, b) =>
              String(a[col.key]).localeCompare(String(b[col.key]))
            );
        }
        return;
      }

      if (sorting.direction === 'asc') {
        setSorting({ key: col.key, direction: 'desc' });
        switch (col.type) {
          case 'boolean':
            items.sort((a, b) => Number(a[col.key]) - Number(b[col.key]));
            break;
          case 'date':
            items.sort(
              (a, b) =>
                new Date(b[col.key] as string).getTime() -
                new Date(a[col.key] as Date).getTime()
            );
            break;
          default:
            items.sort((a, b) =>
              String(b[col.key]).localeCompare(String(a[col.key]))
            );
        }
        return;
      }

      if (sorting.direction === 'desc') {
        setSorting({ key: null, direction: null });
        setItems(unsortedItems.current);
        return;
      }
    },
    [sorting, items]
  );

  if (loading) return <Loader type="spinner" className="w-full m-auto" />;
  return (
    <table className="w-full">
      <thead className="border-b-[1px] border-b-neutral-200 dark:border-b-neutral-700">
        <tr>
          {cols.map((col, i) => (
            <th
              key={i}
              className="font-semibold text-start p-2 cursor-pointer"
              onClick={() => toggleSorting(col)}
            >
              <div className="flex">
                {sorting.key === col.key ? (
                  sorting.direction === 'asc' ? (
                    <IDown className="w-6 h-6" />
                  ) : (
                    <IUp className="w-6 h-6" />
                  )
                ) : null}

                {col.label}
              </div>
            </th>
          ))}
          {actions.length ? <th /> : null}
        </tr>
      </thead>

      <tbody>
        {items.map((item, i) => (
          <Row<T>
            key={`row-${i}`}
            cols={cols}
            item={item}
            actions={actions}
            index={i}
          />
        ))}
      </tbody>
    </table>
  );
};

export default memo(Table) as typeof Table;
