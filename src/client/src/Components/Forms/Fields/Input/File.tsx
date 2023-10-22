import { FileProps } from './helpers';

export default function File({
  id,
  name,
  _onChange,
  label,
  accept,
  value
}: FileProps) {
  const hoverProps = 'hover:border-dashed hover:border-neutral-500';

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
        className={`block bg-neutral-800 border-2 border-neutral-600 w-full h-11 rounded-md cursor-pointer ${hoverProps}`}
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
