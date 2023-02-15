import { useState } from 'react';

import { InputProps } from '../helpers';
import { Popover } from '../../../Common';
import Text from './Text';

export default function Select({
  register,
  name,
  required,
  type,
  label
}: InputProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Text
        // onClick={() => console.log('here')}
        register={register}
        name={name}
        required={required}
        type={type}
        label={label}
      />
      <Popover open={open}>test</Popover>
    </>
  );
}
