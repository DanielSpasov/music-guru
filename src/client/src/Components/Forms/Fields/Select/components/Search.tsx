import { FC } from 'react';

import { Icon } from '../../../../Common';
import { SearchProps } from '../helpers';

const Search: FC<SearchProps> = ({ setSearch, searchRef }) => {
  return (
    <div className="flex items-center p-0.5">
      <Icon model="search" className="w-6 h-6 [&>path]:fill-neutral-500" />
      <input
        ref={searchRef}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search..."
        className="p-1 outline-none w-full bg-transparent border-b-2 border-b-neutral-300 focus:border-b-primary"
      />
    </div>
  );
};

export default Search;
