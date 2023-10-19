import { useCallback, useEffect, useMemo, useState } from 'react';
import makeAnimated from 'react-select/animated';

import { SelectProps, handleMenuClose } from './helpers';
import { Select as StyledSelect } from './Styled';
import { FieldProps } from '../helpers';
import { Label, Box } from '../../..';

export default function Select({
  value = [],
  label,
  name,
  onChange,
  props
}: FieldProps<any[], SelectProps>) {
  const [selected, setSelected] = useState<any[]>(value);
  const [options, setOptions] = useState<any[]>([]);

  const id = useMemo(() => `${name}-select-menu`, [name]);

  useEffect(() => {
    (async () => {
      if (!props?.fetchFn) return;
      const { data } = await props.fetchFn({});
      setOptions(data);
    })();
  }, [props]);

  const _onChange = useCallback(
    (option: any, settings: any) => {
      if (settings?.action === 'clear') return setSelected([]);
      const value = props?.multiple ? option : [option];
      onChange({ target: { value } });
      setSelected(value);
    },
    [onChange, props?.multiple]
  );

  return (
    <Box>
      <StyledSelect
        id={id}
        components={{ ...makeAnimated() }}
        onMenuClose={() => handleMenuClose(id)}
        options={options}
        onChange={_onChange}
        isMulti={props?.multiple}
        defaultValue={value}
        formatOptionLabel={option => option?.name}
        getOptionValue={option => option?.uid}
        isSearchable
        placeholder=""
        isClearable
        classNames={{
          control: state => (state.isFocused ? 'control--focused' : 'control'),
          option: state => (state.isSelected ? 'option--selected' : 'option'),
          valueContainer: state => (state.isMulti ? 'valueContainer' : ''),
          indicatorSeparator: () => 'indicatorSeparator',
          dropdownIndicator: () => 'dropdownIndicator',
          clearIndicator: () => 'clearIndicator',
          multiValue: () => 'multiValue',
          multiValueLabel: () => 'label',
          singleValue: () => 'label',
          menu: () => 'menu'
        }}
      />

      <Label
        position="absolute"
        top={!selected.length ? '.65em' : '-1.5em'}
        left={!selected.length ? '.75em' : '0'}
      >
        {label}
      </Label>
    </Box>
  );
}
