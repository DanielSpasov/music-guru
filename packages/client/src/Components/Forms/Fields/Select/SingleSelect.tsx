import { useCallback, useRef, useState } from 'react';

import { Option, SelectComponentProps } from './types';
import { Popover, Search } from '../../../Common';
import { useDebounce } from '../../../../Hooks';
import { themeProps } from './styles';
import { IX } from '../../../Icons';

// Composables
import Results from './composables/Results';

const Single = <T extends Option>({
  defaultValue = null,
  placeholder,
  hideSearch,
  onChange,
  fetchFn
}: SelectComponentProps<'single', T>) => {
  const [selected, setSelected] = useState<Option | null>(defaultValue);

  const [open, setOpen] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState('');
  const searchValue = useDebounce({ value: search, delay: 500 });

  const onOptionClick = useCallback(
    (option: Option) => {
      setOpen(false);

      if (fieldRef.current) fieldRef.current.blur();

      if (selected?.uid === option.uid) {
        setSelected(null);
        onChange(null);
        return;
      }
      setSelected(option);
      onChange(option);
    },
    [setOpen, selected, onChange]
  );

  return (
    <div
      className={`m-0.5 h-8 outline-none ${themeProps}`}
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
      <p className="h-full p-0.5 px-1 my-0.5">
        {selected ? (
          <span>{selected?.name}</span>
        ) : (
          <span className="text-neutral-400">{placeholder}</span>
        )}
      </p>

      <Popover open={open} className="w-full">
        {!hideSearch && <Search setValue={setSearch} forwardRef={searchRef} />}

        <Results
          fetchFn={fetchFn}
          onOptionClick={onOptionClick}
          search={searchValue}
          selected={selected ? [selected] : []}
        />
      </Popover>

      {selected && (
        <IX
          className="absolute right-0 top-6 w-6"
          onClick={() => {
            setSelected(null);
            onChange(null);
          }}
        />
      )}
    </div>
  );
};

export default Single;
