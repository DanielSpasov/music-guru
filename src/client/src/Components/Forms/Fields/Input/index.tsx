import { ThemeContext } from 'styled-components';
import { useContext, useState } from 'react';

import { Box, Icon, Label } from '../../../HTML';
import { InputProps } from './helpers';
import { StyledInput } from './Styled';

export default function Input({
  register,
  validations,
  props,
  label,
  name
}: InputProps) {
  const [passVisibility, setPassVisibility] = useState(false);
  const { colors } = useContext(ThemeContext);

  return (
    <Box>
      <StyledInput
        {...register(name, { required: validations?.required })}
        name={name}
        type={passVisibility ? 'text' : props?.type}
        placeholder=" "
      />
      <Label position="absolute" top=".65em" left=".75em">
        {label}
      </Label>

      {props?.type === 'password' && (
        <Box position="absolute" right=".5em" top=".05em">
          <Icon
            color={passVisibility ? colors.primary : 'lightgray'}
            onClick={() => setPassVisibility(!passVisibility)}
            model={passVisibility ? 'show' : 'hide'}
          />
        </Box>
      )}
    </Box>
  );
}
