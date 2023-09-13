import { useCallback, useEffect, useState } from 'react';

import { Label, Icon, Box, Popover } from '../../..';
import useDebounce from '../../../../Hooks/useDebounce';
import { StyledInput } from '../Input/Styled';
import { Result } from '../../../Core/Search';
import { SelectProps } from './helpers';
import FakeInput from './FakeInput';

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
      getValues()[name]?.map((x: any) => x?.uid)
    );
  }, [setFormValue, name, getValues]);

  useEffect(() => {
    (async () => {
      if (!props?.fetchFn) return;
      const { data } = await props.fetchFn({ params: { search } });
      setOptions(data);
    })();
  }, [props, search]);

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
    <Box>
      {/* THIS INPUT IS HERE FOR DISPLAY PURPOSES */}
      <FakeInput values={values} onRemove={onRemove} setOpen={setOpen}>
        {/* OPTIONS DROPDOWN */}
        <Popover
          open={open}
          setOpen={setOpen}
          title={label}
          width="100%"
          padding=".5em"
          top="2.2em"
        >
          <StyledInput
            onChange={(e: any) => setSearch(e?.target?.value)}
            value={searchTerm}
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
      </FakeInput>
      <Label
        position="absolute"
        top={!values.length ? '.65em' : '-1.5em'}
        left={!values.length ? '.75em' : '0'}
      >
        {label}
      </Label>

      {/* CLEAR ALL */}
      <Box position="absolute" right=".25em" top=".45em">
        <Icon model="trash" onClick={onClear} size="25px" />
      </Box>
    </Box>
  );
}
