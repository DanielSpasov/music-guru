import { FileProps } from './helpers';

const hoverProps = 'hover:border-dashed hover:border-neutral-300';
const darkProps =
  'dark:bg-neutral-800 dark:border-neutral-600 dark:hover:border-neutral-500';

export default function File({
  id,
  name,
  _onChange,
  label,
  accept,
  value
}: FileProps) {
  return (
    <>
      <input
        id={id}
        type="file"
        name={name}
        className="hidden"
        onChange={_onChange}
        accept={accept.join(',')}
      />
      <label
        htmlFor={id}
        className={`block bg-neutral-100 border-2 border-neutral-200 w-full h-11 rounded-md cursor-pointer ${darkProps} ${hoverProps}`}
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
