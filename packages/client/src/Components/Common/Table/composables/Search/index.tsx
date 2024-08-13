import { FC, memo } from 'react';

import { IMagnifyingGlass } from '../../../..';
import { SearchProps } from './types';

const Search: FC<SearchProps> = ({ setValue }) => {
  return (
    <article className="flex items-center gap-2 p-1 rounded-md bg-neutral-200 dark:bg-neutral-700">
      <IMagnifyingGlass color="[&>path]:fill-neutral-500" />
      <input
        type="text"
        onChange={e => setValue(e.target.value)}
        className="bg-transparent outline-none w-full"
        placeholder="Search..."
      />
    </article>
  );
};

export default memo(Search);
