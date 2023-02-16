import { useCallback, useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';

import useDebounce from '../../../../Hooks/useDebounce';
import { Label, Icon, Box, Popover } from '../../../';
import { Result } from '../../../Core/Search';
import { InputProps } from '../helpers';
import { StyledInput } from './Text';
import { isEmpty } from 'lodash';

export default function Select({
  name,
  label,
  fetchFn,
  setFormValue,
  getValues
}: InputProps) {
  const { colors } = useContext(ThemeContext);

  const [searchTerm, setSearch] = useState<string>('');
  const [options, setOptions] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const search = useDebounce({ value: searchTerm, delay: 500 });

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
    // sadge
    if (!isEmpty(getValues()?.artist)) return;
    setTimeout(() => setOpen(prev => !prev), 100);
  }, [getValues]);

  const onResultClick = useCallback(
    (option: any) => {
      setValue(option.name);
      setFormValue('artist', option);
    },
    [setFormValue]
  );

  const onClear = useCallback(() => {
    setValue('');
    setFormValue('artist', null);
  }, [setFormValue]);

  const onChange = useCallback(
    (e: any) => {
      if (isEmpty(getValues()?.artist)) {
        setSearch(e?.target?.value);
        setValue(e?.target?.value);
      }
    },
    [getValues]
  );

  return (
    <>
      <StyledInput
        disabled={!isEmpty(getValues()?.artist)}
        onFocus={toggleOpen}
        onBlur={toggleOpen}
        onChange={onChange}
        value={value}
        placeholder=" "
        name={name}
        type="text"
      />
      <Label position="absolute" top="36px" left="10px">
        {label}
      </Label>

      <Icon
        model="x"
        type="solid"
        color={colors.danger}
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
  );
}
