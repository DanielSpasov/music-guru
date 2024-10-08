import { useFormContext } from 'react-hook-form';
import { FC, useState } from 'react';

import { IEye, IEyeSlash } from '../../../Icons';
import { disabledProps, themeProps } from './styles';
import { InputProps } from './types';

// Composables
import Label from '../composables/Label';
import Error from '../composables/Error';

const Input: FC<InputProps> = ({
  name,
  label,
  required = false,
  disabled = false,
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
        disabled={disabled}
        className={`w-full border-b-2 p-1 outline-none bg-transparent ${
          disabled ? disabledProps : themeProps
        } ${className}`}
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
