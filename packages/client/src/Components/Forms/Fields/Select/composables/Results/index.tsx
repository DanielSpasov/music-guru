import { memo, useEffect, useState } from 'react';

import { ResultsProps, Option } from '../../types';
import { Loader } from '../../../../..';

import css from './index.module.css';

const Results = <T extends Option>({
  search,
  selected,
  fetchFn,
  onOptionClick
}: ResultsProps<T>) => {
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await fetchFn({
          config: {
            params: {
              name: search,
              limit: 10
            }
          }
        });
        setResults(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchFn, search]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader type="spinner" />
      </div>
    );
  }

  if (!results.length) {
    return (
      <p className="text-center p-1">No results for &quot;{search}&quot;</p>
    );
  }

  return (
    <>
      {results.map(option => {
        const isSelected = Boolean(selected.find(x => x.uid === option.uid));
        return (
          <div
            key={option.uid}
            onClick={() => onOptionClick(option)}
            className={`${css.option} ${isSelected && css.selected}`}
          >
            <span className="px-2">{option.name}</span>
          </div>
        );
      })}
    </>
  );
};

export default memo(Results);
