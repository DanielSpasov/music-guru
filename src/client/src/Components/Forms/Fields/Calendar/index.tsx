import { useCallback, useState } from 'react';
import ReactCalendar from 'react-calendar';
import moment from 'moment';

import { StyledCalendar, StyledInput } from './Styled';
import { Box, Label, Popover } from '../../..';
import { FieldProps } from '../helpers';
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
    <Box>
      <StyledInput
        value={value ? moment(value).format('MMMM Do YYYY') : ''}
        placeholder=" "
        onChange={() => null}
        onClick={() => setOpen(prev => !prev)}
      />
      <Label position="absolute" top=".65em" left=".5em">
        {label}
      </Label>

      <Controls
        value={value}
        onClear={() => _onChange(undefined)}
        onClick={() => setOpen(prev => !prev)}
        iconModel="calendar"
      />

      <Popover open={open} width="100%" padding=".5em" marginTop="-3.5em">
        <StyledCalendar>
          <ReactCalendar
            onChange={_onChange}
            defaultValue={moment(value).toDate()}
          />
        </StyledCalendar>
      </Popover>
    </Box>
  );
}
