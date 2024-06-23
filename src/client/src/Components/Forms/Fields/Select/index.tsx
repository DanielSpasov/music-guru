import { FC, useCallback, useMemo, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { Option, SelectProps } from './helpers';

import Single from './SingleSelect';
import Multi from './MultiSelect';
import Label from '../Label';
import Error from '../Error';

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
      <Label label={label} required={required} />

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

      <Error message={formState.errors[name]?.message} />
    </div>
  );
};

export default Select;
