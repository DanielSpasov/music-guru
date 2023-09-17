import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from 'styled-components';
import ReactCalendar from 'react-calendar';
import moment from 'moment';

import { Box, Icon, Label, Popover, Text } from '../../..';
import { StyledCalendar, StyledInput } from './Styled';
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

  const { colors } = useContext(ThemeContext);

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

      <Box
        position="absolute"
        height="100%"
        padding="2px"
        right="0"
        top="0"
        className="css-4xgw5l-IndicatorsContainer2"
      >
        <Box className="css-1xc3v61-indicatorContainer">
          {value && (
            <Icon
              model="close"
              size="20px"
              onClick={() => onChange(undefined)}
            />
          )}
        </Box>
        <Text
          className="css-1u9des2-indicatorSeparator"
          style={{ backgroundColor: colors.baseLightest }}
        />
        <Box className="css-1xc3v61-indicatorContainer">
          <Icon
            model="calendar"
            size="20px"
            onClick={() => setOpen(prev => !prev)}
          />
        </Box>
      </Box>

      <Popover open={open} width="100%" padding=".5em" marginTop="-3.5em">
        <StyledCalendar>
          <ReactCalendar onChange={onChange} defaultValue={defaultValue} />
        </StyledCalendar>
      </Popover>
    </Box>
  );
}
