import { useCallback, useRef, useState } from 'react';

import { Option, SelectComponentProps } from './types';
import { Popover, Search } from '../../../Common';
import { useDebounce } from '../../../../Hooks';
import { themeProps } from './styles';
import { IX } from '../../../Icons';

// Composables
import Results from './composables/Results';

const Multi = <T extends Option>({
  defaultValue = [],
  placeholder,
  hideSearch,
  onChange,
  fetchFn
}: SelectComponentProps<'multi', T>) => {
  const [selected, setSelected] = useState<Option[]>(defaultValue);

  const [open, setOpen] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState('');
  const searchValue = useDebounce({ value: search, delay: 500 });

  const onOptionClick = useCallback(
    (option: Option) => {
      if (selected.find(x => x.uid === option.uid)) {
        setSelected(prev => prev.filter(x => x.uid !== option.uid));
        onChange(selected.filter(x => x.uid !== option.uid));
        return;
      }
      setSelected(prev => [...prev, option]);
      onChange([...selected, option]);
    },
    [selected, onChange]
  );

  return (
    <div
      className={`m-0.5 min-h-[2rem] outline-none ${themeProps}`}
      onFocus={() => setOpen(true)}
      onBlur={() => {
        requestAnimationFrame(() => {
          if (
            document.activeElement !== searchRef.current &&
            document.activeElement !== fieldRef.current
          ) {
            setOpen(false);
            setSearch('');
          }
        });
      }}
      ref={fieldRef}
      tabIndex={0}
    >
      <div className="flex flex-wrap gap-1 h-full p-0.5 px-1 my-0.5">
        {selected.length ? (
          selected.map(option => (
            <p
              key={option.uid}
              className="flex items-center box-border h-7 bg-neutral-200 dark:bg-neutral-700 rounded-md p-2 pr-0 whitespace-nowrap"
            >
              {option.name}
              <IX
                onClick={() => onOptionClick(option)}
                color="[&>path]:fill-red-500 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                className="inline w-6 h-6 rounded-md"
              />
            </p>
          ))
        ) : (
          <span className="text-neutral-400">{placeholder}</span>
        )}
      </div>

      <Popover open={open} className="w-full">
        {!hideSearch && <Search setValue={setSearch} forwardRef={searchRef} />}

        <Results
          fetchFn={fetchFn}
          onOptionClick={onOptionClick}
          search={searchValue}
          selected={selected ?? []}
        />
      </Popover>
    </div>
  );
};

export default Multi;
