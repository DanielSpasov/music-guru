import { useFormContext } from 'react-hook-form';
import { FC, useState } from 'react';

import { InputProps } from './helpers';
import { Icon } from '../../../Common';
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

      {inputType === 'password' && (
        <Icon
          model={type === 'password' ? 'hide' : 'show'}
          onClick={() =>
            setType(prev => (prev === 'text' ? 'password' : 'text'))
          }
          className="absolute right-0 top-5 w-5"
        />
      )}
    </div>
  );
};

export default Input;
