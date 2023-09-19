import { useCallback, useMemo, useState } from 'react';

import { Box, Icon, Label } from '../../../HTML';
import { InputProps } from './helpers';
import { StyledInput } from './Styled';
import Controls from '../Controls';

export default function Input({
  register,
  setFormValue,
  getValues,
  validations,
  props,
  label,
  name
}: InputProps) {
  const [passVisibility, setPassVisibility] = useState(false);
  const [value, setValue] = useState(getValues()[name]);

  const ID = useMemo(() => `${name}-input`, [name]);

  const customIcon = useMemo(() => {
    switch (props.type) {
      case 'file':
        return (
          <Icon
            model="upload"
            size="20px"
            onClick={() => document.getElementById(ID)?.click()}
          />
        );
      case 'password':
        return (
          <Icon
            size="20px"
            model={passVisibility ? 'show' : 'hide'}
            onClick={() => setPassVisibility(!passVisibility)}
          />
        );
      case 'email':
        return (
          <Icon
            size="20px"
            model="email"
            onClick={() => document.getElementById(ID)?.focus()}
          />
        );
      default:
        return (
          <Icon
            size="20px"
            model="text"
            onClick={() => document.getElementById(ID)?.focus()}
          />
        );
    }
  }, [props?.type, ID, passVisibility]);

  const { onChange, ...reg } = register(name, {
    required: validations?.required
  });

  const handleChange = useCallback(
    (e: InputEvent) => {
      const input = e.target as HTMLInputElement;
      setValue(input.value);
      return onChange(e);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    setValue('');
    setFormValue(name, undefined);
  }, [setFormValue, name]);

  return (
    <Box>
      <StyledInput
        {...reg}
        onChange={handleChange}
        id={ID}
        name={name}
        type={passVisibility ? 'text' : props?.type}
        {...(props?.type === 'file' && { accept: props.accept })}
        placeholder=" "
      />
      <Label position="absolute" top=".65em" left=".75em">
        {label}
      </Label>

      <Controls value={value} onClear={handleClear} customIcon={customIcon} />
    </Box>
  );
}
