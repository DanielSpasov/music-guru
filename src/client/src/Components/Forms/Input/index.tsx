import styled, { ThemeContext } from 'styled-components';
import { useState, memo, useContext } from 'react';

import { colors, essentials, font } from '../../helpers';
import { Text, Box, Label, Icon } from '../../';
import { InputProps } from './helpers';
import FileInput from './File';

function Input({
  register,
  name,
  type,
  label,
  error,
  required = false
}: InputProps) {
  const { colors } = useContext(ThemeContext);
  const [passVisiblity, setPassVisiblity] = useState(false);

  return (
    <Box position="relative" margin=".5em 0">
      <Box display="flex" justifyContent="flex-end">
        <Text color={required ? colors.danger : 'gray'}>
          {required ? '*' : 'Optional'}
        </Text>
      </Box>

      {type === 'file' && (
        <FileInput register={register} name={name} label={label} />
      )}

      {type !== 'file' && (
        <>
          <StyledInput
            {...register(name, { required })}
            name={name}
            type={passVisiblity ? 'text' : type}
            placeholder=" "
          />
          <Label position="absolute" top="36px" left="10px">
            {label}
          </Label>
        </>
      )}

      {type === 'password' && (
        <Icon
          model={passVisiblity ? 'eye' : 'eye-slash'}
          type="solid"
          position="absolute"
          fontSize="20px"
          color={passVisiblity ? colors.primary : 'lightgray'}
          top="33px"
          right="10px"
          onClick={() => setPassVisiblity(!passVisiblity)}
        />
      )}

      {error && <Text color={colors.danger}>{error?.message}</Text>}
    </Box>
  );
}

export default memo(Input);

const StyledInput = styled('input')<any>`
  box-sizing: border-box;

  ${essentials}
  ${colors}
  ${font}

  background-color: ${({ theme: { colors } }) => colors.baseLight};
  border: 2px solid ${({ theme: { colors } }) => colors.baseLighter};
  margin: 0.5em 0;
  padding: 0.5em;
  outline: none;
  width: 100%;

  &:hover {
    border: 2px solid ${({ theme: { colors } }) => colors.baseLightest};
  }

  &:focus {
    border: 2px solid ${({ theme: { colors } }) => colors.primary};
  }

  & ~ label {
    transition: 0.3s;
  }

  &:focus ~ label,
  &:not(:placeholder-shown)&:not(:focus) ~ label {
    top: 0;
    left: 0;
  }
`;
