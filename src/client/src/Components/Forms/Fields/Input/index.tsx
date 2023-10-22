import { FieldProps } from '../helpers';
import { InputProps } from './helpers';
import { useInput } from './useInput';
import Controls from '../Controls';
import File from './File';

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

  const hoverProps = 'hover:border-neutral-500';
  const focusProps =
    'focus:border-primary [&~label]:focus:-top-7 [&~label]:focus:left-1';

  return (
    <div className="relative my-2">
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
            className={`bg-neutral-800 w-full h-11 rounded-md border-2 border-neutral-600 p-2 outline-none ${focusProps} ${hoverProps}`}
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
