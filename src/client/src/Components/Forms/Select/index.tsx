import { memo, useCallback, useEffect, useMemo, useState } from 'react';

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
  const defaultValue = useMemo(
    () => getValues()[name].map((x: any) => x?.name),
    [getValues, name]
  );

  const [options, setOptions] = useState<any[]>([]);
  const [value, setValue] = useState<string[]>(defaultValue || []);
  const [searchTerm, setSearch] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const search = useDebounce({ value: searchTerm, delay: 500 });

  useEffect(() => {
    setFormValue(
      name,
      getValues()[name].map((x: any) => x?.uid)
    );
  }, [setFormValue, name, getValues]);

  useEffect(() => {
    (async () => {
      if (!fetchFn) return;
      const { data } = await fetchFn({ params: { search } });
      setOptions(data);
    })();
  }, [fetchFn, search]);

  const toggleOpen = useCallback(
    () => setTimeout(() => setOpen(prev => !prev), 50),
    []
  );

  const onClear = useCallback(() => {
    setValue([]);
    setFormValue(name, []);
  }, [setFormValue, name]);

  const onClickMultiple = useCallback(
    (option: any) => {
      if (value.includes(option.name)) {
        const filterFn = (key: string) => (x: any) => x !== option[key];
        setValue(prev => prev.filter(filterFn('name')));
        setFormValue(name, getValues()[name].filter(filterFn('uid')));
        return;
      }

      setValue(prev => [...prev, option.name]);
      setFormValue(name, [...(getValues()[name] || []), option.uid]);
    },
    [getValues, name, value, setFormValue]
  );

  const onClickSingle = useCallback(
    (option: any) => {
      if (value.includes(option.name)) {
        onClear();
        return;
      }

      setValue([option.name]);
      setFormValue(name, [option.uid]);
    },
    [name, onClear, setFormValue, value]
  );

  return (
    <>
      {/* This input is for display purposes */}
      <StyledInput
        value={value.join(', ')}
        onFocus={toggleOpen}
        onBlur={toggleOpen}
        onChange={() => null}
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
        <StyledInput
          onChange={(e: any) => setSearch(e?.target?.value)}
          value={searchTerm}
          onFocus={toggleOpen}
          onBlur={toggleOpen}
          placeholder="Search..."
          name={name}
          type="text"
        />
        {!options.length && <Box textAlign="center">No Results.</Box>}
        {options.map(option => (
          <Result
            key={option.uid}
            data={option}
            selected={value.includes(option.name)}
            onClick={() =>
              multiple ? onClickMultiple(option) : onClickSingle(option)
            }
          />
        ))}
      </Popover>
    </>
  );
}

export default memo(Select);
