import { memo, useCallback, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

import useDebounce from '../../../Hooks/useDebounce';
import { Label, Icon, Box, Popover } from '../../';
import { StyledInput } from '../Input/Styled';
import { Result } from '../../Core/Search';
import { SelectProps } from './helpers';

function Select({
  setFormValue,
  getValues,
  fetchFn,
  label,
  name
}: SelectProps) {
  const [value, setValue] = useState<string>(getValues()[name]?.name || '');
  const [searchTerm, setSearch] = useState<string>('');
  const [options, setOptions] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const search = useDebounce({ value: searchTerm, delay: 500 });

  useEffect(() => {
    setFormValue('artist', getValues()[name]?.uid);
  }, [setFormValue, getValues, name]);

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
      setFormValue(name, option.uid);
    },
    [setFormValue, name]
  );

  const onClear = useCallback(() => {
    setValue('');
    setFormValue(name, undefined);
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
    <>
      {/* This input is just a search bar, this is why it's not registered in the form */}
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
        {label}
      </Label>

      <Icon
        model="x"
        type="solid"
        variant="danger"
        onClick={onClear}
        position="absolute"
        fontSize="1em"
        right=".75rem"
        top="2.25rem"
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

export default memo(Select);
