import { TextInputProps } from '../helpers';
import { Label } from '../../../../HTML';
import { StyledInput } from '../Styled';

export default function Text({
  register,
  name,
  required,
  type,
  label,
  passVisibility
}: TextInputProps) {
  return (
    <>
      <StyledInput
        {...register(name, { required })}
        name={name}
        type={passVisibility ? 'text' : type}
        placeholder=" "
      />
      <Label position="absolute" top="36px" left="10px">
        {label}
      </Label>
    </>
  );
}
