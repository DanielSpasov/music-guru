import { useFormContext } from 'react-hook-form';
import { FC, useState } from 'react';

import { IEye, IEyeSlash } from '../../../Icons';
import { InputProps } from './helpers';
import Label from '../Label';
import Error from '../Error';

const hoverProps = 'hover:border-neutral-400';
const focusProps = 'focus:border-primary dark:focus:border-primary-dark';
const darkProps =
  'dark:bg-neutral-900 dark:border-neutral-600 dark:hover:border-neutral-500';

const Input: FC<InputProps> = ({
  name,
  label,
  required = false,
  className,
  sideEffect,
  type: inputType,
  ...props
}) => {
  const { register, formState, ...formContextProps } = useFormContext();

  const [type, setType] = useState(inputType);

  return (
    <div className="relative my-2 w-full">
      <Label label={label} required={required} />

      <input
        {...register(name, {
          required,
          onChange: e => {
            if (sideEffect) sideEffect(e, { formState, ...formContextProps });
          }
        })}
        className={`w-full border-b-2 border-neutral-300 p-1 outline-none ${darkProps} ${focusProps} ${hoverProps} ${className}`}
        type={type}
        {...props}
      />

      <Error message={formState.errors[name]?.message} />

      {inputType === 'password' &&
        (type === 'password' ? (
          <IEyeSlash
            className="absolute right-0 top-5 w-5"
            onClick={() =>
              setType(prev => (prev === 'text' ? 'password' : 'text'))
            }
          />
        ) : (
          <IEye
            className="absolute right-0 top-5 w-5"
            onClick={() =>
              setType(prev => (prev === 'text' ? 'password' : 'text'))
            }
          />
        ))}
    </div>
  );
};

export default Input;
