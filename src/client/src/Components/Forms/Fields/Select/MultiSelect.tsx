import { FC, useCallback, useRef, useState } from 'react';

import { Option, SelectComponentProps, themeProps } from './helpers';
import Dropdown from './components/Dropdown';
import { IX } from '../../../Icons';

const Multi: FC<SelectComponentProps<'multi'>> = ({
  defaultValue = [],
  placeholder,
  hideSearch,
  onChange,
  fetchFn
}) => {
  const [selected, setSelected] = useState<Option[]>(defaultValue);

  const [open, setOpen] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);

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
      className={`m-0.5 h-8 outline-none ${themeProps}`}
      onFocus={() => setOpen(true)}
      onBlur={() => {
        requestAnimationFrame(() => {
          if (document.activeElement !== searchRef.current) setOpen(false);
        });
      }}
      tabIndex={0}
    >
      <div className="flex h-full p-0.5 px-1 my-0.5">
        {selected.length ? (
          selected.map(option => (
            <p
              key={option.uid}
              className="flex items-center h-full bg-neutral-200 dark:bg-neutral-700 rounded-md p-2 pr-0 mr-1 my-0"
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

      <Dropdown
        onOptionClick={onOptionClick}
        hideSearch={hideSearch}
        searchRef={searchRef}
        selected={selected}
        fetchFn={fetchFn}
        open={open}
      />
    </div>
  );
};

export default Multi;
