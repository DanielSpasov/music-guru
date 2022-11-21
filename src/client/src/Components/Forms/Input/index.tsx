import { UseFormRegister } from 'react-hook-form/dist/types';
import { useContext, useState, memo } from 'react';
import styled from 'styled-components';
import { camelCase } from 'lodash';

import { ThemeContext } from '../../../Contexts/Theme';
import { Text, Box, Label, Icon } from '../../';
import { InputType } from '../../../Types';

export type InputProps = {
  register: UseFormRegister<any>;
  type: InputType;
  label: string;
  error?: string;
  validators?: {
    required?: boolean;
    minlength?: number;
    maxlength?: number;
  };
};

function Input({ register, type, label, error, validators = {} }: InputProps) {
  const theme = useContext(ThemeContext);

  const [passVisiblity, setPassVisiblity] = useState(false);

  return (
    <Box position="relative" margin=".5em 0">
      <Box display="flex" justifyContent="flex-end">
        <Text color={validators.required ? theme.danger : 'gray'}>
          {validators.required ? '*' : 'Optional'}
        </Text>
      </Box>

      <StyledInput
        {...register(camelCase(label), {
          ...validators
        })}
        name={camelCase(label)}
        type={passVisiblity ? 'text' : type}
        placeholder=" "
        theme={theme}
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
        <Text color={theme.danger}>{error}</Text>
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
`;
