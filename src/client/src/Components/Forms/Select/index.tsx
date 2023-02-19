import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { isEmpty } from 'lodash';

import useDebounce from '../../../Hooks/useDebounce';
import { Label, Icon, Box, Popover, Text } from '../../';
import { StyledInput } from '../Input/Styled';
import { Result } from '../../Core/Search';
import { SelectProps } from './helpers';

function Select({
  setFormValue,
  getValues,
  required,
  fetchFn,
  label,
  error,
  name
}: SelectProps) {
  const [searchTerm, setSearch] = useState<string>('');
  const [options, setOptions] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const search = useDebounce({ value: searchTerm, delay: 500 });
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    (async () => {
      if (!fetchFn) return;
      const { data } = await fetchFn({ params: { search } });
      setOptions(data);
    })();
  }, [fetchFn, search]);

  const toggleOpen = useCallback(() => {
    // In case you wondering what this is:
    // if onBlur event triggers before the onResultClick, no result is saved
    setTimeout(() => setOpen(prev => !prev), 50);
  }, []);

  const onResultClick = useCallback(
    (option: any) => {
      setValue(option.name);
      setFormValue(name, option);
    },
    [setFormValue, name]
  );

  const onClear = useCallback(() => {
    setValue('');
    setFormValue(name, null);
  }, [setFormValue, name]);

  const onChange = useCallback(
    (e: any) => {
      if (isEmpty(getValues()[name])) {
        setSearch(e?.target?.value);
        setValue(e?.target?.value);
      }
    },
    [getValues, name]
  );

  return (
    <Box position="relative" margin=".5em 0">
      <Box display="flex" justifyContent="flex-end">
        <Text color={required ? colors.danger : 'gray'}>
          {required ? '*' : 'Optional'}
        </Text>
      </Box>

      <>
        <StyledInput
          onFocus={toggleOpen}
          onBlur={toggleOpen}
          onChange={onChange}
          value={value}
          placeholder=" "
          name={name}
          type="text"
        />
        <Label position="absolute" top="36px" left="10px">
          {label}TYEST
        </Label>

        <Icon
          model="x"
          type="solid"
          variant="danger"
          onClick={onClear}
          position="absolute"
          fontSize="1em"
          right=".75em"
          top="2.25em"
        />

        <Popover open={open} width="100%" top="65px">
          {!options.length && <Box textAlign="center">No Results.</Box>}
          {options.map((option: any) => (
            <Result
              key={option.uid}
              data={option}
              onClick={() => onResultClick(option)}
            />
          ))}
        </Popover>
      </>

      {error && <Text color={colors.danger}>{error?.message}</Text>}
    </Box>
  );
}

export default memo(Select);
