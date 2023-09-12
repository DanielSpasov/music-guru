import { useCallback, useEffect, useMemo, useState } from 'react';
import { default as ReactCalendar } from 'react-calendar';
import moment from 'moment';

import { Box, Icon, Label, Popover } from '../../..';
import { StyledInput } from '../Input/Styled';
import { StyledCalendar } from './Styled';
import { CalendarProps } from './helpers';

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

  const toggleOpen = useCallback(
    () => setTimeout(() => setOpen(prev => !prev), 100),
    []
  );

  const onChange = useCallback(
    (date: Date) => {
      setFormValue(name, date);
      setValue(date);
      setOpen(false);
    },
    [setFormValue, name]
  );

  return (
    <Box>
      {/* CALENDAR ICON */}
      <Box position="absolute" zIndex="1" top=".5em" left=".25em">
        <Icon
          model="calendar"
          onClick={toggleOpen}
          variant={open ? 'primary' : undefined}
          size="25px"
        />
      </Box>

      {/* MAIN INPUT */}
      <StyledInput
        value={value ? moment(value).format('MMMM Do YYYY') : ''}
        placeholder=" "
        onChange={() => null}
        paddingLeft="2.2em"
        onClick={toggleOpen}
        disableCaret
      />
      <Label position="absolute" top=".65em" left="2.2em">
        {label}
      </Label>

      {/* CLEAR ALL */}
      <Box position="absolute" right=".25em" top=".45em">
        <Icon model="trash" onClick={() => setValue(undefined)} size="25px" />
      </Box>

      {/* CALENDAR POPOVER */}
      <Popover open={open} width="100%" minHeight="260px">
        <StyledCalendar>
          <ReactCalendar onChange={onChange} defaultValue={defaultValue} />
        </StyledCalendar>
      </Popover>
    </Box>
  );
}
