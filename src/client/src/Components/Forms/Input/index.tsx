import { useContext, useState, memo } from 'react';
import styled from 'styled-components';
import { camelCase } from 'lodash';

import { ThemeContext } from '../../../Contexts/Theme';
import { Text, Box, Label, Icon } from '../../';
import { InputType } from '../../../Types';

export type InputProps = {
  type: InputType;
  required?: boolean;
  label?: string;
  placeholder?: string;
  error?: string;
  [css: string]: any;
};

function Input({
  type,
  label = '',
  required = false,
  placeholder,
  error,
  ...css
}: InputProps) {
  const theme = useContext(ThemeContext);

  const [touched, setTouched] = useState(false);
  const [passVisiblity, setPassVisiblity] = useState(false);

  return (
    <Box position="relative" margin=".5em 0">
      <Box display="flex" justifyContent="flex-end">
        <Text color={required ? theme.danger : 'gray'}>
          {required ? '*' : 'Optional'}
        </Text>
      </Box>

      <StyledInput
        name={camelCase(label)}
        type={passVisiblity ? 'text' : type}
        placeholder={label ? ' ' : placeholder}
        onBlur={() => setTouched(true)}
        required={required}
        theme={theme}
        {...css}
      />
      <Label position="absolute" top="36px" left="10px">
        {label}
      </Label>

      {type === 'password' && (
        <Icon
          model={passVisiblity ? 'eye' : 'eye-slash'}
          type="solid"
          position="absolute"
          fontSize="20px"
          color="lightgray"
          top="33px"
          right="10px"
          onClick={() => setPassVisiblity(!passVisiblity)}
        />
      )}

      <Box display="flex" justifyContent="space-between">
        <Text color={theme.danger}>{touched && error}</Text>
      </Box>
    </Box>
  );
}

export default memo(Input);

const StyledInput = styled('input')<any>`
  background-color: ${({ theme }) => theme.baseLight};
  border: 2px solid ${({ theme }) => theme.baseLighter};
  box-sizing: border-box;
  border-radius: 5px;

  margin: 0.5em 0;
  font-size: 1em;
  padding: 0.5em;
  outline: none;
  color: white;
  width: 100%;

  &:hover {
    border: 2px solid ${({ theme }) => theme.baseLightest};
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.primary};
  }

  & ~ label {
    transition: 0.4s;
  }

  &:focus ~ label,
  &:not(:placeholder-shown)&:not(:focus) ~ label {
    top: 0;
    left: 0;
  }

  ${css => ({ ...css })}
`;
