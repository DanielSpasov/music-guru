import { FC, useCallback } from 'react';

import { Link, List } from '../../../../../Components';
import { SublistProps } from './types';
import Api from '../../../../../Api';

const Sublist: FC<SublistProps> = ({
  fetchFnProps = {},
  label,
  model,
  limit
}) => {
  const fetchFn = useCallback(
    () =>
      Api[model].fetch({
        config: {
          params: { ...fetchFnProps, limit }
        }
      }),
    [model, limit, fetchFnProps]
  );

  return (
    <article>
      <div className="flex justify-between items-center gap-2">
        <h3>{label}</h3>
        <div className="bg-neutral-200 dark:bg-neutral-700 w-full h-[1px]" />
        <Link type="link" to={model} className="underline whitespace-nowrap">
          See All
        </Link>
      </div>

      <List
        favoriteFn={uid => Api[model].favorite({ uid })}
        fetchFn={fetchFn}
        skeletonLength={limit}
        model={model}
        hideSearch
      />
    </article>
  );
};

export default Sublist;
