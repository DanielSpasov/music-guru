import { memo, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Pagination } from '../../../Api/crud/types';
import { Button, Card, Search } from '../../';
import { useDebounce } from '../../../Hooks';
import { BaseModel } from '../../../Types';
import { CardModel } from '../Card/types';
import { ListProps } from './types';

// Composables
import Sorting from './composables/Sorting';

const renderSkeleton = (number: number, model: CardModel) =>
  Array(number)
    .fill(null)
    .map((_, i) => (
      <Card key={i} data={{ name: '', uid: '' }} model={model} loading={true} />
    ));

const List = <T extends BaseModel>({
  model,
  fetchFn,
  perPage = 25,
  // Sorting
  sortingConfig = [],
  // Search
  searchPlaceholder,
  searchKey = 'name',
  hideSearch = false
}: ListProps<T>) => {
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalItems: 0,
    totalPages: 0
  });
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);

  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const searchValue = useDebounce({ value: search, delay: 500 });

  const [sorting, setSorting] = useState('created_at');

  const fetchData = useCallback(async () => {
    try {
      const { data, pagination } = await fetchFn({
        params: {
          page,
          limit: perPage,
          sort: sorting,
          [searchKey]: searchValue
        }
      });
      setPagination(pagination);

      return data;
    } catch (err) {
      toast.error(`Failed to fetch ${model}.`);
      return [];
    }
  }, [fetchFn, model, perPage, searchKey, searchValue, sorting, page]);

  const fetchFirstPage = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchData();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  const fetchMore = useCallback(async () => {
    try {
      setLoadingMore(true);
      const data = await fetchData();
      setItems(prev => [...prev, ...data]);
    } finally {
      setLoadingMore(false);
    }
  }, [fetchData]);

  useEffect(() => {
    (async () => {
      try {
        if (page === 1) {
          await fetchFirstPage();
          return;
        }

        await fetchMore();
      } catch (err) {
        toast.error(`Failed to fetch ${model}.`);
      }
    })();
  }, [fetchFirstPage, fetchMore, page, model]);

  return (
    <section className="flex flex-col items-center" data-testid="list">
      <article className="flex justify-between items-center w-full mb-4">
        {!hideSearch && (
          <Search
            setValue={value => {
              setSearch(value);
              setPage(1);
            }}
            placeholder={searchPlaceholder ?? `Search ${model}...`}
          />
        )}

        {Boolean(sortingConfig.length) && (
          <Sorting
            config={sortingConfig}
            setValue={value => {
              setSorting(value);
              setPage(1);
            }}
          />
        )}
      </article>

      <div
        className="flex flex-wrap w-full items-start justify-start"
        data-testid="list-content"
      >
        {loading ? (
          renderSkeleton(perPage, model)
        ) : !items.length ? (
          <h4 className="font-medium" data-testid="list-no-items-message">
            No {model} available.
          </h4>
        ) : (
          items.map(item => <Card data={item} key={item.uid} model={model} />)
        )}

        {loadingMore && renderSkeleton(perPage, model)}
      </div>

      {pagination?.currentPage < pagination?.totalPages &&
        !loading &&
        !loadingMore && (
          <Button
            variant="outline"
            onClick={() => setPage(prev => prev + 1)}
            data-testid="list-show-more-button"
          >
            Show More
          </Button>
        )}
    </section>
  );
};

export default memo(List);
