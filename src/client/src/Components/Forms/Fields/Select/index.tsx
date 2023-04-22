import { useCallback, useEffect, useState } from 'react';

import { Label, Icon, Box, Popover, Tag } from '../../..';
import useDebounce from '../../../../Hooks/useDebounce';
import { StyledInput } from '../Input/Styled';
import { Result } from '../../../Core/Search';
import { SelectProps } from './helpers';

export default function Select({
  setFormValue,
  getValues,
  props,
  label,
  name
}: SelectProps) {
  const [values, setValues] = useState<any[]>(getValues()?.[name] || []);
  const [searchTerm, setSearch] = useState<string>('');
  const [options, setOptions] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const search = useDebounce({ value: searchTerm, delay: 500 });

  useEffect(() => {
    setFormValue(
      name,
      getValues()[name]?.map((x: any) => x.uid)
    );
  }, [setFormValue, name, getValues]);

  useEffect(() => {
    (async () => {
      if (!props?.fetchFn) return;
      const { data } = await props.fetchFn({ params: { search, limit: 5 } });
      setOptions(data);
    })();
  }, [props, search]);

  const toggleOpen = useCallback(
    () => setTimeout(() => setOpen(prev => !prev), 50),
    []
  );

  const onClear = useCallback(() => {
    setValues([]);
    setFormValue(name, []);
  }, [setFormValue, name]);

  const onRemove = useCallback(
    (option: any) => {
      setValues(prev => prev.filter(x => x.name !== option.name));
      setFormValue(
        name,
        getValues()[name]?.filter((x: any) => x !== option.uid)
      );
    },
    [setFormValue, getValues, name]
  );

  const onClick = useCallback(
    (option: any) => {
      if (values.find(x => x.uid === option.uid)) {
        onRemove(option);
        return;
      }

      if (props?.multiple) {
        setValues(prev => [...prev, option]);
        setFormValue(name, [...(getValues()[name] || []), option.uid]);
      } else {
        setValues([option]);
        setFormValue(name, [option.uid]);
      }
    },
    [getValues, setFormValue, name, props, onRemove, values]
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
          <Tag key={x.uid} onClick={() => onRemove(x)}>
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
        disableCaret
        color="transparent"
      />
      <Label position="absolute" top="36px" left="10px">
        {label}
      </Label>

      {/* CLEAR ALL */}
      <Icon
        model="trash"
        type="solid"
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
            onClick={() => onClick(option)}
          />
        ))}
      </Popover>
    </>
  );
}
