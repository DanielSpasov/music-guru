import { useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { FC } from 'react';

import { MaskProps } from './helpers';

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
  const { register, formState } = useFormContext();

  return (
    <div className="relative my-2 w-full">
      <label>
        {label} <span className="text-red-400">{required && '*'}</span>
      </label>

      <InputMask
        {...register(name, { required })}
        placeholder="mm/dd/yyyy"
        className={`w-full border-b-2 border-b-neutral-300 p-1 outline-none ${hoverProps} ${darkProps} ${focusProps} ${className}`}
        {...props}
      />

      <span className="text-red-400">
        {formState.errors[name]?.message?.toString()}
      </span>
    </div>
  );
};

export default Mask;
