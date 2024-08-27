import { FC, memo, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { capitalize } from 'lodash';

import { Link, Popover, Loader, Search } from '../../../../../';
import { useDebounce } from '../../../../../../Hooks';
import { Model } from '../../../../../../Api/types';
import { Results, SearchProps } from './types';
import Api from '../../../../../../Api';
import { iconMap } from './icons';

const GlobalSearch: FC<SearchProps> = ({ models }) => {
  const [search, setSearch] = useState('');
  const searchValue = useDebounce({ value: search, delay: 500 });

  const [results, setResults] = useState<Results>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!searchValue) {
        setResults({});
        return;
      }

      try {
        setLoading(true);
        setResults({});

        const response = await Promise.all(
          models.map(model =>
            Api[model].fetch({
              config: { params: { name: searchValue, limit: 5 } }
            })
          )
        );

        setResults(
          response.reduce(
            (acc, curr, i) => ({ ...acc, [models[i]]: curr.data }),
            {}
          )
        );
      } catch (err) {
        toast.error('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    })();
  }, [searchValue, models]);

  const hasResults = useMemo(
    () => Boolean(Object.values(results).some(results => results.length > 0)),
    [results]
  );

  return (
    <article className="w-full" data-testid="navbar-search">
      <Popover
        open={Boolean(search)}
        label={
          <Search setValue={setSearch} placeholder="Search Music Guru..." />
        }
        className="w-full"
      >
        <div
          className={`flex flex-col justify-center gap-2 ${
            loading || !hasResults ? 'items-center' : 'items-start'
          }`}
          data-testid="navbar-search-results"
        >
          {loading ? (
            <Loader data-testid="navbar-search-loader" />
          ) : (
            !hasResults && (
              <span
                className="font-semibold"
                data-testid="navbar-search-no-results"
              >
                No Results.
              </span>
            )
          )}

          {Object.entries(results).map(([model, results]) => {
            if (!results.length) return;

            const Icon = iconMap[model as Model];
            return (
              <section
                key={model}
                data-testid={`results-${model}`}
                className="w-full"
              >
                <header className="flex items-center gap-2">
                  <Icon className="w-6 h-6 [&>path]:fill-black dark:[&>path]:fill-white" />
                  <h3 className="font-semibold">{capitalize(model)}</h3>
                  <div className="bg-neutral-300 dark:bg-neutral-700 h-[1px] w-full" />
                </header>

                <article>
                  {results.map(result => (
                    <div
                      className="flex items-center gap-1 mb-1"
                      key={result?.uid}
                    >
                      <img
                        className="w-10 h-10 shrink-0 rounded-md"
                        src={result.image}
                        alt={result.name}
                      />
                      <Link
                        type="link"
                        className="block pl-2"
                        onClick={() => setSearch('')}
                        to={`/${model}/${result?.uid}`}
                        data-testid={`results-${model}-${result?.uid}`}
                      >
                        {result?.name}
                      </Link>
                      {model !== 'artist' && (
                        <Link
                          type="link"
                          className="block pl-2 text-neutral-500"
                          onClick={() => setSearch('')}
                          to={`/artist/${result?.artist?.uid}`}
                          data-testid={`results-${model}-${result?.uid}-artist`}
                        >
                          {result?.artist?.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </article>
              </section>
            );
          })}
        </div>
      </Popover>
    </article>
  );
};

export default memo(GlobalSearch) as typeof GlobalSearch;
