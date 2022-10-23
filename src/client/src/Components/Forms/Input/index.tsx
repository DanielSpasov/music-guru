import { useContext, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../../Contexts/Theme';

import { Text, Box, Label, Icon } from '../../';
import { InputProps } from './types';

export default function Input({
  type,
  label,
  control,
  required = false,
  dynamicLabel = false,
  error = ' ',
  placeholder,
  ...css
}: InputProps) {
  const theme = useContext(ThemeContext);
  const [passVisiblity, setPassVisiblity] = useState(false);

  return (
    <Box position="relative" margin=".5em 0">
      <Box display="flex" justifyContent="space-between">
        <Label>{!dynamicLabel && label}</Label>
        <Text color={required ? theme.danger : 'gray'}>
          {required ? '*' : 'Optional'}
        </Text>
      </Box>

      <StyledInput
        name={control}
        required={required}
        type={passVisiblity ? 'text' : type}
        placeholder={dynamicLabel ? ' ' : placeholder}
        theme={theme}
        {...css}
      />
      {dynamicLabel && (
        <Label position="absolute" top="36px" left="10px">
          {label}
        </Label>
      )}
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
        <Text color={theme.danger}>{error}</Text>
      </Box>
    </Box>
  );
}

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
