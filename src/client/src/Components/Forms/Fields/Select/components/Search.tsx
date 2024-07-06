import { FC } from 'react';

import { IMagnifyingGlass } from '../../../../Icons';
import { SearchProps } from '../helpers';

const lightProps =
  'border-b-neutral-300 hover:border-b-neutral-400 focus:border-b-primary';
const darkProps =
  'dark:border-b-neutral-600 dark:hover:border-b-neutral-500 dark:focus:border-b-primary-dark';
const themeProps = `border-b-2 ${lightProps} ${darkProps}`;

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
