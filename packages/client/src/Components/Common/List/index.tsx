import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

import { AuthContext } from '../../../Contexts';
import { ListProps, ListState } from './types';
import { BaseModel } from '../../../Types';
import Api from '../../../Api';
import { Card } from '../../';

// Composables
import Filters from './composables/Filters';
import Sorting from './composables/Sorting';

const List = <T extends BaseModel>({
  model,
  fetchFn,
  favoriteFn,
  filtersConfig = [],
  sortingConfig = [],
  skeletonLength = 18
}: ListProps<T>) => {
  const { uid, isAuthenticated } = useContext(AuthContext);

  const [state, setState] = useState<ListState<T>>({ items: [], favs: [] });
  const [loading, setLoading] = useState(true);
  const [params, setPrams] = useState({});

  const fetchList = useCallback(
    async (config: AxiosRequestConfig = {}) => {
      try {
        const { data } = await fetchFn(config);
        return data;
      } catch (err) {
        toast.error('Failed to fetch items.');
      }
    },
    [fetchFn]
  );

  const fetchFavs = useCallback(async () => {
    try {
      if (!uid) return [];
      const { data } = await Api.users.get({ id: uid });
      return data.favorites?.[model] || [];
    } catch (err) {
      toast.error('Failed to fetch favorites.');
    }
  }, [uid, model]);

  const updateFavs = useCallback(
    (newFavs: string[]) => setState(prev => ({ ...prev, favs: newFavs })),
    []
  );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const [items, favs] = await Promise.all([fetchList(), fetchFavs()]);
        if (items && favs) setState({ items, favs });
      } catch (err) {
        toast.error('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchList, fetchFavs]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const items = await fetchList({ params });
        if (items) setState(prev => ({ ...prev, items }));
      } catch (err) {
        toast.error('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    })();
  }, [params, fetchList]);

  return (
    <section className="flex flex-col items-center" data-testid="list">
      <article className="flex justify-between items-center w-full mb-4">
        {Boolean(filtersConfig.length) && (
          <Filters
            config={filtersConfig}
            onApply={({ params }) => setPrams(prev => ({ ...prev, ...params }))}
          />
        )}

        {Boolean(sortingConfig.length) && (
          <Sorting
            config={sortingConfig}
            onApply={({ params }) => setPrams(prev => ({ ...prev, ...params }))}
          />
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
        ) : !state.items.length ? (
          <h4 className="font-medium" data-testid="list-no-items-message">
            No items available.
          </h4>
        ) : (
          state.items.map(item => (
            <Card
              data={item}
              key={item.uid}
              model={model}
              favoriteFn={favoriteFn}
              updateFavs={updateFavs}
              canFavorite={Boolean(isAuthenticated)}
              isFavorite={state.favs.includes(item.uid)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default memo(List);
