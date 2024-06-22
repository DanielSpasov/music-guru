import { FC, useCallback, useRef, useState } from 'react';

import { Option, SelectComponentProps } from './helpers';
import Dropdown from './components/Dropdown';
import { Icon } from '../../../Common';

const Single: FC<SelectComponentProps> = ({
  placeholder,
  hideSearch,
  onChange,
  fetchFn
}) => {
  const [selected, setSelected] = useState<Option | null>(null);

  const [open, setOpen] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

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
      className="border-b-2 border-b-neutral-300 m-0.5 h-8 outline-none focus:border-b-primary"
      onFocus={() => setOpen(true)}
      onBlur={() => {
        requestAnimationFrame(() => {
          if (document.activeElement !== searchRef.current) setOpen(false);
        });
      }}
      ref={fieldRef}
      tabIndex={0}
    >
      <p
        className={`h-full p-0.5 px-1 my-0.5 ${
          selected ? 'text-black' : 'text-neutral-400'
        }`}
      >
        {selected?.name || placeholder}
      </p>

      <Dropdown
        selected={selected ? [selected] : []}
        onOptionClick={onOptionClick}
        hideSearch={hideSearch}
        searchRef={searchRef}
        fetchFn={fetchFn}
        open={open}
      />

      {selected && (
        <Icon
          model="close"
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
