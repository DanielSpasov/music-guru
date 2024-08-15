import { memo, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { AuthContext } from '../../../Contexts';
import { ListProps, ListState } from './types';
import { BaseModel } from '../../../Types';
import Api from '../../../Api';
import { Card } from '../../';

// Composables
import Sorting from './composables/Sorting';
import Search from './composables/Search';
import { useDebounce } from '../../../Hooks';

const List = <T extends BaseModel>({
  model,
  fetchFn,
  favoriteFn,
  searchKey = 'name',
  searchPlaceholder,
  hideSearch = false,
  sortingConfig = [],
  skeletonLength = 18
}: ListProps<T>) => {
  const { uid, isAuthenticated } = useContext(AuthContext);

  const [state, setState] = useState<ListState<T>>({ items: [], favs: [] });
  const [loading, setLoading] = useState(true);
  const [params, setPrams] = useState({});

  const [value, setValue] = useState('');
  const search = useDebounce({ value, delay: 500 });

  useEffect(() => {
    (async () => {
      try {
        if (!uid) return [];

        setLoading(true);
        const { data } = await Api.users.get({ id: uid });

        if (!data) return;
        setState(prev => ({ ...prev, favs: data.favorites?.[model] || [] }));
      } catch (err) {
        toast.error('Failed to fetch favorites.');
      } finally {
        setLoading(false);
      }
    })();
  }, [model, uid]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await fetchFn({
          params: {
            ...params,
            [searchKey]: search
          }
        });
        if (!data) return;
        setState(prev => ({ ...prev, items: data }));
      } catch (err) {
        toast.error('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    })();
  }, [params, search, searchKey, fetchFn]);

  return (
    <section className="flex flex-col items-center" data-testid="list">
      <article className="flex justify-between items-center w-full mb-4">
        {!hideSearch && (
          <Search
            setValue={setValue}
            placeholder={searchPlaceholder ?? `Search ${model}...`}
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
              updateFavs={(newFavs: string[]) => {
                setState(prev => ({ ...prev, favs: newFavs }));
              }}
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
