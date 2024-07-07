import { FC } from 'react';

import { IMagnifyingGlass } from '../../../../../Icons';
import { SearchProps } from '../../types';
import { themeProps } from './styles';

const Search: FC<SearchProps> = ({ setSearch, searchRef }) => {
  return (
    <div className="flex items-center p-0.5">
      <IMagnifyingGlass color="[&>path]:fill-neutral-500" className="w-6 h-6" />
      <input
        ref={searchRef}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search..."
        className={`p-1 outline-none w-full bg-transparent ${themeProps}`}
      />
    </div>
  );
};

export default Search;
