import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import useDebounce from '../../../Hooks/useDebounce';
import { Label, Icon, Box, Popover, Tag } from '../../';
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
  const defaultValue = useMemo<any[]>(
    () => getValues()[name] || [],
    [getValues, name]
  );

  const [values, setValues] = useState<any[]>(defaultValue);
  const [searchTerm, setSearch] = useState<string>('');
  const [options, setOptions] = useState<any[]>([]);
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
    setValues([]);
    setFormValue(name, []);
  }, [setFormValue, name]);

  const onClickMultiple = useCallback(
    (option: any) => {
      if (values.find(x => x.uid === option.uid)) {
        setValues(prev => prev.filter(x => x.name !== option.name));
        setFormValue(
          name,
          getValues()[name].filter((x: any) => x !== option.uid)
        );
        return;
      }

      setValues(prev => [...prev, option]);
      setFormValue(name, [...getValues()[name], option.uid]);
    },
    [getValues, name, values, setFormValue]
  );

  const onClickSingle = useCallback(
    (option: any) => {
      if (values.find(x => x.uid === option.uid)) {
        onClear();
        return;
      }

      setValues([option]);
      setFormValue(name, [option.uid]);
    },
    [name, onClear, setFormValue, values]
  );

  return (
    <>
      {/* TAG BOX */}
      <Box
        zIndex="1"
        position="absolute"
        display="flex"
        padding=".35em"
        margin="0.5em 0"
      >
        {values.map(x => (
          <Tag
            key={x.uid}
            onClick={() => (multiple ? onClickMultiple(x) : onClickSingle(x))}
          >
            {x.name}
          </Tag>
        ))}
      </Box>

      {/* THIS INPUT IS HERE FOR DISPLAY PURPOSES */}
      <StyledInput
        value={values.map(x => x.name).join(' ')}
        onChange={() => null}
        onFocus={toggleOpen}
        onBlur={toggleOpen}
        placeholder=" "
        name={name}
        type="text"
        color="transparent"
      />
      <Label position="absolute" top="36px" left="10px">
        {label}
      </Label>

      {/* CLEAR ALL */}
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

      {/* OPTIONS DROPDOWN */}
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
            selected={values.find(x => x.uid === option.uid)}
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
