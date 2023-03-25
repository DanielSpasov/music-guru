import { ThemeContext } from 'styled-components';
import { useContext, useState } from 'react';

import { Icon, Label } from '../../../HTML';
import { InputProps } from './helpers';
import { StyledInput } from './Styled';

export default function Input({
  register,
  required,
  type,
  label,
  name
}: InputProps) {
  const [passVisibility, setPassVisibility] = useState(false);
  const { colors } = useContext(ThemeContext);

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

      {type === 'password' && (
        <Icon
          color={passVisibility ? colors.primary : 'lightgray'}
          onClick={() => setPassVisibility(!passVisibility)}
          model={passVisibility ? 'eye' : 'eye-slash'}
          type="solid"
          position="absolute"
          fontSize="1.3em"
          right="10px"
          top="33px"
        />
      )}
    </>
  );
}
