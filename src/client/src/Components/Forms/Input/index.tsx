import { ThemeContext } from 'styled-components';
import { useState, memo, useContext } from 'react';

import { InputProps } from './helpers';
import { Text, Box } from '../../';
import TypeSwitch from './Switch';

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

      <TypeSwitch
        type={type}
        register={register}
        name={name}
        label={label}
        passVisibility={passVisiblity}
        setPassVisibility={setPassVisiblity}
      />

      {error && <Text color={colors.danger}>{error?.message}</Text>}
    </Box>
  );
}

export default memo(Input);
