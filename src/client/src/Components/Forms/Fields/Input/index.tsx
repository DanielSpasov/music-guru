import { useCallback, useMemo, useState } from 'react';

import { Box, Label } from '../../../HTML';
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

  const onClick = useCallback(() => {
    switch (props.type) {
      case 'file':
        document.getElementById(ID)?.click();
        return;
      case 'password':
        setPassVisibility(prev => !prev);
        return;
      default:
        document.getElementById(ID)?.focus();
        return;
    }
  }, [ID, props?.type]);

  const iconModel = useMemo(() => {
    switch (props.type) {
      case 'file':
        return 'upload';
      case 'password':
        return passVisibility ? 'show' : 'hide';
      case 'email':
        return 'email';
      default:
        return 'text';
    }
  }, [props?.type, passVisibility]);

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

      <Controls
        value={value}
        onClear={handleClear}
        onClick={onClick}
        iconModel={iconModel}
      />
    </Box>
  );
}
