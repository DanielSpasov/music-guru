import { useFormContext } from 'react-hook-form';
import { FC } from 'react';

import { InputProps } from './helpers';

const hoverProps = 'hover:border-neutral-400';
const focusProps = 'focus:border-primary dark:focus:border-primary-dark';
const darkProps =
  'dark:bg-neutral-900 dark:border-neutral-600 dark:hover:border-neutral-500';

const Input: FC<InputProps> = ({
  name,
  label,
  required = false,
  className,
  ...props
}) => {
  const { register, formState } = useFormContext();

  return (
    <div className="relative my-2 w-full">
      <label>
        {label} <span className="text-red-400">{required && '*'}</span>
      </label>

      <input
        {...register(name, { required })}
        className={`w-full border-b-2 border-neutral-300 p-1 outline-none ${darkProps} ${focusProps} ${hoverProps} ${className}`}
        {...props}
      />

      <span className="text-red-400">
        {formState.errors[name]?.message?.toString()}
      </span>
    </div>
  );
};

export default Input;
