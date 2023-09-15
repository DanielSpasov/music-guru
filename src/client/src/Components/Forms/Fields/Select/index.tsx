import { useCallback, useEffect, useState } from 'react';
import makeAnimated from 'react-select/animated';

import { Select as StyledSelect } from './Styled';
import { SelectProps } from './helpers';
import { Label, Box } from '../../..';

export default function Select({
  setFormValue,
  getValues,
  props,
  label,
  name,
  validations
}: SelectProps) {
  const [selected, setSelected] = useState<any[]>(
    !props?.multiple
      ? getValues()[name]
        ? [getValues()[name]]
        : []
      : getValues()[name] || []
  );
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      if (!props?.fetchFn) return;
      const { data } = await props.fetchFn({});
      setOptions(data);
    })();
  }, [props]);

  const onChange = useCallback(
    (option: any, settings: any) => {
      switch (settings?.action) {
        case 'clear':
          setSelected([]);
          break;
        default:
          setFormValue(name, props?.multiple ? option : [option]);
          setSelected(props?.multiple ? option : [option]);
      }
    },
    [name, setFormValue, props?.multiple]
  );

  return (
    <Box>
      <StyledSelect
        components={{ ...makeAnimated() }}
        options={options}
        onChange={onChange}
        isMulti={props?.multiple}
        defaultValue={getValues()[name]}
        required={validations?.required}
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
