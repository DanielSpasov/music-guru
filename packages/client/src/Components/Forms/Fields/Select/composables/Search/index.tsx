import { IMagnifyingGlass } from '../../../../../Icons';
import { Option, SearchProps } from '../../types';
import { themeProps } from './styles';

const Search = <T extends Option>({ setSearch, searchRef }: SearchProps<T>) => {
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
