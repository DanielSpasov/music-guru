import { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../../Contexts/Theme';

import { Text, Box, Label } from '../../';
import { InputProps } from './types';

export default function Input({
  type,
  required = false,
  dynamicLabel = false,
  label,
  placeholder,
  ...css
}: InputProps) {
  const theme = useContext(ThemeContext);

  return (
    <Box position="relative">
      <Box display="flex" justifyContent="space-between">
        <Label>{!dynamicLabel && label}</Label>
        <Text color="gray">{!required && 'Optional'}</Text>
      </Box>
      {dynamicLabel && (
        <Label position="absolute" top="36px" left="10px">
          {label}
        </Label>
      )}
      <StyledInput
        required={required}
        type={type}
        placeholder={placeholder}
        theme={theme}
        {...css}
      />
    </Box>
  );
}

const StyledInput = styled('input')<any>`
  background-color: ${({ theme }) => theme.baseLight};
  border: 2px solid ${({ theme }) => theme.baseLighter};
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.5em;
  margin: 0.5em 0;
  outline: none;
  font-size: 1em;
  color: white;
  width: 100%;

  &:hover {
    border: 2px solid ${({ theme }) => theme.baseLightest};
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.primary};
  }

  ${css => ({ ...css })}
`;
