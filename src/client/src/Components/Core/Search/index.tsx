import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { startCase } from 'lodash';

import useDebounce from '../../../Hooks/useDebounce';
import { SearchBoxProps, Results } from './helpers';
import Popover from '../../Common/Popover';
import { Icon, Loader } from '../..';
import Api from '../../../Api';
import Input from './Input';

export default function SearchBox({ models }: SearchBoxProps) {
  const navigate = useNavigate();

  const [results, setResults] = useState<Results>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const search = useDebounce({ value, delay: 500 });

  const onChange = useCallback((e: any) => setValue(e?.target?.value), []);

  const hasResults = useMemo(
    () => Boolean(results?.[0]?.[1].length),
    [results]
  );

  const firstLoad = useRef(true);
  useEffect(() => {
    if (firstLoad.current || !search) {
      firstLoad.current = false;
      setResults([]);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const results: Results = await Promise.all(
          models.map(async model => {
            const { data } = await Api[model].fetch({
              config: { params: { name: search } }
            });
            return [model, data];
          })
        );

        setResults(results);
      } catch (err) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [search, models]);

  return (
    <div className="relative flex items-center" onBlur={() => setOpen(false)}>
      <Input
        onChange={onChange}
        value={value}
        open={open}
        placeholder="Search..."
        position="absolute"
        width="250px"
        right=".2em"
      />

      <Popover
        open={open}
        label={<Icon model="search" onClick={() => setOpen(prev => !prev)} />}
        className="w-64"
      >
        {loading && <Loader size="s" rainbow />}
        {!loading && !hasResults && <span>No Results.</span>}
        {!loading && hasResults && (
          <article className="text-start">
            {results.map(([model, data]) => (
              <section key={model}>
                <h4>{data.length ? startCase(model) : null}</h4>
                <div>
                  {data.map(obj => (
                    <div
                      className="flex items-center p-1.5 rounded-md hover:bg-neutral-700 cursor-pointer"
                      key={obj.uid}
                      onClick={() => {
                        navigate(`/${model}/${obj.uid}`);
                        setOpen(false);
                      }}
                    >
                      <img src={obj.image} className="h-10 rounded-md" />
                      <span className="p-2">{obj.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </article>
        )}
      </Popover>
    </div>
  );
}
