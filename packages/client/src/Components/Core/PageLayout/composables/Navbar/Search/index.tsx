import { FC, memo, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { capitalize } from 'lodash';

import { IMagnifyingGlass, Link, Popover, Loader } from '../../../../../';
import { useDebounce } from '../../../../../../Hooks';
import { Model } from '../../../../../../Api/types';
import { Results, SearchProps } from './types';
import Api from '../../../../../../Api';
import { iconMap } from './icons';

const Search: FC<SearchProps> = ({ models }) => {
  const [value, setValue] = useState('');
  const search = useDebounce({ value, delay: 500 });

  const [results, setResults] = useState<Results>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!search) {
        setResults({});
        return;
      }

      try {
        setLoading(true);
        setResults({});

        const response = await Promise.all(
          models.map(model =>
            Api[model].fetch({ config: { params: { name: search } } })
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
  }, [search, models]);

  const hasResults = useMemo(
    () => Boolean(Object.values(results).some(results => results.length > 0)),
    [results]
  );

  return (
    <article className="w-full" data-testid="navbar-search">
      <Popover
        open={Boolean(search)}
        label={
          <article className="flex items-center gap-2 bg-neutral-200 dark:bg-neutral-800 rounded-full p-1">
            <IMagnifyingGlass color="[&>path]:fill-neutral-500" />
            <input
              type="text"
              onChange={e => setValue(e.target.value)}
              data-testid="navbar-search-input"
              className="bg-transparent outline-none w-full"
              placeholder="Search Music Guru..."
            />
          </article>
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
                    <Link
                      type="link"
                      key={result?.uid}
                      className="block pl-2"
                      onClick={() => setValue('')}
                      to={`/${model}/${result?.uid}`}
                      data-testid={`results-${model}-${result?.uid}`}
                    >
                      {result?.name}
                    </Link>
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

export default memo(Search) as typeof Search;
