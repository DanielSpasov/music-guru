import { useCallback, useMemo, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { Option, SelectProps } from './types';

import Single from './SingleSelect';
import Multi from './MultiSelect';

// Composables
import Label from '../composables/Label';
import Error from '../composables/Error';

const Select = <T extends Option>({
  multiple = false,
  label,
  required,
  name,
  fetchFn,
  hideSearch,
  placeholder,
  ...props
}: SelectProps<T>) => {
  const { register, formState, setValue, trigger, getValues } =
    useFormContext();

  const defaultValue = useRef(getValues()[name]);

  const SelectComponent = useMemo(
    () => (multiple ? Multi : Single),
    [multiple]
  );

  const onChange = useCallback(
    async (value: Option | Option[] | null) => {
      setValue(name, value);
      if (formState.isSubmitted) trigger(name);
    },
    [name, setValue, formState, trigger]
  );

  return (
    <div className="relative my-2 w-full">
      <Label label={label} required={required} />

      <SelectComponent<T>
        defaultValue={defaultValue.current}
        placeholder={placeholder}
        hideSearch={hideSearch}
        onChange={onChange}
        fetchFn={fetchFn}
      />

      <select
        {...register(name, {
          required,
          value: multiple ? [] : null
        })}
        {...props}
        multiple={multiple}
        className="hidden"
      />

      <Error message={formState.errors[name]?.message} />
    </div>
  );
};

export default Select;
