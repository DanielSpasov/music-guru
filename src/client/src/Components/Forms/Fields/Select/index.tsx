import { useCallback, useEffect, useMemo, useState } from 'react';
import makeAnimated from 'react-select/animated';
import ReactSelect from 'react-select';

import { SelectProps } from './helpers';
import { FieldProps } from '../helpers';

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
    <div className="relative my-2">
      <ReactSelect
        id={id}
        components={{ ...makeAnimated() }}
        options={options}
        onChange={_onChange}
        isMulti={props?.multiple}
        defaultValue={value}
        formatOptionLabel={option => option?.name}
        getOptionValue={option => option?.uid}
        isSearchable
        placeholder=""
        isClearable
        styles={{
          control: (base, state) => ({
            ...base,
            transition: '200ms',
            marginTop: '0.5em',
            borderWidth: '2px',
            borderRadius: '5px',
            boxShadow: 'none',
            backgroundColor: state.theme.colors.neutral80,
            borderColor: state.isFocused
              ? state.theme.colors.primary
              : state.theme.colors.neutral70,
            '&:hover': {
              borderColor: state.isFocused
                ? state.theme.colors.primary
                : state.theme.colors.neutral60
            }
          }),
          option: (base, state) => ({
            ...base,
            borderRadius: '4px',
            backgroundColor: state.isSelected
              ? state.theme.colors.neutral80
              : state.theme.colors.neutral90,
            '&:hover': {
              backgroundColor: state.theme.colors.neutral80
            }
          }),
          indicatorSeparator: (base, state) => ({
            ...base,
            backgroundColor: state.theme.colors.neutral70
          }),
          clearIndicator: (base, state) => ({
            ...base,
            cursor: 'pointer',
            '&:hover': {
              svg: {
                fill: state.theme.colors.primary
              }
            }
          }),
          dropdownIndicator: (base, state) => ({
            ...base,
            cursor: 'pointer',
            '&:hover': {
              svg: {
                fill: state.theme.colors.primary
              }
            }
          }),
          valueContainer: base => ({
            ...base,
            padding: '4px'
          }),
          multiValue: (base, state) => ({
            ...base,
            backgroundColor: state.theme.colors.neutral70
          }),
          multiValueLabel: base => ({
            ...base,
            color: 'white',
            padding: '.2em'
          }),
          singleValue: base => ({
            ...base,
            color: 'white',
            paddingLeft: '.25em'
          }),
          menu: (base, state) => ({
            ...base,
            backgroundColor: state.theme.colors.neutral90,
            boxShadow: 'rgba(0, 0, 0, 0.45) 0px 0px 5px 3px'
          }),
          multiValueRemove: (base, state) => ({
            ...base,
            '&:hover': {
              backgroundColor: state.theme.colors.danger
            }
          })
        }}
      />

      <label
        className={`absolute ${
          !selected.length ? 'top-2.5 left-3' : '-top-7 left-1'
        }`}
      >
        {label}
      </label>
    </div>
  );
}
