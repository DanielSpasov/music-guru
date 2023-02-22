import { memo, useCallback, useEffect, useState } from 'react';

import useDebounce from '../../../Hooks/useDebounce';
import { Label, Icon, Box, Popover } from '../../';
import { StyledInput } from '../Input/Styled';
import { Result } from '../../Core/Search';
import { SelectProps } from './helpers';

function Select({
  setFormValue,
  getValues,
  multiple = false,
  fetchFn,
  label,
  name
}: SelectProps) {
  const [value, setValue] = useState<string[]>(getValues()[name] || []);
  const [searchTerm, setSearch] = useState<string>('');
  const [options, setOptions] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const search = useDebounce({ value: searchTerm, delay: 500 });

  useEffect(() => {
    setFormValue(name, getValues()[name]);
  }, [setFormValue, getValues, name, multiple]);

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
      setSearch('');
      if (multiple) {
        if (value.includes(option.name)) {
          setValue(prev => prev.filter(x => x !== option.name));
          setFormValue(
            name,
            getValues()[name].filter((x: any) => x !== option.uid)
          );
        } else {
          if (value[0] === searchTerm) {
            setValue([option.name]);
          } else {
            setValue(prev => [...prev, option.name]);
          }
          setFormValue(name, [...(getValues()[name] || []), option.uid]);
        }
      } else {
        if (value.includes(option.name)) {
          setValue([]);
          setFormValue(name, []);
        } else {
          setValue([option.name]);
          setFormValue(name, [option.uid]);
        }
      }
    },
    [setFormValue, getValues, name, multiple, value, searchTerm]
  );

  const onClear = useCallback(() => {
    setValue([]);
    setFormValue(name, []);
  }, [setFormValue, name]);

  const onSearch = useCallback(
    (e: any) => {
      if (!getValues()[name].length) {
        setSearch(e?.target?.value);
        setValue([e?.target?.value]);
      }
    },
    [getValues, name]
  );

  return (
    <>
      {/* This input is just a search bar, this is why it's not registered in the form */}
      <StyledInput
        value={value.join(', ')}
        onFocus={toggleOpen}
        onBlur={toggleOpen}
        onChange={onSearch}
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
            selected={value.includes(option.name)}
            onClick={() => onResultClick(option)}
          />
        ))}
      </Popover>
    </>
  );
}

export default memo(Select);
