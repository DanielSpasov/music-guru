import { FC, memo } from 'react';

import { IMagnifyingGlass } from '../../../..';
import { SearchProps } from './types';

const Search: FC<SearchProps> = ({ setValue, placeholder }) => {
  return (
    <article
      data-testid="list-search"
      className="flex items-center gap-2 bg-neutral-200 dark:bg-neutral-900 rounded-full p-1"
    >
      <IMagnifyingGlass color="[&>path]:fill-neutral-500" />
      <input
        type="text"
        onChange={e => setValue(e.target.value)}
        data-testid="list-search-input"
        className="bg-transparent outline-none w-full"
        placeholder={placeholder ?? `Search...`}
      />
    </article>
  );
};

export default memo(Search);
