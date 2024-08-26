import { memo, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useDebounce } from '../../../Hooks';
import { BaseModel } from '../../../Types';
import { ListProps } from './types';
import Search from '../Search';
import { Card } from '../../';

// Composables
import Sorting from './composables/Sorting';

const List = <T extends BaseModel>({
  model,
  fetchFn,
  skeletonLength = 24,
  // Sorting
  sortingConfig = [],
  // Search
  searchPlaceholder,
  searchKey = 'name',
  hideSearch = false
}: ListProps<T>) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<T[]>([]);

  const [search, setSearch] = useState('');
  const searchValue = useDebounce({ value: search, delay: 500 });

  const [sorting, setSorting] = useState('created_at');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await fetchFn({
          params: {
            sort: sorting,
            [searchKey]: searchValue
          }
        });
        if (!data) return;
        setItems(data);
      } catch (err) {
        toast.error('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    })();
  }, [sorting, searchValue, searchKey, fetchFn]);

  return (
    <section className="flex flex-col items-center" data-testid="list">
      <article className="flex justify-between items-center w-full mb-4">
        {!hideSearch && (
          <Search
            setValue={setSearch}
            placeholder={searchPlaceholder ?? `Search ${model}...`}
          />
        )}

        {Boolean(sortingConfig.length) && (
          <Sorting config={sortingConfig} setValue={setSorting} />
        )}
      </article>
      <div
        className="flex flex-wrap w-full items-start justify-start"
        data-testid="list-content"
      >
        {loading ? (
          Array(skeletonLength)
            .fill(null)
            .map((_, i) => (
              <Card
                key={i}
                data={{ name: '', uid: '' }}
                model={model}
                loading={true}
              />
            ))
        ) : !items.length ? (
          <h4 className="font-medium" data-testid="list-no-items-message">
            No items available.
          </h4>
        ) : (
          items.map(item => <Card data={item} key={item.uid} model={model} />)
        )}
      </div>
    </section>
  );
};

export default memo(List);
