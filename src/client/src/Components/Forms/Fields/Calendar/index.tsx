import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactCalendar from 'react-calendar';
import moment from 'moment';

import { StyledCalendar, StyledInput } from './Styled';
import { Box, Icon, Label, Popover } from '../../..';
import { CalendarProps } from './helpers';
import Controls from '../Controls';

export default function Calendar({
  label,
  name,
  setFormValue,
  getValues
}: CalendarProps) {
  const defaultValue = useMemo(
    () => (getValues()[name] ? moment(getValues()[name]).toDate() : undefined),
    [getValues, name]
  );

  const [value, setValue] = useState<Date | undefined>(defaultValue);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!getValues()[name]) setFormValue(name, undefined);
  }, [getValues, name, setFormValue]);

  const onChange = useCallback(
    (date: Date | undefined) => {
      setFormValue(name, date);
      setValue(date);
      setOpen(false);
    },
    [setFormValue, name]
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
        onClear={() => onChange(undefined)}
        customIcon={
          <Icon
            model="calendar"
            size="20px"
            onClick={() => setOpen(prev => !prev)}
          />
        }
      />

      <Popover open={open} width="100%" padding=".5em" marginTop="-3.5em">
        <StyledCalendar>
          <ReactCalendar onChange={onChange} defaultValue={defaultValue} />
        </StyledCalendar>
      </Popover>
    </Box>
  );
}
