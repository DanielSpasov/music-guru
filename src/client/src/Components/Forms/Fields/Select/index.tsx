import { useCallback, useEffect, useState, useContext } from 'react';
import { default as ReactSelect } from 'react-select';
import { ThemeContext } from 'styled-components';

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

  const { colors } = useContext(ThemeContext);

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
      <ReactSelect
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
        styles={{
          control: (base, state) => ({
            ...base,
            marginTop: '.5em',
            backgroundColor: colors.baseLight,
            borderColor: state.isFocused ? colors.primary : colors.baseLighter,
            borderWidth: '2px',
            borderRadius: '5px',
            boxShadow: 'none',
            '&:hover': {
              borderColor: state.isFocused
                ? colors.primary
                : colors.baseLightest
            }
          }),
          multiValueLabel: base => ({ ...base, color: colors.text }),
          singleValue: base => ({ ...base, color: colors.text }),
          multiValue: base => ({
            ...base,
            backgroundColor: colors.baseLightest,
            padding: '.2em'
          }),
          valueContainer: (base, state) => ({
            ...base,
            ...(state.isMulti ? { padding: '.1em' } : {})
          }),
          menu: base => ({
            ...base,
            backgroundColor: colors.base,
            boxShadow: 'rgba(0, 0, 0, 0.45) 0px 0px 5px 3px'
          }),
          option: (base, state) => ({
            ...base,
            borderRadius: '5px',
            backgroundColor: state.isSelected ? colors.baseLight : colors.base,
            '&:hover': { backgroundColor: colors.baseLight }
          }),
          clearIndicator: base => ({
            ...base,
            '&:hover': { color: colors.primary }
          }),
          dropdownIndicator: base => ({
            ...base,
            '&:hover': { color: colors.primary }
          }),
          indicatorSeparator: base => ({
            ...base,
            backgroundColor: colors.baseLightest
          })
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
