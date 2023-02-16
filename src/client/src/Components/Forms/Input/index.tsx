import { ThemeContext } from 'styled-components';
import { memo, useContext } from 'react';

import { InputProps } from './helpers';
import { Text, Box } from '../../';
import TypeSwitch from './Switch';

function Input({
  register,
  name,
  type,
  label,
  error,
  required = false,
  fetchFn,
  setFormValue,
  getValues
}: InputProps) {
  const { colors } = useContext(ThemeContext);

  return (
    <Box position="relative" margin=".5em 0">
      <Box display="flex" justifyContent="flex-end">
        <Text color={required ? colors.danger : 'gray'}>
          {required ? '*' : 'Optional'}
        </Text>
      </Box>

      <TypeSwitch
        setFormValue={setFormValue}
        getValues={getValues}
        register={register}
        fetchFn={fetchFn}
        label={label}
        type={type}
        name={name}
      />

      {error && <Text color={colors.danger}>{error?.message}</Text>}
    </Box>
  );
}

export default memo(Input);
