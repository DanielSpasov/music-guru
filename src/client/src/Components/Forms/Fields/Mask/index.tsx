import { useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { FC, useRef } from 'react';

import { themeProps } from './styles';
import { MaskProps } from './types';

// Composables
import Label from '../composables/Label';
import Error from '../composables/Error';

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
        className={`w-full border-b-2 p-1 outline-none ${themeProps} ${className}`}
        {...props}
      />

      <Error message={formState.errors[name]?.message} />
    </div>
  );
};

export default Mask;
