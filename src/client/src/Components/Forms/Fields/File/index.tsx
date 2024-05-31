import { useFormContext } from 'react-hook-form';
import { FC, useCallback, useMemo } from 'react';

import { Icon } from '../../../Common';
import { FileProps } from './helpers';

const hoverProps = 'hover:border-dashed hover:border-neutral-400';
const focusProps = 'focus:border-dashed focus:border-primary';
const darkProps =
  'dark:bg-neutral-900 dark:border-neutral-600 dark:hover:border-neutral-500 dark:focus:border-primary-dark';

const File: FC<FileProps> = ({
  name,
  label,
  className,
  required = false,
  ...props
}) => {
  const { register, formState, watch, setValue, clearErrors } =
    useFormContext();

  const id = useMemo(() => `${name}-input`, [name]);

  const onClear = useCallback(() => {
    const input = document.getElementById(id) as HTMLInputElement;
    input.files = null;
    setValue(name, null);
    clearErrors(name);
  }, [id, setValue, name, clearErrors]);

  const openUpload = useCallback(() => {
    const field = document.getElementById(id);
    if (field) field.click();
  }, [id]);

  return (
    <div className="relative my-2 w-full">
      <label
        tabIndex={0}
        onKeyDown={e => {
          if (e.key !== 'Enter') return;
          openUpload();
        }}
        onClick={() => openUpload()}
        className={`block w-full h-[3.625em] border-b-2 border-neutral-300 p-1 cursor-pointer outline-none ${hoverProps} ${focusProps} ${darkProps} ${className}`}
      >
        {label} <span className="text-red-400">{required && '*'}</span>
        <p>{watch(name)?.name}</p>
      </label>

      <input
        id={id}
        className="hidden"
        {...register(name, {
          required,
          onChange: e => setValue(name, e.target.files[0])
        })}
        {...props}
        type="file"
      />

      <span className="text-red-400">
        {formState.errors[name]?.message?.toString()}
      </span>

      {watch(name) && (
        <Icon
          model="close"
          onClick={() => onClear()}
          className="absolute top-7 right-0 w-6 h-6"
        />
      )}
    </div>
  );
};

export default File;
