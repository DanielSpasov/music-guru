import { useCallback, useState } from 'react';
import ReactCalendar from 'react-calendar';
import moment from 'moment';

import { StyledCalendar, StyledInput } from './Styled';
import { FieldProps } from '../helpers';
import { Popover } from '../../..';
import Controls from '../Controls';

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
    <div className="relative">
      <StyledInput
        value={value ? moment(value).format('MMMM Do YYYY') : ''}
        placeholder=" "
        onChange={() => null}
        onClick={() => setOpen(prev => !prev)}
      />
      <label className="absolute top-3 left-3">{label}</label>

      <Controls
        value={value}
        onClear={() => _onChange(undefined)}
        onClick={() => setOpen(prev => !prev)}
        iconModel="calendar"
      />

      <Popover open={open}>
        <StyledCalendar>
          <ReactCalendar
            onChange={_onChange}
            defaultValue={moment(value).toDate()}
          />
        </StyledCalendar>
      </Popover>
    </div>
  );
}
