import { InputProps } from './helpers';
import Password from './Types/Password';
import File from './Types/File';
import Text from './Types/Text';

export default function Input(props: InputProps) {
  switch (props.type) {
    case 'file':
      return <File {...props} />;
    case 'password':
      return <Password {...props} />;
    case 'text':
    case 'email':
    default:
      return <Text {...props} />;
  }
}
