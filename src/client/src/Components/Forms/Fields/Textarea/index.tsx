import { useFormContext } from 'react-hook-form';

import { TextareaProps } from './helpers';

const hoverProps = 'hover:border-neutral-400';
const focusProps =
  'focus:border-primary [&~label]:focus:-top-7 [&~label]:focus:left-1';
const darkProps =
  'dark:bg-neutral-900 dark:border-neutral-600 dark:hover:border-neutral-500 dark:focus:border-primary-dark';

export default function Textarea({
  name,
  label,
  required = false,
  className,
  ...props
}: TextareaProps) {
  const { register, formState } = useFormContext();

  return (
    <div className="relative my-2 w-full">
      <label>
        {label} <span className="text-red-400">{required && '*'}</span>
      </label>

      <textarea
        {...register(name, { required })}
        className={`w-full min-h-[80px] border-b-2 p-1 pr-16 border-neutral-300 outline-none resize-y ${hoverProps} ${focusProps} ${darkProps} ${className}`}
        {...props}
      ></textarea>

      <span className="text-red-400">
        {formState.errors[name]?.message?.toString()}
      </span>
    </div>
  );
}
