import { FieldProps } from '../helpers';
import { InputProps } from './helpers';
import { useInput } from './useInput';
import Controls from '../Controls';
import File from './File';

const hoverProps = 'hover:border-neutral-300';
const focusProps =
  'focus:border-primary dark:focus:border-primary-dark [&~label]:focus:-top-7 [&~label]:focus:left-1';
const darkProps =
  'dark:bg-neutral-800 dark:border-neutral-600 dark:hover:border-neutral-500';

export default function Input({
  props,
  name,
  label,
  onChange,
  setValue,
  value = '',
  validateField
}: FieldProps<string | File, InputProps>) {
  const { iconModel, id, inputType, _onIconClick, _onChange, _onClear } =
    useInput({
      name,
      type: props?.type,
      onChange,
      setValue,
      validateField
    });

  return (
    <div className="relative my-2 w-full">
      {props?.type === 'file' ? (
        <File
          id={id}
          name={name}
          label={label}
          value={value as File}
          _onChange={_onChange}
          accept={props.accept}
        />
      ) : (
        <>
          <input
            id={id}
            name={name}
            value={value as string}
            type={inputType}
            onChange={_onChange}
            placeholder=" "
            className={`w-full h-11 rounded-md bg-neutral-100 border-2 border-neutral-200 p-2 outline-none ${darkProps} ${focusProps} ${hoverProps}`}
          />
          <label
            className={`absolute ${
              !value ? 'top-2.5 left-3' : '-top-7 left-1'
            }`}
          >
            {label}
          </label>
        </>
      )}

      <Controls
        value={value}
        onClear={_onClear}
        onClick={_onIconClick}
        iconModel={iconModel}
      />
    </div>
  );
}
