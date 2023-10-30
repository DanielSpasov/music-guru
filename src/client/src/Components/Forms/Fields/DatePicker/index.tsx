import ReactDatePicker from 'react-datepicker';
import { useCallback, useState } from 'react';

import { FieldProps } from '../helpers';
import Controls from '../Controls';
import moment from 'moment';

import './styles.css';

const hoverProps = 'hover:border-neutral-300';
const darkProps =
  'dark:bg-neutral-800 dark:border-neutral-700 dark:hover:border-neutral-500 dark:focus:border-primary-dark';
const focusProps =
  'focus:border-primary dark:focus:border-primary-dark [&~label]:focus:-top-7 [&~label]:focus:left-1';

export default function DatePicker({
  label,
  value = '',
  name,
  onChange,
  setValue
}: FieldProps<string, never>) {
  const [open, setOpen] = useState<boolean>(false);

  const _onChange = useCallback(
    (date: Date) => {
      onChange(date);
      setOpen(false);
    },
    [onChange]
  );

  return (
    <div className="relative my-2 w-full">
      <ReactDatePicker
        open={open}
        selected={value ? moment(value).toDate() : null}
        value={value ? moment(value).format('MMMM Do YYYY') : ''}
        disabledKeyboardNavigation
        onChange={_onChange}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClickOutside={() => setOpen(false)}
        calendarStartDay={1}
        nextMonthButtonLabel="Next >"
        previousMonthButtonLabel="< Prev"
        className={`w-full h-11 outline-none bg-neutral-100 border-2 border-neutral-200 rounded-md p-2 cursor-pointer ${hoverProps} ${focusProps} ${darkProps}`}
      />

      <label
        className={`absolute ${!value ? 'top-2.5 left-3' : '-top-7 left-1'}`}
      >
        {label}
      </label>

      <Controls
        value={value}
        onClear={() => {
          onChange(null);
          setValue(name, null);
        }}
        onClick={() => setOpen(prev => !prev)}
        iconModel="calendar"
      />
    </div>
  );
}
