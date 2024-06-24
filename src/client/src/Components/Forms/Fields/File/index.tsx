import { useFormContext } from 'react-hook-form';
import { FC, useCallback, useMemo, useRef } from 'react';

import { FileProps } from './helpers';
import { IX } from '../../../Icons';
import Error from '../Error';
import Label from '../Label';

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

  const fieldRef = useRef<HTMLInputElement>(null);

  const onClear = useCallback(() => {
    if (!fieldRef.current) return;
    fieldRef.current.files = null;
    setValue(name, null);
    clearErrors(name);
  }, [setValue, name, clearErrors, fieldRef]);

  const openUpload = useCallback(() => {
    if (fieldRef.current) fieldRef.current.click();
  }, [fieldRef]);

  const file = watch(name);
  const showClose = useMemo(() => {
    if (file instanceof FileList) return file.length > 1;
    return Boolean(file);
  }, [file]);

  return (
    <div className="relative my-2 w-full">
      <Label label={label} required={required} />

      <div
        tabIndex={0}
        onKeyDown={e => {
          if (e.key !== 'Enter') return;
          openUpload();
        }}
        onClick={() => openUpload()}
        className={`block w-full h-[2.125rem] border-b-2 border-neutral-300 py-1 cursor-pointer outline-none ${hoverProps} ${focusProps} ${darkProps} ${className}`}
      >
        <p className="px-1.5">{watch(name)?.name}</p>
      </div>

      <input
        className="hidden"
        {...register(name, {
          required,
          onChange: e => setValue(name, e.target.files[0])
        })}
        ref={fieldRef}
        {...props}
        type="file"
      />

      <Error message={formState.errors[name]?.message} />

      {showClose && (
        <IX
          onClick={() => onClear()}
          className="absolute top-7 right-0 w-6 h-6"
        />
      )}
    </div>
  );
};

export default File;
