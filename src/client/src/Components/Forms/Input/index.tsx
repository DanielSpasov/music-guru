import { useContext, useState, memo } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '../../../Contexts/Theme';
import { InputProps, ErrorMessage } from './helpers';
import { Text, Box, Label, Icon } from '../../';
import FileInput from './File';

function Input({
  register,
  name,
  type,
  label,
  error,
  value,
  required = false
}: InputProps) {
  const theme = useContext(ThemeContext);
  const [passVisiblity, setPassVisiblity] = useState(false);

  return (
    <Box position="relative" margin=".5em 0">
      <Box display="flex" justifyContent="flex-end">
        <Text color={required ? theme.danger : 'gray'}>
          {required ? '*' : 'Optional'}
        </Text>
      </Box>

      {type === 'file' && (
        <FileInput register={register} name={name} value={value} />
      )}
      {type !== 'file' && (
        <>
          <StyledInput
            {...register(name, { required })}
            name={name}
            type={passVisiblity ? 'text' : type}
            placeholder=" "
            theme={theme}
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
          color="lightgray"
          top="33px"
          right="10px"
          onClick={() => setPassVisiblity(!passVisiblity)}
        />
      )}

      <ErrorMessage error={error} />
    </Box>
  );
}

export default memo(Input);

const StyledInput = styled('input')`
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
