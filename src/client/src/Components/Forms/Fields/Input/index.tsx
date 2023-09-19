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

      {props?.type === 'file' && (
        <Controls
          value={value}
          onClear={handleClear}
          customIcon={
            <Icon
              model="upload"
              size="20px"
              onClick={() => document.getElementById(ID)?.click()}
            />
          }
        />
      )}

      {props?.type === 'password' && (
        <Box position="absolute" right=".5em" top=".05em">
          <Icon
            variant={passVisibility ? 'primary' : 'baseLightest'}
            onClick={() => setPassVisibility(!passVisibility)}
            model={passVisibility ? 'show' : 'hide'}
          />
        </Box>
      )}
    </Box>
  );
}
