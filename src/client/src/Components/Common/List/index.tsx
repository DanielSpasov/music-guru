import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { AuthContext } from '../../../Contexts';
import { ListProps, Model } from './helpers';
import Filters from './Filters';
import Api from '../../../Api';
import { Card } from '../../';

export default function List({
  model,
  fetchFn,
  favoriteFn,
  filtersConfig = [],
  skeletonLength = 18,
  center = true,
  emptyMessage = 'No items available.'
}: ListProps) {
  const { uid, isAuthenticated } = useContext(AuthContext);

  const [favorites, setFavorites] = useState<string[]>([]);
  const [data, setData] = useState<Model[]>([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState({
    list: true,
    favorites: !uid || !favoriteFn
  });

  const fetchList = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, list: true }));
      const { data } = await fetchFn({ params: filters });
      setData(data);
    } catch (err) {
      toast.error(`Failed to fetch ${model}.`);
    } finally {
      setLoading(prev => ({ ...prev, list: false }));
    }
  }, [fetchFn, model, filters]);

  useEffect(() => {
    (async () => await fetchList())();
    // This is supposed to be run only once
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (!uid) return;

        setLoading(prev => ({ ...prev, favorites: true }));
        const { data } = await Api.users.get({ id: uid });
        setFavorites(data.favorites?.[model] || []);
      } catch (err) {
        toast.error('Failed to fetch favorites.');
      } finally {
        setLoading(prev => ({ ...prev, favorites: false }));
      }
    })();
  }, [uid, model]);

  const isLoading = useMemo(
    () => Object.values(loading).some(Boolean),
    [loading]
  );

  return (
    <section className="flex flex-col items-center">
      <Filters
        config={filtersConfig}
        setFilters={setFilters}
        onSubmit={fetchList}
      />

      <div
        className={`flex flex-wrap w-full ${
          center ? 'items-center justify-center' : 'items-start justify-start'
        }`}
      >
        {isLoading ? (
          Array(skeletonLength)
            .fill(null)
            .map((_, i) => (
              <Card key={i} data={data} model={model} loading={true} />
            ))
        ) : !data.length ? (
          <h4 className="font-medium">{emptyMessage}</h4>
        ) : (
          data.map(x => (
            <Card
              data={x}
              key={x?.uid}
              model={model}
              loading={isLoading}
              favoriteFn={favoriteFn}
              isFavorite={favorites.includes(x.uid)}
              canFavorite={Boolean(isAuthenticated)}
            />
          ))
        )}
      </div>
    </section>
  );
}
