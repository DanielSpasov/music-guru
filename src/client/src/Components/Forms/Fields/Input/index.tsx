import { FieldProps } from '../helpers';
import { InputProps } from './helpers';
import { StyledInput } from './Styled';
import { useInput } from './useInput';
import Controls from '../Controls';

export default function Input({
  props,
  name,
  label,
  onChange,
  setValue,
  value = '',
  validateField
}: FieldProps<string, InputProps>) {
  const { iconModel, id, inputType, _onIconClick, _onChange, _onClear } =
    useInput({
      name,
      type: props?.type,
      onChange,
      setValue,
      validateField
    });

  return (
    <div className="relative">
      <StyledInput
        id={id}
        name={name}
        type={inputType}
        onChange={_onChange}
        {...(props?.type !== 'file' && { value })}
        {...(props?.type === 'file' && { accept: props.accept })}
        placeholder=" "
      />
      <label className="absolute top-3 left-3">{label}</label>

      <Controls
        value={value}
        onClear={_onClear}
        onClick={_onIconClick}
        iconModel={iconModel}
      />
    </div>
  );
}
