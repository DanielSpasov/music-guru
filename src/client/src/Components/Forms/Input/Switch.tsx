import Password from './Types/Password';
import File from './Types/File';
import Text from './Types/Text';

import { InputProps } from './helpers';

export default function TypeSwitch(props: InputProps) {
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
