import { FC, useCallback, useMemo, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { Option, SelectProps } from './helpers';

import Single from './SingleSelect';
import Multi from './MultiSelect';

const Select: FC<SelectProps> = ({
  multiple = false,
  label,
  required,
  name,
  fetchFn,
  hideSearch,
  placeholder,
  ...props
}) => {
  const { register, formState, setValue, trigger, getValues } =
    useFormContext();

  const defaultValue = useRef(getValues()[name]);

  const SelectComponent = useMemo(
    () => (multiple ? Multi : Single),
    [multiple]
  );

  const onChange = useCallback(
    async (value: Option | Option[]) => {
      setValue(name, value);
      if (formState.isSubmitted) trigger(name);
    },
    [name, setValue, formState, trigger]
  );

  return (
    <div className="relative my-2 w-full">
      <label>
        {label} <span className="text-red-400">{required && '*'}</span>
      </label>

      <SelectComponent
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

      <span className="text-red-400">
        {formState.errors[name]?.message?.toString()}
      </span>
    </div>
  );
};

export default Select;
