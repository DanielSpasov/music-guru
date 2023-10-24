import { useCallback, useState } from 'react';
import ReactCalendar from 'react-calendar';
import moment from 'moment';

import { FieldProps } from '../helpers';
import { Popover } from '../../..';
import Controls from '../Controls';

const hoverProps = 'hover:border-neutral-300';
const focusProps = 'focus:border-primary';
const darkProps =
  'dark:bg-neutral-800 dark:border-neutral-700 dark:hover:border-neutral-500 dark:focus:border-primary-dark';

export default function Calendar({
  label,
  value,
  onChange
}: FieldProps<Date, never>) {
  const [open, setOpen] = useState<boolean>(false);

  const _onChange = useCallback(
    (date: Date | undefined) => {
      onChange(date);
      setOpen(false);
    },
    [onChange]
  );

  return (
    <div className="relative my-2">
      <input
        value={value ? moment(value).format('MMMM Do YYYY') : ''}
        placeholder=" "
        onChange={() => null}
        onClick={() => setOpen(prev => !prev)}
        className={`w-full h-11 outline-none bg-neutral-100 border-2 border-neutral-200 rounded-md p-2 ${hoverProps} ${focusProps} ${darkProps}`}
      />
      <label
        className={`absolute ${!value ? 'top-2.5 left-3' : '-top-7 left-1'}`}
      >
        {label}
      </label>

      <Controls
        value={value}
        onClear={() => _onChange(undefined)}
        onClick={() => setOpen(prev => !prev)}
        iconModel="calendar"
      />

      <Popover open={open} className="z-50">
        <ReactCalendar
          onChange={_onChange}
          defaultValue={moment(value).toDate()}
        />
      </Popover>
    </div>
  );
}
