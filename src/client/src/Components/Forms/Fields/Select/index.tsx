import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import makeAnimated from 'react-select/animated';
import ReactSelect from 'react-select';

import { ThemeContext } from '../../../../Contexts';
import { SelectProps, styles } from './helpers';
import { FieldProps } from '../helpers';

export default function Select({
  value = [],
  label,
  name,
  onChange,
  props
}: FieldProps<any[], SelectProps>) {
  const { theme } = useContext(ThemeContext);

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

  const getOptValue = useCallback(
    (opt: any) => {
      if (!props?.getOptionValue) return opt?.uid;
      return props?.getOptionValue(opt);
    },
    [props]
  );

  return (
    <div className="relative my-2 w-full">
      <ReactSelect
        id={id}
        components={{ ...makeAnimated() }}
        options={options}
        onChange={_onChange}
        isMulti={props?.multiple}
        defaultValue={value}
        formatOptionLabel={option => option?.name}
        getOptionValue={getOptValue}
        styles={styles(theme)}
        isSearchable
        placeholder=""
        isClearable
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
