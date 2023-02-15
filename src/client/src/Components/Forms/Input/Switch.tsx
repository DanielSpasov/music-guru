import FileInput from './Types/File';
import { TypeSwitchProps } from './helpers';
import Text from './Types/Text';
import Password from './Types/Password';

export default function TypeSwitch({
  type,
  register,
  name,
  label,
  passVisibility,
  setPassVisibility
}: TypeSwitchProps) {
  switch (type) {
    case 'file':
      return (
        <FileInput register={register} name={name} label={label} type={type} />
      );
    case 'password':
      return (
        <Password
          type={type}
          register={register}
          name={name}
          label={label}
          setPassVisibility={setPassVisibility}
          passVisibility={passVisibility}
        />
      );
    case 'select':
    case 'text':
    case 'email':
    default:
      return (
        <Text
          type={type}
          register={register}
          name={name}
          label={label}
          passVisibility={passVisibility}
        />
      );
  }
}
