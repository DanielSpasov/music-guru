import { useRef } from 'react';
import { FileProps } from './helpers';

const hoverProps = 'hover:border-dashed hover:border-neutral-300';
const focusProps = 'focus:border-dashed focus:border-primary';
const darkProps =
  'dark:bg-neutral-800 dark:border-neutral-600 dark:hover:border-neutral-500 dark:focus:border-primary-dark';

export default function File({
  id,
  name,
  _onChange,
  label,
  accept,
  value
}: FileProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        id={id}
        type="file"
        name={name}
        ref={inputRef}
        className="hidden"
        onChange={_onChange}
        accept={accept.join(',')}
      />
      <label
        htmlFor={id}
        tabIndex={0}
        onKeyDown={e => {
          if (e.key !== 'Enter') return;
          inputRef.current?.click();
        }}
        className={`block bg-neutral-100 border-2 border-neutral-200 w-full h-11 rounded-md cursor-pointer outline-none ${hoverProps} ${focusProps} ${darkProps}`}
      >
        <span
          className={`absolute ${!value ? 'top-2.5 left-3' : '-top-7 left-1'}`}
        >
          {label}
        </span>
        <span className="absolute top-2.5 left-3">{value?.name}</span>
      </label>
    </>
  );
}
