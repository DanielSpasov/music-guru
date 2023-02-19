import { ThemeContext } from 'styled-components';
import { useContext, useState } from 'react';

import { InputProps } from '../helpers';
import { Icon } from '../../../HTML';
import Text from './Text';

export default function Password({
  register,
  name,
  required,
  type,
  label
}: InputProps) {
  const [passVisibility, setPassVisibility] = useState(false);
  const { colors } = useContext(ThemeContext);

  return (
    <>
      <Text
        register={register}
        name={name}
        required={required}
        type={type}
        label={label}
        passVisibility={passVisibility}
      />
      <Icon
        color={passVisibility ? colors.primary : 'lightgray'}
        onClick={() => setPassVisibility(!passVisibility)}
        model={passVisibility ? 'eye' : 'eye-slash'}
        type="solid"
        position="absolute"
        fontSize="1.3em"
        right="10px"
        top="33px"
      />
    </>
  );
}
