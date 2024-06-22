import { FC, useEffect, useState } from 'react';

import { Popover, Loader } from '../../../../../Components';
import useDebounce from '../../../../../Hooks/useDebounce';
import { DropdownProps, Option } from '../helpers';
import Search from './Search';

const lightProps = 'hover:bg-neutral-200';
const darkProps = 'dark:hover:bg-neutral-800';
const themeProps = `${lightProps} ${darkProps}`;

const selectedProps = 'bg-neutral-200 dark:bg-neutral-800';

const Dropdown: FC<DropdownProps> = ({
  hideSearch,
  open,
  onOptionClick,
  selected,
  searchRef,
  fetchFn
}) => {
  const [results, setResults] = useState<Option[]>([]);
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
      {!hideSearch && <Search setSearch={setSearch} searchRef={searchRef} />}

      {loading ? (
        <Loader size="sm" />
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
