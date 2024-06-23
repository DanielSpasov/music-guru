import { useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { FC, useRef } from 'react';

import { MaskProps } from './helpers';
import Label from '../Label';
import Error from '../Error';

const hoverProps = 'hover:border-neutral-400';
const focusProps = 'focus:border-primary dark:focus:border-primary-dark';
const darkProps =
  'dark:bg-neutral-900 dark:border-neutral-600 dark:hover:border-neutral-500';

const Mask: FC<MaskProps> = ({
  name,
  label,
  required,
  className,
  ...props
}) => {
  const { register, formState, getValues } = useFormContext();

  const defaultValue = useRef(getValues()[name]);

  return (
    <div className="relative my-2 w-full">
      <Label label={label} required={required} />

      <InputMask
        {...register(name, { required })}
        placeholder="mm/dd/yyyy"
        defaultValue={defaultValue.current}
        maskChar={null}
        className={`w-full border-b-2 border-b-neutral-300 p-1 outline-none ${hoverProps} ${darkProps} ${focusProps} ${className}`}
        {...props}
      />

      <Error message={formState.errors[name]?.message} />
    </div>
  );
};

export default Mask;
