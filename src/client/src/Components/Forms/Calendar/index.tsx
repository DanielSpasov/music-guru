import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { default as ReactCalendar } from 'react-calendar';
import moment from 'moment';

import { StyledInput } from '../Input/Styled';
import { StyledCalendar } from './Styled';
import { CalendarProps } from './helpers';
import { Icon, Popover } from '../../';

function Calendar({ name, setFormValue, getValues }: CalendarProps) {
  const defaultValue = useMemo(
    () => (getValues()[name] ? new Date(getValues()[name]) : undefined),
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
    },
    [setFormValue, name]
  );

  return (
    <>
      <Icon
        model="calendar"
        type="regular"
        position="absolute"
        zIndex="1"
        left=".3em"
        top="1.3em"
        onClick={toggleOpen}
        variant={open ? 'primary' : undefined}
      />
      <StyledInput
        value={value ? moment(value).format('MMMM Do YYYY') : ''}
        placeholder="Select Date"
        onChange={() => null}
        paddingLeft="2.2em"
        onFocus={toggleOpen}
        onBlur={toggleOpen}
        disableCaret
      />

      <Icon
        model="x"
        type="solid"
        variant="danger"
        onClick={() => setValue(undefined)}
        position="absolute"
        fontSize="1em"
        right=".75rem"
        top="2.25rem"
      />

      <Popover open={open} width="100%" minHeight="260px">
        <StyledCalendar>
          <ReactCalendar onChange={onChange} defaultValue={defaultValue} />
        </StyledCalendar>
      </Popover>
    </>
  );
}

export default memo(Calendar);
