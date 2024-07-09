import { useEffect, useState } from 'react';

import { Popover, Loader } from '../../../../../../Components';
import { selectedProps, themeProps } from './styles';
import { DropdownProps, Option } from '../../types';
import { useDebounce } from '../../../../../../Hooks';

// Composables
import Search from '../Search';

const Dropdown = <T extends Option>({
  hideSearch,
  open,
  onOptionClick,
  selected,
  searchRef,
  fetchFn
}: DropdownProps<T>) => {
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const [rawSearch, setSearch] = useState('');
  const search = useDebounce({ value: rawSearch, delay: 500 });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await fetchFn({
          config: { params: { name: search } }
        });
        setResults(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchFn, search]);

  return (
    <Popover open={open} className="w-full">
      {!hideSearch && <Search<T> setSearch={setSearch} searchRef={searchRef} />}

      {loading ? (
        <Loader type="vinyl" />
      ) : results.length ? (
        results.map(option => {
          const isSelected = Boolean(selected.find(x => x.uid === option.uid));
          return (
            <div
              key={option.uid}
              onClick={() => onOptionClick(option)}
              className={`flex items-center rounded-md p-1 cursor-pointer ${
                isSelected && selectedProps
              } ${themeProps}`}
            >
              <span className="px-2">{option.name}</span>
            </div>
          );
        })
      ) : (
        <p className="text-center p-1">No results for &quot;{search}&quot;</p>
      )}
    </Popover>
  );
};

export default Dropdown;
