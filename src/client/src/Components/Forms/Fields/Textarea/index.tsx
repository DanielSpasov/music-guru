import { useFormContext } from 'react-hook-form';
import { FC } from 'react';

import { TextareaProps } from './types';
import { themeProps } from './styles';

// Composables
import Label from '../composables/Label';
import Error from '../composables/Error';

const Textarea: FC<TextareaProps> = ({
  name,
  label,
  required = false,
  className,
  ...props
}) => {
  const { register, formState } = useFormContext();

  return (
    <div className="relative my-2 w-full">
      <Label label={label} required={required} />

      <textarea
        {...register(name, { required })}
        className={`w-full min-h-[80px] border-b-2 p-1 pr-16 outline-none resize-y bg-transparent ${themeProps} ${className}`}
        {...props}
      ></textarea>

      <Error message={formState.errors[name]?.message} />
    </div>
  );
};

export default Textarea;
